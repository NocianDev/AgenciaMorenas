const crypto = require('crypto');
const router = require('express').Router();
const prisma = require('../prisma.cjs');
const { authRequired, requireRole } = require('../middleware/auth.cjs');
const { asyncRoute, HttpError, assertId } = require('../utils/http.cjs');

const SERVICES = ['Traslado de vehículo', 'Transporte de mercancía', 'Importación', 'Legalización', 'Regularización', 'Asesoría aduanal', 'Otro'];
const CONTACT_METHODS = ['WhatsApp', 'Llamada', 'Correo'];
const STATUSES = ['PENDING', 'UNDER_REVIEW', 'CONTACTED', 'REJECTED'];
const LIMITS = { fullName: 120, phone: 30, email: 160, companyName: 160, taxId: 20, serviceType: 80, customServiceType: 100, originAddress: 300, destinationAddress: 300, cargoDescription: 1200, vehicleMake: 80, vehicleModel: 80, vehicleVin: 40, comments: 2000 };
const attempts = new Map();

function clean(value, field, required = false) {
  const result = value == null ? '' : String(value).replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
  if (required && !result) throw new HttpError(400, `El campo ${field} es obligatorio.`);
  if (result.length > LIMITS[field]) throw new HttpError(400, `El campo ${field} es demasiado largo.`);
  return result || null;
}

function publicRateLimit(req, _res, next) {
  const now = Date.now();
  const key = req.ip || 'unknown';
  const recent = (attempts.get(key) || []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= 6) return next(new HttpError(429, 'Se alcanzo el limite temporal de solicitudes. Intenta mas tarde.'));
  recent.push(now);
  attempts.set(key, recent);
  next();
}

function publicPayload(body) {
  const allowed = new Set([...Object.keys(LIMITS), 'preferredContactMethod', 'cargoWeightKg', 'requestedDate', 'vehicleYear', 'privacyAccepted', 'website']);
  if (Object.keys(body || {}).some((key) => !allowed.has(key))) throw new HttpError(400, 'La solicitud contiene campos no permitidos.');
  if (body.website) throw new HttpError(400, 'No fue posible procesar la solicitud.');
  const email = clean(body.email, 'email', true).toLowerCase();
  const phone = clean(body.phone, 'phone', true);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, 'Ingresa un correo electronico valido.');
  if (!/^\+?[0-9 ()-]{7,25}$/.test(phone) || phone.replace(/\D/g, '').length < 7) throw new HttpError(400, 'Ingresa un telefono valido.');
  const serviceType = clean(body.serviceType, 'serviceType', true);
  if (!SERVICES.includes(serviceType)) throw new HttpError(400, 'Selecciona un tipo de servicio valido.');
  const customServiceType = clean(body.customServiceType, 'customServiceType');
  if (serviceType === 'Otro' && !customServiceType) throw new HttpError(400, 'Especifica el tipo de servicio.');
  const preferredContactMethod = body.preferredContactMethod ? String(body.preferredContactMethod).trim() : null;
  if (preferredContactMethod && !CONTACT_METHODS.includes(preferredContactMethod)) throw new HttpError(400, 'El medio de contacto no es valido.');
  const cargoWeightKg = body.cargoWeightKg === '' || body.cargoWeightKg == null ? null : Number(body.cargoWeightKg);
  if (cargoWeightKg !== null && (!Number.isFinite(cargoWeightKg) || cargoWeightKg <= 0 || cargoWeightKg > 1000000)) throw new HttpError(400, 'El peso aproximado no es valido.');
  const vehicleYear = body.vehicleYear === '' || body.vehicleYear == null ? null : Number(body.vehicleYear);
  const maxYear = new Date().getFullYear() + 1;
  if (vehicleYear !== null && (!Number.isInteger(vehicleYear) || vehicleYear < 1886 || vehicleYear > maxYear)) throw new HttpError(400, 'El ano del vehiculo no es valido.');
  let requestedDate = null;
  if (body.requestedDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(body.requestedDate))) throw new HttpError(400, 'La fecha deseada no es valida.');
    requestedDate = new Date(`${body.requestedDate}T12:00:00.000Z`);
    if (Number.isNaN(requestedDate.getTime())) throw new HttpError(400, 'La fecha deseada no es valida.');
  }
  if (body.privacyAccepted !== true) throw new HttpError(400, 'Debes aceptar el aviso de privacidad.');
  return { fullName: clean(body.fullName, 'fullName', true), phone, email, companyName: clean(body.companyName, 'companyName'), taxId: clean(body.taxId, 'taxId'), preferredContactMethod, serviceType, customServiceType: serviceType === 'Otro' ? customServiceType : null, originAddress: clean(body.originAddress, 'originAddress', true), destinationAddress: clean(body.destinationAddress, 'destinationAddress', true), cargoDescription: clean(body.cargoDescription, 'cargoDescription', true), cargoWeightKg, requestedDate, vehicleMake: clean(body.vehicleMake, 'vehicleMake'), vehicleModel: clean(body.vehicleModel, 'vehicleModel'), vehicleYear, vehicleVin: clean(body.vehicleVin, 'vehicleVin'), comments: clean(body.comments, 'comments'), privacyAccepted: true };
}

async function nextNumber(tx, prefix, lockKey, model, field) {
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(${lockKey})`;
  const latest = await tx[model].findFirst({ where: { [field]: { startsWith: prefix } }, orderBy: { [field]: 'desc' }, select: { [field]: true } });
  const sequence = Number(latest?.[field]?.slice(prefix.length) || 0) + 1;
  return `${prefix}${String(sequence).padStart(6, '0')}`;
}

router.post('/', publicRateLimit, asyncRoute(async (req, res) => {
  const payload = publicPayload(req.body || {});
  const request = await prisma.$transaction(async (tx) => {
    const year = new Date().getFullYear();
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`${payload.email}|${payload.originAddress}|${payload.destinationAddress}`}))`;
    const duplicate = await tx.serviceRequest.findFirst({ where: { email: payload.email, originAddress: payload.originAddress, destinationAddress: payload.destinationAddress, serviceType: payload.serviceType, createdAt: { gte: new Date(Date.now() - 60 * 1000) } }, orderBy: { createdAt: 'desc' } });
    if (duplicate) return duplicate;
    const requestNumber = await nextNumber(tx, `SOL-${year}-`, 7300000 + year, 'serviceRequest', 'requestNumber');
    return tx.serviceRequest.create({ data: { ...payload, requestNumber, status: 'PENDING' } });
  });
  res.status(201).json({ ok: true, requestNumber: request.requestNumber, message: `Tu solicitud fue recibida correctamente. Nuestro equipo revisara la informacion y se pondra en contacto contigo. Folio: ${request.requestNumber}.` });
}));

router.use(authRequired, requireRole('OWNER', 'DISPATCHER'));

router.get('/', asyncRoute(async (req, res) => {
  const where = {};
  if (req.query.status) where.status = String(req.query.status).toUpperCase();
  if (req.query.serviceType) where.serviceType = String(req.query.serviceType);
  if (req.query.date) { const start = new Date(`${req.query.date}T00:00:00.000Z`); const end = new Date(start); end.setUTCDate(end.getUTCDate() + 1); if (!Number.isNaN(start.getTime())) where.createdAt = { gte: start, lt: end }; }
  if (req.query.search) { const value = String(req.query.search).trim().slice(0, 120); where.OR = ['requestNumber', 'fullName', 'email', 'phone', 'companyName'].map((field) => ({ [field]: { contains: value, mode: 'insensitive' } })); }
  const requests = await prisma.serviceRequest.findMany({ where, orderBy: { createdAt: 'desc' }, include: { client: { select: { id: true, contactName: true } }, order: { select: { id: true, trackingNumber: true, trackingToken: true } } } });
  res.json({ ok: true, requests });
}));

router.patch('/:id/status', asyncRoute(async (req, res) => {
  const id = assertId(req.params.id); const status = String(req.body.status || '').toUpperCase();
  if (!STATUSES.includes(status)) throw new HttpError(400, 'El estado indicado no es valido.');
  const current = await prisma.serviceRequest.findUnique({ where: { id } });
  if (!current) throw new HttpError(404, 'Solicitud no encontrada.');
  if (current.status === 'CONVERTED') throw new HttpError(409, 'Una solicitud convertida ya no puede cambiarse.');
  const rejectionReason = status === 'REJECTED' ? clean(req.body.reason, 'comments', true) : null;
  const request = await prisma.serviceRequest.update({ where: { id }, data: { status, rejectionReason, reviewedById: req.user.id, reviewedAt: new Date() } });
  res.json({ ok: true, request });
}));

router.post('/:id/convert', asyncRoute(async (req, res) => {
  const id = assertId(req.params.id);
  const result = await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${id}))`;
    const request = await tx.serviceRequest.findUnique({ where: { id }, include: { order: true, client: true } });
    if (!request) throw new HttpError(404, 'Solicitud no encontrada.');
    if (request.status === 'REJECTED') throw new HttpError(409, 'Una solicitud rechazada no puede convertirse.');
    if (request.order) return { client: request.client, order: request.order, alreadyConverted: true };
    let client = await tx.client.findFirst({ where: { email: { equals: request.email, mode: 'insensitive' } }, orderBy: { createdAt: 'asc' } });
    if (!client) client = await tx.client.create({ data: { contactName: request.fullName, email: request.email, phone: request.phone, companyName: request.companyName, taxId: request.taxId } });
    const year = new Date().getFullYear();
    const trackingNumber = await nextNumber(tx, `MOR-${year}-`, year, 'order', 'trackingNumber');
    const trackingToken = crypto.randomBytes(32).toString('hex');
    const order = await tx.order.create({ data: { clientId: client.id, serviceType: request.serviceType === 'Otro' ? request.customServiceType : request.serviceType, originAddress: request.originAddress, destinationAddress: request.destinationAddress, cargoDescription: request.cargoDescription, cargoWeightKg: request.cargoWeightKg, requestedDate: request.requestedDate, status: 'REQUESTED', paymentStatus: 'PENDING', trackingNumber, trackingCode: trackingNumber, trackingToken } });
    await tx.orderStatusHistory.create({ data: { orderId: order.id, changedById: req.user.id, newStatus: 'REQUESTED', notes: `Pedido creado desde la solicitud ${request.requestNumber}.` } });
    await tx.serviceRequest.update({ where: { id }, data: { status: 'CONVERTED', clientId: client.id, orderId: order.id, reviewedById: req.user.id, reviewedAt: new Date(), rejectionReason: null } });
    return { client, order, alreadyConverted: false };
  });
  const frontend = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
  res.json({ ok: true, client: result.client, order: result.order, trackingNumber: result.order.trackingNumber, privateUrl: `${frontend}/rastreo?token=${result.order.trackingToken}`, alreadyConverted: result.alreadyConverted });
}));

module.exports = router;
