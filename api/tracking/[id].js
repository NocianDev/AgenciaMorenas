import { units } from '../_data/units.js';

export default function handler(req, res) {
  const { id } = req.query;
  const unit = units.find((item) => item.id.toUpperCase() === String(id).toUpperCase());

  if (!unit) {
    return res.status(404).json({
      ok: false,
      message: 'Unidad no encontrada',
      availableUnits: units.map((item) => item.id),
    });
  }

  return res.status(200).json(unit);
}
