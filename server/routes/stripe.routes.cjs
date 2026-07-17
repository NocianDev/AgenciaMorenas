const express = require('express');
const router = express.Router();
const prisma = require('../prisma.cjs');
const { getStripe } = require('../utils/stripe.cjs');

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  let event;
  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) return res.status(503).send('Webhook no configurado.');
    event = getStripe().webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (_error) {
    return res.status(400).send('Firma de webhook inválida.');
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;
    if (orderId && session.payment_status === 'paid') {
      try {
        const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id || null;
        await prisma.order.updateMany({
          where: { id: orderId, paymentStatus: { not: 'PAID' } },
          data: { paymentStatus: 'PAID', stripeCheckoutSessionId: session.id, stripePaymentIntentId: paymentIntentId, paidAt: new Date() },
        });
      } catch (error) {
        console.error('No fue posible registrar el pago de Stripe.', error);
        return res.sendStatus(500);
      }
    }
  }

  return res.sendStatus(200);
});

module.exports = router;
