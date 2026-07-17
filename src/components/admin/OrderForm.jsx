import { useState } from 'react';
import { createOrder } from '../../services/api';

const INITIAL_STATE = {
  clientId: '',
  vehicleId: '',
  serviceType: '',
  originAddress: '',
  destinationAddress: '',
  cargoDescription: '',
  cargoWeightKg: '',
  requestedDate: '',
  totalAmount: '',
};

export default function OrderForm({
  clients,
  vehicles,
  onCreated,
}) {
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

      const response = await createOrder({
        ...form,
        vehicleId: form.vehicleId || null,
        cargoWeightKg: form.cargoWeightKg
          ? Number(form.cargoWeightKg)
          : null,
        requestedDate: form.requestedDate || null,
        totalAmountCents: form.totalAmount
          ? Math.round(Number(form.totalAmount) * 100)
          : null,
      });

      setForm(INITIAL_STATE);
      setMessage(
        `Pedido ${response.order.trackingNumber || response.order.trackingCode} creado correctamente.`,
      );

      onCreated?.(response.order);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Nuevo pedido</h2>

      <div className="admin-form-grid">
        <label>
          Cliente *
          <select
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un cliente</option>

            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.companyName || client.contactName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Unidad
          <select
            name="vehicleId"
            value={form.vehicleId}
            onChange={handleChange}
          >
            <option value="">Asignar después</option>

            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.internalCode}
                {vehicle.plateNumber
                  ? ` — ${vehicle.plateNumber}`
                  : ''}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tipo de servicio *
          <input
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            placeholder="Traslado de unidad"
            required
          />
        </label>

        <label>
          Fecha solicitada
          <input
            type="datetime-local"
            name="requestedDate"
            value={form.requestedDate}
            onChange={handleChange}
          />
        </label>

        <label className="admin-form-full">
          Origen *
          <input
            name="originAddress"
            value={form.originAddress}
            onChange={handleChange}
            required
          />
        </label>

        <label className="admin-form-full">
          Destino *
          <input
            name="destinationAddress"
            value={form.destinationAddress}
            onChange={handleChange}
            required
          />
        </label>

        <label className="admin-form-full">
          Descripción de la carga
          <textarea
            name="cargoDescription"
            value={form.cargoDescription}
            onChange={handleChange}
            rows="3"
          />
        </label>

        <label>
          Peso aproximado en kg
          <input
            type="number"
            min="0"
            name="cargoWeightKg"
            value={form.cargoWeightKg}
            onChange={handleChange}
          />
        </label>

        <label>
          Monto total en MXN
          <input type="number" min="0.01" step="0.01" name="totalAmount" value={form.totalAmount} onChange={handleChange} placeholder="4500.00" />
        </label>
      </div>

      {error && <p className="admin-form-error">{error}</p>}
      {message && <p className="admin-form-success">{message}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Crear pedido'}
      </button>
    </form>
  );
}
