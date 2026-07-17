const Stripe = require('stripe');
const { HttpError } = require('./http.cjs');

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new HttpError(503, 'Los pagos no están configurados.');
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function getFrontendUrl() {
  if (!process.env.FRONTEND_URL) throw new HttpError(503, 'Los pagos no están configurados.');
  return process.env.FRONTEND_URL.replace(/\/$/, '');
}

async function createCheckoutSession(order) {
  if (!Number.isInteger(order.totalAmountCents) || order.totalAmountCents <= 0) throw new HttpError(400, 'El pedido no tiene un monto válido para pagar.');
  if (order.paymentStatus === 'PAID') throw new HttpError(409, 'Este pedido ya está pagado.');
  if (!order.trackingToken) throw new HttpError(400, 'El pedido no tiene enlace privado de seguimiento.');

  const stripe = getStripe();
  const frontendUrl = getFrontendUrl();
  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price_data: { currency: 'mxn', unit_amount: order.totalAmountCents, product_data: { name: `Pedido ${order.trackingNumber}`, description: order.serviceType } }, quantity: 1 }],
    metadata: { orderId: order.id, trackingNumber: order.trackingNumber, trackingToken: order.trackingToken },
    success_url: `${frontendUrl}/rastreo?token=${encodeURIComponent(order.trackingToken)}&payment=success`,
    cancel_url: `${frontendUrl}/rastreo?token=${encodeURIComponent(order.trackingToken)}&payment=cancelled`,
  });
}

module.exports = { createCheckoutSession, getStripe };
