import { units } from '../_data/units.js';

export default function handler(req, res) {
  return res.status(200).json({
    ok: true,
    units: units.map(({ id, unitLabel, route, status, lastUpdate }) => ({
      id,
      unitLabel,
      route,
      status,
      lastUpdate,
    })),
  });
}
