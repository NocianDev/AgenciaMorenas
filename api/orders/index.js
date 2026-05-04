import { createOrder, orders } from '../_data/orders.js';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, orders });
  }

  if (req.method === 'POST') {
    const order = createOrder(req.body || {});
    return res.status(201).json({ ok: true, order });
  }

  return res.status(405).json({ ok: false, message: 'Método no permitido' });
}
