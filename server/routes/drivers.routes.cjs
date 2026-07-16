const router = require('express').Router();
const prisma = require('../prisma.cjs');
const { asyncRoute, text, optional, assertId, dateOrNull, HttpError } = require('../utils/http.cjs');
const data = (body) => {
  const fullName = text(body.fullName), phone = optional(body.phone), licenseNumber = optional(body.licenseNumber), licenseExpiration = dateOrNull(body.licenseExpiration, 'La fecha de vencimiento');
  if (fullName.length < 3) throw new HttpError(400, 'El nombre completo debe tener al menos 3 caracteres.');
  if (phone && !/^[+\d\s()-]{7,20}$/.test(phone)) throw new HttpError(400, 'El teléfono no es válido.');
  if (!licenseNumber) throw new HttpError(400, 'El número de licencia es obligatorio.');
  return { fullName, phone, licenseNumber, licenseExpiration, active: body.active !== false };
};
router.get('/', asyncRoute(async (_req, res) => res.json({ ok: true, drivers: await prisma.driver.findMany({ orderBy: { fullName: 'asc' } }) })));
router.post('/', asyncRoute(async (req, res) => {
  const payload = data(req.body);
  if (await prisma.driver.findFirst({ where: { licenseNumber: { equals: payload.licenseNumber, mode: 'insensitive' } } })) throw new HttpError(409, 'El número de licencia ya está registrado.');
  res.status(201).json({ ok: true, driver: await prisma.driver.create({ data: payload }) });
}));
router.get('/:id', asyncRoute(async (req, res) => { const driver = await prisma.driver.findUnique({ where: { id: assertId(req.params.id) } }); if (!driver) throw new HttpError(404, 'Operador no encontrado.'); res.json({ ok: true, driver }); }));
router.patch('/:id', asyncRoute(async (req, res) => res.json({ ok: true, driver: await prisma.driver.update({ where: { id: assertId(req.params.id) }, data: data(req.body) }) })));
router.delete('/:id', asyncRoute(async (req, res) => res.json({ ok: true, driver: await prisma.driver.update({ where: { id: assertId(req.params.id) }, data: { active: false } }) })));
module.exports = router;
