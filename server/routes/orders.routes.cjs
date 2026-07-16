const router = require('express').Router();
const crypto = require('crypto');
const prisma = require('../prisma.cjs');
const { asyncRoute, text, optional, assertId, dateOrNull, numberOrNull, HttpError } = require('../utils/http.cjs');
const STATUSES = ['REQUESTED','UNDER_REVIEW','QUOTED','AWAITING_PAYMENT','PAID','SCHEDULED','UNIT_ASSIGNED','READY_TO_DEPART','IN_TRANSIT','AT_CUSTOMS','DELIVERED','CANCELLED'];
const NOTE_TYPES = ['NOTE','DELAY','CUSTOMS','DAMAGE','DOCUMENT','OTHER'];
const ACTIVE = { notIn: ['DELIVERED', 'CANCELLED'] };
const include = { client: true, vehicle: true, driver: true, statusHistory: { orderBy: { createdAt: 'asc' } }, notes: { orderBy: { createdAt: 'desc' }, include: { author: { select: { id: true, name: true, role: true } } } } };
const code = () => `MOR-${new Date().getFullYear().toString().slice(-2)}${Math.floor(10000 + Math.random() * 90000)}`;
async function validateAssignments(tx, orderId, vehicleId, driverId) {
  if (vehicleId) {
    const vehicle = await tx.vehicle.findUnique({ where: { id: assertId(vehicleId, 'ID de unidad') } });
    if (!vehicle || !vehicle.active) throw new HttpError(400, 'La unidad seleccionada no existe o está inactiva.');
    if (vehicle.status === 'IN_TRANSIT' || await tx.order.findFirst({ where: { id: { not: orderId }, vehicleId, status: { in: ['IN_TRANSIT','AT_CUSTOMS'] } } })) throw new HttpError(409, 'La unidad ya está en ruta en otro pedido.');
  }
  if (driverId) {
    const driver = await tx.driver.findUnique({ where: { id: assertId(driverId, 'ID de operador') } });
    if (!driver || !driver.active) throw new HttpError(400, 'El operador seleccionado no existe o está inactivo.');
    if (await tx.order.findFirst({ where: { id: { not: orderId }, driverId, status: { in: ['IN_TRANSIT','AT_CUSTOMS'] } } })) throw new HttpError(409, 'El operador ya está ocupado en otro pedido en ruta.');
  }
}
function fields(body) {
  const result = { clientId: assertId(body.clientId, 'ID de cliente'), serviceType: text(body.serviceType), originAddress: text(body.originAddress), destinationAddress: text(body.destinationAddress), cargoDescription: optional(body.cargoDescription), cargoWeightKg: numberOrNull(body.cargoWeightKg, 'El peso'), requestedDate: dateOrNull(body.requestedDate, 'La fecha solicitada'), vehicleId: body.vehicleId ? assertId(body.vehicleId, 'ID de unidad') : null, driverId: body.driverId ? assertId(body.driverId, 'ID de operador') : null };
  if (!result.serviceType || !result.originAddress || !result.destinationAddress) throw new HttpError(400, 'Cliente, servicio, origen y destino son obligatorios.');
  return result;
}
router.get('/', asyncRoute(async (_req, res) => res.json({ ok: true, orders: await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include }) })));
router.post('/', asyncRoute(async (req, res) => {
  const payload = fields(req.body);
  const order = await prisma.$transaction(async tx => { await validateAssignments(tx, '', payload.vehicleId, payload.driverId); if (!await tx.client.findUnique({ where: { id: payload.clientId } })) throw new HttpError(400, 'El cliente seleccionado no existe.'); const created = await tx.order.create({ data: { ...payload, trackingCode: code(), trackingToken: crypto.randomBytes(32).toString('hex'), status: payload.vehicleId ? 'UNIT_ASSIGNED' : 'REQUESTED' } }); await tx.orderStatusHistory.create({ data: { orderId: created.id, changedById: req.user.id, newStatus: created.status, notes: 'Pedido creado en el sistema.' } }); return created; });
  res.status(201).json({ ok: true, order });
}));
router.patch('/:id/status', asyncRoute(async (req, res) => {
  const id = assertId(req.params.id), status = text(req.body.status).toUpperCase();
  if (!STATUSES.includes(status)) throw new HttpError(400, 'El estado indicado no es válido.');
  const order = await prisma.order.findUnique({ where: { id } }); if (!order) throw new HttpError(404, 'Pedido no encontrado.');
  if (status === 'IN_TRANSIT' && !order.vehicleId) throw new HttpError(400, 'Asigna una unidad antes de iniciar el traslado.');
  const updated = await prisma.$transaction(async tx => { if (order.vehicleId && status === 'IN_TRANSIT') await tx.vehicle.update({ where: { id: order.vehicleId }, data: { status: 'IN_TRANSIT' } }); if (order.vehicleId && ['DELIVERED','CANCELLED'].includes(status)) await tx.vehicle.update({ where: { id: order.vehicleId }, data: { status: 'AVAILABLE' } }); const value = await tx.order.update({ where: { id }, data: { status } }); await tx.orderStatusHistory.create({ data: { orderId: id, changedById: req.user.id, previousStatus: order.status, newStatus: status, notes: optional(req.body.notes) } }); return value; });
  res.json({ ok: true, order: updated });
}));
router.patch('/:id', asyncRoute(async (req, res) => {
  const id = assertId(req.params.id), payload = fields(req.body), previous = await prisma.order.findUnique({ where: { id } }); if (!previous) throw new HttpError(404, 'Pedido no encontrado.');
  const changed = ['clientId','serviceType','originAddress','destinationAddress','cargoDescription','cargoWeightKg','requestedDate','vehicleId','driverId'].filter(k => String(previous[k] ?? '') !== String(payload[k] ?? ''));
  const order = await prisma.$transaction(async tx => { await validateAssignments(tx, id, payload.vehicleId, payload.driverId); const nextStatus = payload.vehicleId && previous.status === 'REQUESTED' ? 'UNIT_ASSIGNED' : previous.status; const value = await tx.order.update({ where: { id }, data: { ...payload, status: nextStatus } }); if (changed.length) await tx.orderStatusHistory.create({ data: { orderId: id, changedById: req.user.id, previousStatus: previous.status, newStatus: nextStatus, notes: `Pedido editado. Campos actualizados: ${changed.join(', ')}.` } }); return value; });
  res.json({ ok: true, order });
}));
router.get('/:id/notes', asyncRoute(async (req, res) => res.json({ ok: true, notes: await prisma.orderNote.findMany({ where: { orderId: assertId(req.params.id) }, orderBy: { createdAt: 'desc' }, include: { author: { select: { id: true, name: true, role: true } } } }) })));
router.post('/:id/notes', asyncRoute(async (req, res) => { const orderId = assertId(req.params.id), type = text(req.body.type).toUpperCase(), message = text(req.body.message); if (!NOTE_TYPES.includes(type)) throw new HttpError(400, 'El tipo de nota no es válido.'); if (message.length < 3 || message.length > 2000) throw new HttpError(400, 'El mensaje debe tener entre 3 y 2000 caracteres.'); if (!await prisma.order.findUnique({ where: { id: orderId } })) throw new HttpError(404, 'Pedido no encontrado.'); const note = await prisma.orderNote.create({ data: { orderId, authorId: req.user.id, type, message }, include: { author: { select: { id: true, name: true, role: true } } } }); res.status(201).json({ ok: true, note }); }));
router.get('/:id', asyncRoute(async (req, res) => { const value = text(req.params.id); const order = await prisma.order.findFirst({ where: { OR: [{ id: value }, { trackingCode: value.toUpperCase() }] }, include }); if (!order) throw new HttpError(404, 'Pedido no encontrado.'); res.json({ ok: true, order }); }));
module.exports = router;
