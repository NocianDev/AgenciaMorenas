const router = require('express').Router();
const crypto = require('crypto');

const prisma = require('../prisma.cjs');
const { createCheckoutSession } = require('../utils/stripe.cjs');

const {
  asyncRoute,
  text,
  optional,
  assertId,
  dateOrNull,
  numberOrNull,
  HttpError,
} = require('../utils/http.cjs');

const STATUSES = [
  'REQUESTED',
  'UNDER_REVIEW',
  'QUOTED',
  'AWAITING_PAYMENT',
  'PAID',
  'SCHEDULED',
  'UNIT_ASSIGNED',
  'READY_TO_DEPART',
  'IN_TRANSIT',
  'AT_CUSTOMS',
  'DELIVERED',
  'CANCELLED',
];

const NOTE_TYPES = [
  'NOTE',
  'DELAY',
  'CUSTOMS',
  'DAMAGE',
  'DOCUMENT',
  'OTHER',
];

const include = {
  client: true,
  vehicle: true,
  driver: true,
  statusHistory: {
    orderBy: {
      createdAt: 'asc',
    },
  },
  notes: {
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  },
};

async function nextTrackingNumber(tx) {
  const year = new Date().getFullYear();
  const prefix = `MOR-${year}-`;

  /*
   * Evita que dos pedidos creados al mismo tiempo
   * reciban el mismo número de rastreo.
   *
   * Se usa $executeRaw porque pg_advisory_xact_lock
   * devuelve un valor PostgreSQL de tipo void.
   */
  await tx.$executeRaw`
    SELECT pg_advisory_xact_lock(${year})
  `;

  const latest = await tx.order.findFirst({
    where: {
      trackingNumber: {
        startsWith: prefix,
      },
    },
    orderBy: {
      trackingNumber: 'desc',
    },
    select: {
      trackingNumber: true,
    },
  });

  const currentSequence = Number(
    latest?.trackingNumber?.slice(prefix.length) || 0,
  );

  const nextSequence = Number.isFinite(currentSequence)
    ? currentSequence + 1
    : 1;

  return `${prefix}${String(nextSequence).padStart(6, '0')}`;
}

async function validateAssignments(
  tx,
  orderId,
  vehicleId,
  driverId,
) {
  if (vehicleId) {
    const parsedVehicleId = assertId(
      vehicleId,
      'ID de unidad',
    );

    const vehicle = await tx.vehicle.findUnique({
      where: {
        id: parsedVehicleId,
      },
    });

    if (!vehicle || !vehicle.active) {
      throw new HttpError(
        400,
        'La unidad seleccionada no existe o está inactiva.',
      );
    }

    const occupiedVehicleOrder =
      await tx.order.findFirst({
        where: {
          id: {
            not: orderId,
          },
          vehicleId: parsedVehicleId,
          status: {
            in: ['IN_TRANSIT', 'AT_CUSTOMS'],
          },
        },
      });

    if (
      vehicle.status === 'IN_TRANSIT' ||
      occupiedVehicleOrder
    ) {
      throw new HttpError(
        409,
        'La unidad ya está en ruta en otro pedido.',
      );
    }
  }

  if (driverId) {
    const parsedDriverId = assertId(
      driverId,
      'ID de operador',
    );

    const driver = await tx.driver.findUnique({
      where: {
        id: parsedDriverId,
      },
    });

    if (!driver || !driver.active) {
      throw new HttpError(
        400,
        'El operador seleccionado no existe o está inactivo.',
      );
    }

    const occupiedDriverOrder =
      await tx.order.findFirst({
        where: {
          id: {
            not: orderId,
          },
          driverId: parsedDriverId,
          status: {
            in: ['IN_TRANSIT', 'AT_CUSTOMS'],
          },
        },
      });

    if (occupiedDriverOrder) {
      throw new HttpError(
        409,
        'El operador ya está ocupado en otro pedido en ruta.',
      );
    }
  }
}

function fields(body) {
  const totalAmountCents = body.totalAmountCents == null || body.totalAmountCents === '' ? null : Number(body.totalAmountCents);
  if (totalAmountCents !== null && (!Number.isSafeInteger(totalAmountCents) || totalAmountCents <= 0)) throw new HttpError(400, 'El monto debe ser un número entero de centavos mayor a cero.');
  const result = {
    clientId: assertId(
      body.clientId,
      'ID de cliente',
    ),

    serviceType: text(body.serviceType),

    originAddress: text(body.originAddress),

    destinationAddress: text(
      body.destinationAddress,
    ),

    cargoDescription: optional(
      body.cargoDescription,
    ),

    cargoWeightKg: numberOrNull(
      body.cargoWeightKg,
      'El peso',
    ),

    requestedDate: dateOrNull(
      body.requestedDate,
      'La fecha solicitada',
    ),

    vehicleId: body.vehicleId
      ? assertId(
          body.vehicleId,
          'ID de unidad',
        )
      : null,

    driverId: body.driverId
      ? assertId(
          body.driverId,
          'ID de operador',
        )
      : null,
  };

  if (Object.prototype.hasOwnProperty.call(body, 'totalAmountCents')) result.totalAmountCents = totalAmountCents;

  if (
    !result.serviceType ||
    !result.originAddress ||
    !result.destinationAddress
  ) {
    throw new HttpError(
      400,
      'Cliente, servicio, origen y destino son obligatorios.',
    );
  }

  return result;
}

router.get(
  '/',
  asyncRoute(async (_req, res) => {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include,
    });

    res.json({
      ok: true,
      orders,
    });
  }),
);

router.post(
  '/',
  asyncRoute(async (req, res) => {
    const payload = fields(req.body);

    const order = await prisma.$transaction(
      async (tx) => {
        await validateAssignments(
          tx,
          '',
          payload.vehicleId,
          payload.driverId,
        );

        const client =
          await tx.client.findUnique({
            where: {
              id: payload.clientId,
            },
          });

        if (!client) {
          throw new HttpError(
            400,
            'El cliente seleccionado no existe.',
          );
        }

        const trackingNumber =
          await nextTrackingNumber(tx);

        const created = await tx.order.create({
          data: {
            ...payload,

            trackingNumber,

            trackingCode: trackingNumber,

            trackingToken: crypto
              .randomBytes(32)
              .toString('hex'),

            status: payload.vehicleId
              ? 'UNIT_ASSIGNED'
              : 'REQUESTED',
          },
        });

        await tx.orderStatusHistory.create({
          data: {
            orderId: created.id,
            changedById: req.user.id,
            newStatus: created.status,
            notes: 'Pedido creado en el sistema.',
          },
        });

        return created;
      },
    );

    res.status(201).json({
      ok: true,
      order,
    });
  }),
);

router.patch(
  '/:id/status',
  asyncRoute(async (req, res) => {
    const id = assertId(req.params.id);

    const status = text(
      req.body.status,
    ).toUpperCase();

    if (!STATUSES.includes(status)) {
      throw new HttpError(
        400,
        'El estado indicado no es válido.',
      );
    }

    const order =
      await prisma.order.findUnique({
        where: {
          id,
        },
      });

    if (!order) {
      throw new HttpError(
        404,
        'Pedido no encontrado.',
      );
    }

    if (
      status === 'IN_TRANSIT' &&
      !order.vehicleId
    ) {
      throw new HttpError(
        400,
        'Asigna una unidad antes de iniciar el traslado.',
      );
    }

    const updated =
      await prisma.$transaction(
        async (tx) => {
          if (
            order.vehicleId &&
            status === 'IN_TRANSIT'
          ) {
            await tx.vehicle.update({
              where: {
                id: order.vehicleId,
              },
              data: {
                status: 'IN_TRANSIT',
              },
            });
          }

          if (
            order.vehicleId &&
            ['DELIVERED', 'CANCELLED'].includes(
              status,
            )
          ) {
            await tx.vehicle.update({
              where: {
                id: order.vehicleId,
              },
              data: {
                status: 'AVAILABLE',
              },
            });
          }

          const value = await tx.order.update({
            where: {
              id,
            },
            data: {
              status,
            },
          });

          await tx.orderStatusHistory.create({
            data: {
              orderId: id,
              changedById: req.user.id,
              previousStatus: order.status,
              newStatus: status,
              notes: optional(req.body.notes),
            },
          });

          return value;
        },
      );

    res.json({
      ok: true,
      order: updated,
    });
  }),
);

router.patch(
  '/:id',
  asyncRoute(async (req, res) => {
    const id = assertId(req.params.id);
    const payload = fields(req.body);

    const previous =
      await prisma.order.findUnique({
        where: {
          id,
        },
      });

    if (!previous) {
      throw new HttpError(
        404,
        'Pedido no encontrado.',
      );
    }

    const editableFields = [
      'clientId',
      'serviceType',
      'originAddress',
      'destinationAddress',
      'cargoDescription',
      'cargoWeightKg',
      'requestedDate',
      'vehicleId',
      'driverId',
    ];

    const changed = editableFields.filter(
      (key) =>
        String(previous[key] ?? '') !==
        String(payload[key] ?? ''),
    );

    const order =
      await prisma.$transaction(
        async (tx) => {
          await validateAssignments(
            tx,
            id,
            payload.vehicleId,
            payload.driverId,
          );

          const nextStatus =
            payload.vehicleId &&
            previous.status === 'REQUESTED'
              ? 'UNIT_ASSIGNED'
              : previous.status;

          const value = await tx.order.update({
            where: {
              id,
            },
            data: {
              ...payload,
              status: nextStatus,
            },
          });

          if (changed.length) {
            await tx.orderStatusHistory.create({
              data: {
                orderId: id,
                changedById: req.user.id,
                previousStatus: previous.status,
                newStatus: nextStatus,
                notes:
                  `Pedido editado. Campos actualizados: ` +
                  `${changed.join(', ')}.`,
              },
            });
          }

          return value;
        },
      );

    res.json({
      ok: true,
      order,
    });
  }),
);

router.get(
  '/:id/notes',
  asyncRoute(async (req, res) => {
    const orderId = assertId(req.params.id);

    const notes =
      await prisma.orderNote.findMany({
        where: {
          orderId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
      });

    res.json({
      ok: true,
      notes,
    });
  }),
);

router.post(
  '/:id/notes',
  asyncRoute(async (req, res) => {
    const orderId = assertId(req.params.id);

    const type = text(
      req.body.type,
    ).toUpperCase();

    const message = text(req.body.message);

    const isPublic =
      req.body.isPublic === true;

    if (!NOTE_TYPES.includes(type)) {
      throw new HttpError(
        400,
        'El tipo de nota no es válido.',
      );
    }

    if (
      message.length < 3 ||
      message.length > 2000
    ) {
      throw new HttpError(
        400,
        'El mensaje debe tener entre 3 y 2000 caracteres.',
      );
    }

    const order =
      await prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });

    if (!order) {
      throw new HttpError(
        404,
        'Pedido no encontrado.',
      );
    }

    const note =
      await prisma.orderNote.create({
        data: {
          orderId,
          authorId: req.user.id,
          type,
          message,
          isPublic,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              role: true,
            },
          },
        },
      });

    res.status(201).json({
      ok: true,
      note,
    });
  }),
);

router.patch(
  '/:id/amount',
  asyncRoute(async (req, res) => {
    const id = assertId(req.params.id);
    const totalAmountCents = Number(req.body.totalAmountCents);
    if (!Number.isSafeInteger(totalAmountCents) || totalAmountCents <= 0) throw new HttpError(400, 'El monto debe ser un número entero de centavos mayor a cero.');
    const previous = await prisma.order.findUnique({ where: { id }, select: { paymentStatus: true } });
    if (!previous) throw new HttpError(404, 'Pedido no encontrado.');
    if (previous.paymentStatus === 'PAID' && req.body.confirmPaidUpdate !== true) throw new HttpError(409, 'Este pedido ya está pagado. Confirma explícitamente para modificar el monto.');
    const order = await prisma.order.update({ where: { id }, data: { totalAmountCents, currency: 'mxn' } });
    res.json({ ok: true, order });
  }),
);

router.post(
  '/:id/create-checkout-session',
  asyncRoute(async (req, res) => {
    const id = assertId(req.params.id);
    const order = await prisma.order.findUnique({ where: { id }, select: { id: true, trackingNumber: true, trackingToken: true, serviceType: true, totalAmountCents: true, paymentStatus: true } });
    if (!order) throw new HttpError(404, 'Pedido no encontrado.');
    const session = await createCheckoutSession(order);
    await prisma.order.update({ where: { id }, data: { stripeCheckoutSessionId: session.id } });
    res.json({ ok: true, url: session.url });
  }),
);

router.get(
  '/:id',
  asyncRoute(async (req, res) => {
    const value = text(req.params.id);

    const order =
      await prisma.order.findFirst({
        where: {
          OR: [
            {
              id: value,
            },
            {
              trackingNumber:
                value.toUpperCase(),
            },
            {
              trackingCode:
                value.toUpperCase(),
            },
          ],
        },
        include,
      });

    if (!order) {
      throw new HttpError(
        404,
        'Pedido no encontrado.',
      );
    }

    res.json({
      ok: true,
      order,
    });
  }),
);

module.exports = router;
