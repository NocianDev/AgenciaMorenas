import { findOrderByTrackingId } from '../_data/orders.js';

export default function handler(req, res) {
  const order = findOrderByTrackingId(req.query.id || '');

  if (!order) {
    return res.status(404).json({ ok: false, message: 'No encontramos un servicio con ese ID.' });
  }

  return res.status(200).json({ ok: true, order });
}
