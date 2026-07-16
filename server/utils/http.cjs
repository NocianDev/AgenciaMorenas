class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
const text = (value) => value == null ? '' : String(value).trim();
const optional = (value) => text(value) || null;
const assertId = (value, label = 'ID') => {
  const id = text(value);
  if (!id || id.length > 64 || !/^[a-zA-Z0-9_-]+$/.test(id)) throw new HttpError(400, `${label} no válido.`);
  return id;
};
const dateOrNull = (value, label) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new HttpError(400, `${label} no válida.`);
  return date;
};
const numberOrNull = (value, label) => {
  if (value === '' || value == null) return null;
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) throw new HttpError(400, `${label} no válido.`);
  return number;
};
module.exports = { HttpError, asyncRoute, text, optional, assertId, dateOrNull, numberOrNull };
