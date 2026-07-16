import { useState } from 'react';
import { createClient } from '../../services/api';

const INITIAL_STATE = {
  contactName: '',
  companyName: '',
  email: '',
  phone: '',
  billingAddress: '',
  notes: '',
};

export default function ClientForm({ onCreated }) {
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

      const response = await createClient(form);

      setForm(INITIAL_STATE);
      setMessage('Cliente registrado correctamente.');

      onCreated?.(response.client);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Nuevo cliente</h2>

      <div className="admin-form-grid">
        <label>
          Nombre del contacto *
          <input
            name="contactName"
            value={form.contactName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Empresa
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
          />
        </label>

        <label>
          Correo electrónico *
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </label>

        <label className="admin-form-full">
          Dirección de facturación
          <input
            name="billingAddress"
            value={form.billingAddress}
            onChange={handleChange}
          />
        </label>

        <label className="admin-form-full">
          Notas
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
          />
        </label>
      </div>

      {error && <p className="admin-form-error">{error}</p>}
      {message && <p className="admin-form-success">{message}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Registrar cliente'}
      </button>
    </form>
  );
}