const router = require('express').Router();
const prisma = require('../prisma.cjs');
const { asyncRoute, HttpError } = require('../utils/http.cjs');
const { createCheckoutSession } = require('../utils/stripe.cjs');

const PROGRESS = { REQUESTED: 5, UNDER_REVIEW: 12, QUOTED: 20, AWAITING_PAYMENT: 28, PAID: 38, SCHEDULED: 48, UNIT_ASSIGNED: 58, READY_TO_DEPART: 68, IN_TRANSIT: 80, AT_CUSTOMS: 90, DELIVERED: 100, CANCELLED: 0 };
const TIMELINE = ['REQUESTED','UNDER_REVIEW','QUOTED','AWAITING_PAYMENT','PAID','SCHEDULED','UNIT_ASSIGNED','READY_TO_DEPART','IN_TRANSIT','AT_CUSTOMS','DELIVERED'];

const NOT_FOUND_MESSAGE = 'No fue posible consultar el seguimiento.';
const TOKEN_PATTERN = /^[a-fA-F0-9]{64}$/;

router.get('/token/:token', asyncRoute(async (req, res) => {
  const token = String(req.params.token || '');
  if (!TOKEN_PATTERN.test(token)) throw new HttpError(404, NOT_FOUND_MESSAGE);
  const order = await prisma.order.findUnique({
    where: { trackingToken: token },
    select: { trackingNumber: true, serviceType: true, originAddress: true, destinationAddress: true, status: true, paymentStatus: true, totalAmountCents: true, currency: true, updatedAt: true, notes: { where: { isPublic: true }, orderBy: { createdAt: 'desc' }, select: { type: true, message: true, createdAt: true } } },
  });
  if (!order) throw new HttpError(404, NOT_FOUND_MESSAGE);
  res.json({ ok: true, tracking: { trackingNumber: order.trackingNumber, serviceType: order.serviceType, origin: order.originAddress, destination: order.destinationAddress, status: order.status, progress: PROGRESS[order.status], updatedAt: order.updatedAt, paymentStatus: order.paymentStatus, totalAmountCents: order.totalAmountCents, currency: order.currency, publicNotes: order.notes, timeline: TIMELINE } });
}));

router.post('/token/:token/create-checkout-session', asyncRoute(async (req, res) => {
  const token = String(req.params.token || '');
  if (!TOKEN_PATTERN.test(token)) throw new HttpError(404, NOT_FOUND_MESSAGE);
  const order = await prisma.order.findUnique({ where: { trackingToken: token }, select: { id: true, trackingNumber: true, trackingToken: true, serviceType: true, totalAmountCents: true, paymentStatus: true } });
  if (!order) throw new HttpError(404, NOT_FOUND_MESSAGE);
  const session = await createCheckoutSession(order);
  await prisma.order.update({ where: { id: order.id }, data: { stripeCheckoutSessionId: session.id } });
  res.json({ url: session.url });
}));

module.exports = router;
