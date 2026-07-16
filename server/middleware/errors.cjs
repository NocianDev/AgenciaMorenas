function notFound(req, res) { res.status(404).json({ ok: false, message: `Ruta no encontrada: ${req.method} ${req.path}` }); }
function errorHandler(error, _req, res, _next) {
  console.error(error);
  if (error.code === 'P2002') return res.status(409).json({ ok: false, message: 'Ya existe un registro con esos datos únicos.' });
  if (error.code === 'P2025') return res.status(404).json({ ok: false, message: 'Registro no encontrado.' });
  res.status(error.status || 500).json({ ok: false, message: error.status ? error.message : 'Ocurrió un error interno. Intenta nuevamente.' });
}
module.exports = { notFound, errorHandler };
