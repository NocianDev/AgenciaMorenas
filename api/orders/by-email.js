import { findOrdersByEmail } from '../_data/orders.js';

export default function handler(req, res) {
  const email = req.query.email || '';
  return res.status(200).json({ ok: true, orders: findOrdersByEmail(email) });
}
