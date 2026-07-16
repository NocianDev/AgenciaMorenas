import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ClientForm from '../components/admin/ClientForm';
import VehicleForm from '../components/admin/VehicleForm';
import OrderForm from '../components/admin/OrderForm';

import {
  changeOrderStatus,
  getClients,
  getCurrentUser,
  getOrders,
  getVehicles,
  logout,
} from '../services/api';

const STATUS_LABELS = {
  REQUESTED: 'Solicitud recibida',
  UNDER_REVIEW: 'En revisión',
  QUOTED: 'Cotizado',
  AWAITING_PAYMENT: 'Pendiente de pago',
  PAID: 'Pagado',
  SCHEDULED: 'Programado',
  UNIT_ASSIGNED: 'Unidad asignada',
  READY_TO_DEPART: 'Listo para salir',
  IN_TRANSIT: 'En ruta',
  AT_CUSTOMS: 'En aduana',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
};

const STATUS_OPTIONS = Object.entries(STATUS_LABELS);

export default function AdminPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState('');
  const [error, setError] = useState('');
  const [activeForm, setActiveForm] = useState('');

  const loadData = useCallback(async () => {
    try {
      setError('');

      const [
        userResponse,
        ordersResponse,
        clientsResponse,
        vehiclesResponse,
      ] = await Promise.all([
        getCurrentUser(),
        getOrders(),
        getClients(),
        getVehicles(),
      ]);

      setUser(userResponse.user);
      setOrders(ordersResponse.orders || []);
      setClients(clientsResponse.clients || []);
      setVehicles(vehiclesResponse.vehicles || []);
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate('/admin/login', {
          replace: true,
        });

        return;
      }

      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate('/admin/login', {
        replace: true,
      });
    }
  }

  async function handleStatusChange(orderId, status) {
    try {
      setUpdatingId(orderId);
      setError('');

      await changeOrderStatus(
        orderId,
        status,
        `Estado actualizado desde el panel administrativo a ${
          STATUS_LABELS[status]
        }.`,
      );

      await loadData();
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate('/admin/login', {
          replace: true,
        });

        return;
      }

      setError(requestError.message);
    } finally {
      setUpdatingId('');
    }
  }

  if (loading) {
    return (
      <main className="admin-page">
        <h1>Panel administrativo</h1>
        <p>Cargando información...</p>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-heading">
        <div>
          <p className="admin-eyebrow">Importaciones Morenas</p>

          <h1>Control de pedidos y rutas</h1>

          <p>
            Consulta los servicios, crea registros y actualiza su
            estado operativo.
          </p>
        </div>

        <div className="admin-heading-actions">
          {user && (
            <div className="admin-current-user">
              <strong>{user.name}</strong>
              <span>{user.role}</span>
            </div>
          )}

          <button
            type="button"
            className="admin-refresh-button"
            onClick={loadData}
          >
            Actualizar
          </button>

          <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </section>

      <section className="admin-actions">
        <button
          type="button"
          onClick={() =>
            setActiveForm(
              activeForm === 'client' ? '' : 'client',
            )
          }
        >
          Nuevo cliente
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveForm(
              activeForm === 'vehicle' ? '' : 'vehicle',
            )
          }
        >
          Nueva unidad
        </button>

        <button
          type="button"
          onClick={() =>
            setActiveForm(
              activeForm === 'order' ? '' : 'order',
            )
          }
        >
          Nuevo pedido
        </button>
      </section>

      {activeForm === 'client' && (
        <ClientForm
          onCreated={async () => {
            await loadData();
            setActiveForm('');
          }}
        />
      )}

      {activeForm === 'vehicle' && (
        <VehicleForm
          onCreated={async () => {
            await loadData();
            setActiveForm('');
          }}
        />
      )}

      {activeForm === 'order' && (
        <OrderForm
          clients={clients}
          vehicles={vehicles}
          onCreated={async () => {
            await loadData();
            setActiveForm('');
          }}
        />
      )}

      {error && (
        <div className="admin-error" role="alert">
          {error}
        </div>
      )}

      <section className="admin-summary">
        <article>
          <strong>{orders.length}</strong>
          <span>Pedidos totales</span>
        </article>

        <article>
          <strong>
            {
              orders.filter(
                (order) => order.status === 'IN_TRANSIT',
              ).length
            }
          </strong>
          <span>En ruta</span>
        </article>

        <article>
          <strong>
            {
              orders.filter(
                (order) => order.status === 'DELIVERED',
              ).length
            }
          </strong>
          <span>Entregados</span>
        </article>
      </section>

      <section className="admin-orders">
        {orders.length === 0 ? (
          <div className="admin-empty">
            Todavía no hay pedidos registrados.
          </div>
        ) : (
          orders.map((order) => (
            <article
              className="admin-order-card"
              key={order.id}
            >
              <header>
                <div>
                  <span className="admin-tracking-code">
                    {order.trackingCode}
                  </span>

                  <h2>
                    {order.client?.companyName ||
                      order.client?.contactName ||
                      'Cliente'}
                  </h2>
                </div>

                <span
                  className={`admin-status admin-status-${order.status.toLowerCase()}`}
                >
                  {STATUS_LABELS[order.status] || order.status}
                </span>
              </header>

              <div className="admin-order-grid">
                <div>
                  <span>Contacto</span>

                  <strong>
                    {order.client?.contactName || 'Sin nombre'}
                  </strong>

                  <small>
                    {order.client?.phone || 'Sin teléfono'}
                  </small>
                </div>

                <div>
                  <span>Origen</span>
                  <strong>{order.originAddress}</strong>
                </div>

                <div>
                  <span>Destino</span>
                  <strong>{order.destinationAddress}</strong>
                </div>

                <div>
                  <span>Unidad</span>

                  <strong>
                    {order.vehicle?.internalCode ||
                      'Sin unidad asignada'}
                  </strong>

                  <small>
                    {order.vehicle?.plateNumber || ''}
                  </small>
                </div>
              </div>

              <div className="admin-status-control">
                <label htmlFor={`status-${order.id}`}>
                  Cambiar estado
                </label>

                <select
                  id={`status-${order.id}`}
                  value={order.status}
                  disabled={updatingId === order.id}
                  onChange={(event) =>
                    handleStatusChange(
                      order.id,
                      event.target.value,
                    )
                  }
                >
                  {STATUS_OPTIONS.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>

                {updatingId === order.id && (
                  <span>Guardando...</span>
                )}
              </div>

              <details className="admin-history">
                <summary>
                  Ver historial (
                  {order.statusHistory?.length || 0})
                </summary>

                <ol>
                  {(order.statusHistory || []).map((event) => (
                    <li key={event.id}>
                      <strong>
                        {STATUS_LABELS[event.newStatus] ||
                          event.newStatus}
                      </strong>

                      <span>
                        {new Date(
                          event.createdAt,
                        ).toLocaleString('es-MX')}
                      </span>

                      {event.notes && <p>{event.notes}</p>}
                    </li>
                  ))}
                </ol>
              </details>
            </article>
          ))
        )}
      </section>
    </main>
  );
}