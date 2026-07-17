require('dotenv').config();

if (
  !process.env.JWT_SECRET ||
  process.env.JWT_SECRET.length < 32
) {
  throw new Error(
    'JWT_SECRET es obligatorio y debe tener al menos 32 caracteres.',
  );
}

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const prisma = require('./prisma.cjs');

const {
  authRequired,
  requireRole,
} = require('./middleware/auth.cjs');

const {
  notFound,
  errorHandler,
} = require('./middleware/errors.cjs');

const app = express();

/*
 * Render coloca el servidor detrás de un proxy HTTPS.
 * Esto permite que Express reconozca correctamente
 * las conexiones seguras de producción.
 */
app.set('trust proxy', 1);

app.disable('x-powered-by');

/*
 * En desarrollo:
 * CORS_ORIGIN=http://localhost:5173
 *
 * En producción:
 * CORS_ORIGIN=https://tu-sitio.vercel.app
 *
 * También admite varios dominios separados por comas:
 * CORS_ORIGIN=https://sitio.vercel.app,https://www.tudominio.com
 */
const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  'http://localhost:5173'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    /*
     * Permite solicitudes sin encabezado Origin,
     * como pruebas directas, Postman o health checks.
     */
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`Origen bloqueado por CORS: ${origin}`);

    return callback(
      new Error('Origen no permitido por CORS.'),
    );
  },

  credentials: true,

  methods: [
    'GET',
    'POST',
    'PATCH',
    'PUT',
    'DELETE',
    'OPTIONS',
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
  ],
};

app.use(cors(corsOptions));

// Stripe necesita el cuerpo sin transformar para verificar la firma.
app.use('/api/stripe', require('./routes/stripe.routes.cjs'));

app.use(
  express.json({
    limit: '1mb',
  }),
);

app.use(cookieParser());

/*
 * Health check para Render.
 */
app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      ok: true,
      database: true,
      service: 'morenas-logistics-backend',
    });
  } catch (error) {
    console.error(
      'Error comprobando la base de datos:',
      error,
    );

    return res.status(503).json({
      ok: false,
      database: false,
      message:
        'No se pudo conectar con la base de datos.',
    });
  }
});

/*
 * Rutas de autenticación.
 */
app.use(
  '/api/auth',
  require('./routes/auth.routes.cjs'),
);

app.use('/api/tracking', require('./routes/tracking.routes.cjs'));
app.use('/api/service-requests', require('./routes/service-requests.routes.cjs'));

/*
 * Protección para las rutas administrativas.
 */
const adminAccess = [
  authRequired,
  requireRole('OWNER', 'DISPATCHER'),
];

app.use(
  '/api/clients',
  ...adminAccess,
  require('./routes/clients.routes.cjs'),
);

app.use(
  '/api/vehicles',
  ...adminAccess,
  require('./routes/vehicles.routes.cjs'),
);

app.use(
  '/api/drivers',
  ...adminAccess,
  require('./routes/drivers.routes.cjs'),
);

app.use(
  '/api/orders',
  ...adminAccess,
  require('./routes/orders.routes.cjs'),
);

/*
 * Manejo de rutas inexistentes y errores.
 * Estas líneas deben permanecer después de todas las rutas.
 */
app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT) || 4000;

/*
 * Solo inicia el servidor cuando este archivo
 * se ejecuta directamente.
 */
if (require.main === module) {
  app.listen(port, '0.0.0.0', () => {
    const environment =
      process.env.NODE_ENV || 'development';

    console.log(
      `Morenas backend running on port ${port}`,
    );

    console.log(
      `Environment: ${environment}`,
    );

    console.log(
      `Allowed origins: ${allowedOrigins.join(', ')}`,
    );
  });
}

module.exports = app;
