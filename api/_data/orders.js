import { units } from './units.js';

let counter = 25003;

export const orders = [
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

export function createOrder(payload = {}) {
  const unit = units[counter % units.length];
  const trackingId = `MOR-${counter++}`;
  const now = new Date();

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
      { time: now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }), title: 'Solicitud registrada', detail: 'El servicio fue creado correctamente en la plataforma.' },
      { time: now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }), title: 'Unidad vinculada', detail: `Se asignó la unidad ${unit.id} como referencia operativa.` },
    ],
  };

  orders.unshift(order);
  return order;
}

export function findOrdersByEmail(email = '') {
  const normalized = String(email).trim().toLowerCase();
  return orders.filter((order) => order.email === normalized);
}

export function findOrderByTrackingId(id = '') {
  return orders.find((order) => order.trackingId.toUpperCase() === String(id).trim().toUpperCase());
}
