import { useState } from 'react';
import { createVehicle } from '../../services/api';

const INITIAL_STATE = {
  internalCode: '',
  plateNumber: '',
  brand: '',
  model: '',
  year: '',
  vehicleType: '',
};

export default function VehicleForm({ onCreated }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');
      setMessage('');

      const response = await createVehicle({
        ...form,
        year: form.year ? Number(form.year) : null,
      });

      setForm(INITIAL_STATE);
      setMessage('Unidad registrada correctamente.');

      onCreated?.(response.vehicle);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Nueva unidad</h2>

      <div className="admin-form-grid">
        <label>
          Código interno *
          <input
            name="internalCode"
            value={form.internalCode}
            onChange={handleChange}
            placeholder="MOR-002"
            required
          />
        </label>

        <label>
          Placas
          <input
            name="plateNumber"
            value={form.plateNumber}
            onChange={handleChange}
          />
        </label>

        <label>
          Marca
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
          />
        </label>

        <label>
          Modelo
          <input
            name="model"
            value={form.model}
            onChange={handleChange}
          />
        </label>

        <label>
          Año
          <input
            type="number"
            name="year"
            min="1980"
            max="2100"
            value={form.year}
            onChange={handleChange}
          />
        </label>

        <label>
          Tipo de unidad
          <input
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
            placeholder="Tractocamión"
          />
        </label>
      </div>

      {error && <p className="admin-form-error">{error}</p>}
      {message && <p className="admin-form-success">{message}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Registrar unidad'}
      </button>
    </form>
  );
}