import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getCurrentUser,
  login,
} from '../services/api';

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [checkingSession, setCheckingSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkSession() {
      try {
        await getCurrentUser();
        navigate('/admin', {
          replace: true,
        });
      } catch {
        setCheckingSession(false);
      }
    }

    checkSession();
  }, [navigate]);

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

      await login(form.email, form.password);

      navigate('/admin', {
        replace: true,
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="admin-login-page">
        <p>Comprobando sesión...</p>
      </main>
    );
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <p className="admin-login-eyebrow">
          Importaciones Morenas
        </p>

        <h1>Panel administrativo</h1>

        <p className="admin-login-description">
          Inicia sesión para administrar clientes, unidades,
          pedidos y rutas.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Correo electrónico
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <div className="admin-login-error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
      </section>
    </main>
  );
}