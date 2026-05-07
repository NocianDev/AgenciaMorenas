import { units } from "../_data/units.js";

export default function handler(req, res) {
  const id = String(req.query.id || "").trim().toUpperCase();

  if (!id) {
    return res.status(400).json({
      ok: false,
      message: "Falta el ID de la unidad.",
      availableUnits: units.map((item) => item.id)
    });
  }

  const unit = units.find((item) => item.id.toUpperCase() === id);

  if (!unit) {
    return res.status(404).json({
      ok: false,
      message: "Unidad no encontrada.",
      availableUnits: units.map((item) => item.id)
    });
  }

  return res.status(200).json(unit);
}
