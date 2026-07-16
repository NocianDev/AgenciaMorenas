require('dotenv').config();
const cors = require('cors');

const express = require('express');
const crypto = require('crypto');
const prisma = require('./prisma.cjs');

const app = express();
const port = process.env.PORT || 4000;

const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes.cjs');

const {
  authRequired,
  requireRole,
} = require('./middleware/auth.cjs');

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: [
      'GET',
      'POST',
      'PATCH',
      'PUT',
      'DELETE',
    ],
    allowedHeaders: ['Content-Type'],
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(express.json());

function createTrackingCode() {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(10000 + Math.random() * 90000);

  return `MOR-${year}${random}`;
}

function createTrackingToken() {
  return crypto.randomBytes(32).toString('hex');
}

app.use(
  '/api/clients',
  authRequired,
  requireRole('OWNER', 'DISPATCHER'),
);

app.use(
  '/api/vehicles',
  authRequired,
  requireRole('OWNER', 'DISPATCHER'),
);

app.use(
  '/api/orders',
  authRequired,
  requireRole('OWNER', 'DISPATCHER'),
);

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      ok: true,
      database: true,
      service: 'morenas-logistics-backend',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      database: false,
      message: 'No se pudo conectar con la base de datos.',
    });
  }
});

app.use('/api/auth', authRoutes);

app.get('/api/clients', async (_req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        orders: true,
      },
    });

    res.json({
      ok: true,
      clients,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'No se pudieron consultar los clientes.',
    });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const {
      contactName,
      companyName,
      email,
      phone,
      billingAddress,
      taxId,
      notes,
    } = req.body;

    if (!contactName || !email) {
      return res.status(400).json({
        ok: false,
        message: 'El nombre y el correo son obligatorios.',
      });
    }

    const client = await prisma.client.create({
      data: {
        contactName: String(contactName).trim(),
        companyName: companyName ? String(companyName).trim() : null,
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        billingAddress: billingAddress
          ? String(billingAddress).trim()
          : null,
        taxId: taxId ? String(taxId).trim() : null,
        notes: notes ? String(notes).trim() : null,
      },
    });

    res.status(201).json({
      ok: true,
      client,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'No se pudo crear el cliente.',
    });
  }
});

app.get('/api/vehicles', async (_req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        internalCode: 'asc',
      },
    });

    res.json({
      ok: true,
      vehicles,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'No se pudieron consultar las unidades.',
    });
  }
});

app.post('/api/vehicles', async (req, res) => {
  try {
    const {
      internalCode,
      plateNumber,
      brand,
      model,
      year,
      vehicleType,
    } = req.body;

    if (!internalCode) {
      return res.status(400).json({
        ok: false,
        message: 'El código interno de la unidad es obligatorio.',
      });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        internalCode: String(internalCode).trim().toUpperCase(),
        plateNumber: plateNumber
          ? String(plateNumber).trim().toUpperCase()
          : null,
        brand: brand ? String(brand).trim() : null,
        model: model ? String(model).trim() : null,
        year: year ? Number(year) : null,
        vehicleType: vehicleType ? String(vehicleType).trim() : null,
      },
    });

    res.status(201).json({
      ok: true,
      vehicle,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'No se pudo crear la unidad.',
    });
  }
});

app.get('/api/orders', async (_req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        client: true,
        vehicle: true,
        driver: true,
        statusHistory: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    res.json({
      ok: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'No se pudieron consultar los pedidos.',
    });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const {
      clientId,
      vehicleId,
      serviceType,
      originAddress,
      destinationAddress,
      cargoDescription,
      cargoWeightKg,
      requestedDate,
    } = req.body;

    if (
      !clientId ||
      !serviceType ||
      !originAddress ||
      !destinationAddress
    ) {
      return res.status(400).json({
        ok: false,
        message:
          'Cliente, servicio, origen y destino son obligatorios.',
      });
    }

    const order = await prisma.$transaction(async (transaction) => {
      const createdOrder = await transaction.order.create({
        data: {
          trackingCode: createTrackingCode(),
          trackingToken: createTrackingToken(),
          clientId,
          vehicleId: vehicleId || null,
          serviceType: String(serviceType).trim(),
          originAddress: String(originAddress).trim(),
          destinationAddress: String(destinationAddress).trim(),
          cargoDescription: cargoDescription
            ? String(cargoDescription).trim()
            : null,
          cargoWeightKg: cargoWeightKg
            ? Number(cargoWeightKg)
            : null,
          requestedDate: requestedDate
            ? new Date(requestedDate)
            : null,
          status: vehicleId ? 'UNIT_ASSIGNED' : 'REQUESTED',
        },
      });

      await transaction.orderStatusHistory.create({
        data: {
          orderId: createdOrder.id,
          newStatus: createdOrder.status,
          notes: 'Pedido creado en el sistema.',
        },
      });

      return createdOrder;
    });

    res.status(201).json({
      ok: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'No se pudo crear el pedido.',
    });
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status, notes } = req.body;

    if (!status) {
      return res.status(400).json({
        ok: false,
        message: 'Debes indicar el nuevo estado.',
      });
    }

    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!existingOrder) {
      return res.status(404).json({
        ok: false,
        message: 'Pedido no encontrado.',
      });
    }

    const updatedOrder = await prisma.$transaction(
      async (transaction) => {
        const updated = await transaction.order.update({
          where: {
            id: orderId,
          },
          data: {
            status,
          },
        });

        await transaction.orderStatusHistory.create({
          data: {
            orderId,
            previousStatus: existingOrder.status,
            newStatus: status,
            notes: notes ? String(notes).trim() : null,
          },
        });

        return updated;
      },
    );

    res.json({
      ok: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'No se pudo cambiar el estado del pedido.',
    });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        OR: [
          {
            id: req.params.id,
          },
          {
            trackingCode: req.params.id.toUpperCase(),
          },
        ],
      },
      include: {
        client: true,
        vehicle: true,
        driver: true,
        statusHistory: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        ok: false,
        message: 'Pedido no encontrado.',
      });
    }

    res.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'No se pudo consultar el pedido.',
    });
  }
});

app.listen(port, () => {
  console.log(`Morenas backend running on http://localhost:${port}`);
});