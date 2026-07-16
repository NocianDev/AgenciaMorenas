const router = require('express').Router();
const prisma = require('../prisma.cjs');
const { asyncRoute, text, HttpError } = require('../utils/http.cjs');

const PROGRESS = { REQUESTED: 5, UNDER_REVIEW: 12, QUOTED: 20, AWAITING_PAYMENT: 28, PAID: 38, SCHEDULED: 48, UNIT_ASSIGNED: 58, READY_TO_DEPART: 68, IN_TRANSIT: 80, AT_CUSTOMS: 90, DELIVERED: 100, CANCELLED: 0 };
const TIMELINE = ['REQUESTED','UNDER_REVIEW','QUOTED','AWAITING_PAYMENT','PAID','SCHEDULED','UNIT_ASSIGNED','READY_TO_DEPART','IN_TRANSIT','AT_CUSTOMS','DELIVERED'];

router.get('/:trackingNumber', asyncRoute(async (req, res) => {
  const trackingNumber = text(req.params.trackingNumber).toUpperCase();
  const order = await prisma.order.findUnique({
    where: { trackingNumber },
    select: { trackingNumber: true, serviceType: true, originAddress: true, destinationAddress: true, status: true, paymentStatus: true, updatedAt: true, notes: { where: { isPublic: true }, orderBy: { createdAt: 'desc' }, select: { id: true, type: true, message: true, createdAt: true } } },
  });
  if (!order) throw new HttpError(404, 'No encontramos un pedido con ese número de rastreo.');
  res.json({ ok: true, tracking: { trackingNumber: order.trackingNumber, serviceType: order.serviceType, origin: order.originAddress, destination: order.destinationAddress, status: order.status, progress: PROGRESS[order.status], updatedAt: order.updatedAt, paymentStatus: order.paymentStatus, publicNotes: order.notes, timeline: TIMELINE } });
}));

module.exports = router;
