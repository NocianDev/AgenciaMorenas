import { useState } from 'react';
import { addOrderNote } from '../../services/api';

const NOTE_TYPE_LABELS = {
  NOTE: 'Nota',
  DELAY: 'Retraso',
  CUSTOMS: 'Aduana',
  DAMAGE: 'Daño',
  DOCUMENT: 'Documento',
  OTHER: 'Otro',
};

export default function OrderNotes({ order, onAdded }) {
  const [type, setType] = useState('NOTE');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');

      await addOrderNote(order.id, {
        type,
        message,
      });

      setMessage('');
      setType('NOTE');

      await onAdded?.();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <details className="admin-notes">
      <summary>
        Notas e incidencias ({order.notes?.length || 0})
      </summary>

      <form onSubmit={submit}>
        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          disabled={loading}
        >
          {Object.entries(NOTE_TYPE_LABELS).map(
            ([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ),
          )}
        </select>

        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Agregar nota o incidencia"
          required
          minLength={3}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar'}
        </button>
      </form>

      {error && (
        <p className="admin-form-error">
          {error}
        </p>
      )}

      <ul>
        {(order.notes || []).map((note) => (
          <li key={note.id}>
            <strong>
              {NOTE_TYPE_LABELS[note.type] || note.type}
            </strong>

            <span>{note.message}</span>

            <small>
              {note.author?.name || 'Usuario'} ·{' '}
              {new Date(note.createdAt).toLocaleString('es-MX')}
            </small>
          </li>
        ))}
      </ul>
    </details>
  );
}