const router = require('express').Router();
const prisma = require('../prisma.cjs');
const { asyncRoute, text, optional, HttpError } = require('../utils/http.cjs');
router.get('/', asyncRoute(async (_req, res) => res.json({ ok: true, clients: await prisma.client.findMany({ orderBy: { createdAt: 'desc' }, include: { orders: true } }) })));
router.post('/', asyncRoute(async (req, res) => {
  const contactName = text(req.body.contactName), email = text(req.body.email).toLowerCase();
  if (!contactName || !/^\S+@\S+\.\S+$/.test(email)) throw new HttpError(400, 'El nombre y un correo válido son obligatorios.');
  if (await prisma.client.findFirst({ where: { email: { equals: email, mode: 'insensitive' } } })) throw new HttpError(409, 'Ya existe un cliente con ese correo.');
  const client = await prisma.client.create({ data: { contactName, email, companyName: optional(req.body.companyName), phone: optional(req.body.phone), billingAddress: optional(req.body.billingAddress), taxId: optional(req.body.taxId), notes: optional(req.body.notes) } });
  res.status(201).json({ ok: true, client });
}));
module.exports = router;
