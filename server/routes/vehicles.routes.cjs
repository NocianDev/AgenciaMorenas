const router = require('express').Router();

const prisma = require('../prisma.cjs');

const {
  asyncRoute,
  text,
  optional,
  HttpError,
} = require('../utils/http.cjs');

const ACTIVE_ORDER_STATUSES = [
  'UNIT_ASSIGNED',
  'READY_TO_DEPART',
  'IN_TRANSIT',
  'AT_CUSTOMS',
];

/*
 * Obtener todas las unidades.
 */
router.get(
  '/',
  asyncRoute(async (_req, res) => {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        internalCode: 'asc',
      },
    });

    res.json({
      ok: true,
      vehicles,
    });
  }),
);

/*
 * Crear una unidad.
 */
router.post(
  '/',
  asyncRoute(async (req, res) => {
    const internalCode = text(
      req.body.internalCode,
    ).toUpperCase();

    const plateNumber = optional(
      req.body.plateNumber,
    )?.toUpperCase();

    const year = req.body.year
      ? Number(req.body.year)
      : null;

    if (!internalCode) {
      throw new HttpError(
        400,
        'El código interno es obligatorio.',
      );
    }

    if (
      year &&
      (!Number.isInteger(year) ||
        year < 1980 ||
        year > 2100)
    ) {
      throw new HttpError(
        400,
        'El año de la unidad no es válido.',
      );
    }

    const duplicate = await prisma.vehicle.findFirst({
      where: {
        OR: [
          {
            internalCode,
          },
          ...(plateNumber
            ? [
                {
                  plateNumber,
                },
              ]
            : []),
        ],
      },
    });

    if (duplicate) {
      throw new HttpError(
        409,
        'El código interno o las placas ya están registrados.',
      );
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        internalCode,
        plateNumber,
        year,
        brand: optional(req.body.brand),
        model: optional(req.body.model),
        vehicleType: optional(
          req.body.vehicleType,
        ),
      },
    });

    res.status(201).json({
      ok: true,
      vehicle,
    });
  }),
);

/*
 * Desactivar una unidad.
 *
 * No se elimina físicamente porque puede estar relacionada
 * con pedidos anteriores.
 */
router.patch(
  '/:id/deactivate',
  asyncRoute(async (req, res) => {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!vehicle) {
      throw new HttpError(
        404,
        'Unidad no encontrada.',
      );
    }

    if (!vehicle.active) {
      throw new HttpError(
        409,
        'La unidad ya está inactiva.',
      );
    }

    const activeOrder =
      await prisma.order.findFirst({
        where: {
          vehicleId: vehicle.id,
          status: {
            in: ACTIVE_ORDER_STATUSES,
          },
        },
        select: {
          id: true,
          trackingCode: true,
          status: true,
        },
      });

    if (activeOrder) {
      throw new HttpError(
        409,
        `No se puede desactivar la unidad porque está asignada al pedido ${activeOrder.trackingCode}.`,
      );
    }

    const updatedVehicle =
      await prisma.vehicle.update({
        where: {
          id: vehicle.id,
        },
        data: {
          active: false,
          status: 'OUT_OF_SERVICE',
        },
      });

    res.json({
      ok: true,
      vehicle: updatedVehicle,
      message:
        'Unidad desactivada correctamente.',
    });
  }),
);

/*
 * Reactivar una unidad.
 */
router.patch(
  '/:id/activate',
  asyncRoute(async (req, res) => {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!vehicle) {
      throw new HttpError(
        404,
        'Unidad no encontrada.',
      );
    }

    if (vehicle.active) {
      throw new HttpError(
        409,
        'La unidad ya está activa.',
      );
    }

    const updatedVehicle =
      await prisma.vehicle.update({
        where: {
          id: vehicle.id,
        },
        data: {
          active: true,
          status: 'AVAILABLE',
        },
      });

    res.json({
      ok: true,
      vehicle: updatedVehicle,
      message:
        'Unidad reactivada correctamente.',
    });
  }),
);

module.exports = router;