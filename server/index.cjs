const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const units = [
  {
    id: 'MOR-401',
    company: 'Morenas',
    unitLabel: 'Tractocamión 401',
    route: 'Monterrey → Laredo',
    status: 'En ruta',
    speedKmh: 67,
    ignition: true,
    driver: 'Operador asignado',
    lastUpdate: 'Hoy · 10:42 a.m.',
    position: { lat: 25.6866, lng: -100.3161 },
    events: [
      { time: '08:15', title: 'Salida registrada', detail: 'La unidad salió del punto de origen.' },
      { time: '09:40', title: 'Avance de ruta', detail: 'La unidad reportó tránsito en el tramo principal.' },
      { time: '10:42', title: 'Actualización GPS', detail: 'La unidad continúa en ruta con señal activa.' },
    ],
  },
  {
    id: 'MOR-722',
    company: 'Morenas',
    unitLabel: 'Camión 722',
    route: 'Saltillo → Monterrey',
    status: 'Programado',
    speedKmh: 39,
    ignition: true,
    driver: 'Operador en tránsito',
    lastUpdate: 'Hoy · 11:08 a.m.',
    position: { lat: 25.4267, lng: -100.9959 },
    events: [
      { time: '07:55', title: 'Unidad asignada', detail: 'La unidad fue asignada al servicio registrado.' },
      { time: '09:12', title: 'Servicio programado', detail: 'La ruta quedó confirmada para seguimiento operativo.' },
      { time: '11:08', title: 'Monitoreo activo', detail: 'El servicio cuenta con seguimiento disponible para el cliente.' },
    ],
  },
  {
    id: 'MOR-318',
    company: 'Morenas',
    unitLabel: 'Unidad 318',
    route: 'Nuevo Laredo → Apodaca',
    status: 'En revisión',
    speedKmh: 0,
    ignition: false,
    driver: 'Operador en espera',
    lastUpdate: 'Hoy · 09:54 a.m.',
    position: { lat: 27.4763, lng: -99.5164 },
    events: [
      { time: '06:48', title: 'Servicio registrado', detail: 'La solicitud fue recibida para coordinación.' },
      { time: '08:23', title: 'Revisión operativa', detail: 'Se verifican datos de unidad y ruta antes de salida.' },
      { time: '09:54', title: 'Último estatus', detail: 'Unidad en espera con seguimiento activo.' },
    ],
  },
];

let counter = 25003;

const orders = [
  {
    trackingId: 'MOR-25001',
    email: 'cliente@morenas.com',
    clientName: 'Cliente Morenas',
    phone: '+52 812 402 0614',
    serviceType: 'Transporte terrestre',
    origin: 'Apodaca, Nuevo León',
    destination: 'Laredo, Texas',
    cargo: 'Carga terrestre en camión',
    requestedDate: '2026-05-04',
    unitId: 'MOR-401',
    status: 'En ruta',
    createdAt: '2026-05-04T09:10:00.000Z',
    events: [
      { time: '09:10', title: 'Solicitud registrada', detail: 'El servicio fue creado con el correo cliente@morenas.com.' },
      { time: '09:25', title: 'Unidad asignada', detail: 'Se asignó la unidad MOR-401 para el recorrido.' },
      { time: '10:42', title: 'Unidad en ruta', detail: 'El trayecto Apodaca, Nuevo León → Laredo, Texas se encuentra en seguimiento.' },
    ],
  },
  {
    trackingId: 'MOR-25002',
    email: 'cliente@morenas.com',
    clientName: 'Cliente Morenas',
    phone: '+52 812 402 0614',
    serviceType: 'Regularización vehicular',
    origin: 'Houston, Texas',
    destination: 'Apodaca, Nuevo León',
    cargo: 'Documentación vehicular',
    requestedDate: '2026-05-05',
    unitId: 'MOR-318',
    status: 'En revisión',
    createdAt: '2026-05-04T10:00:00.000Z',
    events: [
      { time: '10:00', title: 'Caso recibido', detail: 'La solicitud quedó vinculada al correo del cliente.' },
      { time: '10:18', title: 'Documentación en revisión', detail: 'El equipo revisa los datos proporcionados para continuar.' },
    ],
  },
];

function createOrder(payload = {}) {
  const unit = units[counter % units.length];
  const trackingId = `MOR-${counter++}`;
  const now = new Date();
  const time = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

  const order = {
    trackingId,
    email: String(payload.email || '').trim().toLowerCase(),
    clientName: payload.name || 'Cliente Morenas',
    phone: payload.phone || '',
    serviceType: payload.serviceType || 'Transporte terrestre',
    origin: payload.origin || 'Origen por confirmar',
    destination: payload.destination || 'Destino por confirmar',
    cargo: payload.cargo || 'Servicio por confirmar',
    requestedDate: payload.date || '',
    unitId: unit.id,
    status: payload.serviceType?.toLowerCase().includes('regularización') || payload.serviceType?.toLowerCase().includes('importación') ? 'En revisión' : 'Registrado',
    createdAt: now.toISOString(),
    events: [
      { time, title: 'Solicitud registrada', detail: 'El servicio fue creado correctamente en la plataforma.' },
      { time, title: 'Unidad vinculada', detail: `Se asignó la unidad ${unit.id} como referencia operativa.` },
    ],
  };

  orders.unshift(order);
  return order;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'morenas-client-tracking-backend' });
});

app.get('/api/tracking', (_req, res) => {
  res.json({ ok: true, units: units.map(({ id, unitLabel, route, status, lastUpdate }) => ({ id, unitLabel, route, status, lastUpdate })) });
});

app.get('/api/tracking/:id', (req, res) => {
  const unit = units.find((item) => item.id.toUpperCase() === String(req.params.id).toUpperCase());
  if (!unit) {
    return res.status(404).json({ ok: false, message: 'Unidad no encontrada', availableUnits: units.map((item) => item.id) });
  }
  return res.json(unit);
});

app.get('/api/orders', (_req, res) => {
  res.json({ ok: true, orders });
});

app.post('/api/orders', (req, res) => {
  const order = createOrder(req.body || {});
  res.status(201).json({ ok: true, order });
});

app.get('/api/orders/by-email', (req, res) => {
  const email = String(req.query.email || '').trim().toLowerCase();
  res.json({ ok: true, orders: orders.filter((order) => order.email === email) });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find((item) => item.trackingId.toUpperCase() === String(req.params.id).toUpperCase());
  if (!order) {
    return res.status(404).json({ ok: false, message: 'No encontramos un servicio con ese ID.' });
  }
  res.json({ ok: true, order });
});

app.listen(port, () => {
  console.log(`Morenas backend running on http://localhost:${port}`);
});
