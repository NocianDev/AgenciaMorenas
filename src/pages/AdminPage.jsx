import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  activateVehicle,
  changeOrderStatus,
  deactivateDriver,
  deactivateVehicle,
  getClients,
  getCurrentUser,
  getDrivers,
  getOrders,
  getVehicles,
  logout,
} from '../services/api';

import ClientForm from '../components/admin/ClientForm';
import VehicleForm from '../components/admin/VehicleForm';
import OrderForm from '../components/admin/OrderForm';
import DriverForm from '../components/admin/DriverForm';
import DashboardSummary from '../components/admin/DashboardSummary';
import AdminFilters from '../components/admin/AdminFilters';
import OrderCard from '../components/admin/OrderCard';
import OrderEditForm from '../components/admin/OrderEditForm';

const emptyFilters = {
  search: '',
  status: '',
  vehicleId: '',
  driverId: '',
};

const ROLE_LABELS = {
  OWNER: 'Propietario',
  DISPATCHER: 'Despachador',
  DRIVER: 'Operador',
  CLIENT: 'Cliente',
};

const VEHICLE_STATUS_LABELS = {
  AVAILABLE: 'Disponible',
  ASSIGNED: 'Asignada',
  IN_TRANSIT: 'En ruta',
  MAINTENANCE: 'En mantenimiento',
  OUT_OF_SERVICE: 'Fuera de servicio',
};

export default function AdminPage() {
  const navigate = useNavigate();
  const editOrderRef = useRef(null);

  const [data, setData] = useState({
    orders: [],
    clients: [],
    vehicles: [],
    drivers: [],
    user: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeForm, setActiveForm] = useState('');
  const [editing, setEditing] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);
  const [updating, setUpdating] = useState('');
  const [filters, setFilters] = useState(emptyFilters);

  const load = useCallback(async () => {
    try {
      setError('');

      const [
        userResponse,
        ordersResponse,
        clientsResponse,
        vehiclesResponse,
        driversResponse,
      ] = await Promise.all([
        getCurrentUser(),
        getOrders(),
        getClients(),
        getVehicles(),
        getDrivers(),
      ]);

      if (
        !['OWNER', 'DISPATCHER'].includes(
          userResponse.user.role,
        )
      ) {
        navigate('/', {
          replace: true,
        });

        return;
      }

      setData({
        user: userResponse.user,
        orders: ordersResponse.orders || [],
        clients: clientsResponse.clients || [],
        vehicles: vehiclesResponse.vehicles || [],
        drivers: driversResponse.drivers || [],
      });
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate('/admin/login', {
          replace: true,
        });
      } else if (requestError.status === 403) {
        navigate('/', {
          replace: true,
        });
      } else {
        setError(requestError.message);
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    load();
  }, [load]);

  const orders = useMemo(() => {
    return data.orders.filter((order) => {
      const search = filters.search.trim().toLowerCase();

      const matchesSearch =
        !search ||
        [
          order.trackingCode,
          order.client?.contactName,
          order.client?.companyName,
          order.client?.phone,
        ].some((value) =>
          value?.toLowerCase().includes(search),
        );

      const matchesStatus =
        !filters.status ||
        order.status === filters.status;

      const matchesVehicle =
        !filters.vehicleId ||
        order.vehicleId === filters.vehicleId;

      const matchesDriver =
        !filters.driverId ||
        order.driverId === filters.driverId;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVehicle &&
        matchesDriver
      );
    });
  }, [data.orders, filters]);

  function handleEditOrder(order) {
    setEditing(order);
    setError('');
    setSuccess('');

    window.setTimeout(() => {
      editOrderRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 80);
  }

  async function handleStatusChange(id, value) {
    try {
      setUpdating(id);
      setError('');
      setSuccess('');

      await changeOrderStatus(
        id,
        value,
        `Estado actualizado desde el panel a ${value}.`,
      );

      setSuccess('Estado actualizado correctamente.');

      await load();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdating('');
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate('/admin/login', {
        replace: true,
      });
    }
  }

  async function handleDeactivateVehicle(vehicle) {
    const confirmed = window.confirm(
      `¿Seguro que deseas desactivar la unidad ${vehicle.internalCode}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      await deactivateVehicle(vehicle.id);
      await load();

      setSuccess(
        `La unidad ${vehicle.internalCode} fue desactivada.`,
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleActivateVehicle(vehicle) {
    try {
      setError('');
      setSuccess('');

      await activateVehicle(vehicle.id);
      await load();

      setSuccess(
        `La unidad ${vehicle.internalCode} fue reactivada.`,
      );
    } catch (requestError) {
      setError(requestError.message);
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
          <p className="admin-eyebrow">
            Importaciones Morenas
          </p>

          <h1>Control de pedidos y rutas</h1>

          <p>
            Administra la operación logística desde un solo
            lugar.
          </p>
        </div>

        <div className="admin-heading-actions">
          <div className="admin-current-user">
            <strong>{data.user?.name}</strong>

            <span>
              {ROLE_LABELS[data.user?.role] ||
                data.user?.role}
            </span>
          </div>

          <button
            type="button"
            onClick={load}
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
        {[
          ['client', 'Nuevo cliente'],
          ['vehicle', 'Nueva unidad'],
          ['driver', 'Nuevo operador'],
          ['order', 'Nuevo pedido'],
        ].map(([value, label]) => (
          <button
            type="button"
            key={value}
            onClick={() =>
              setActiveForm(
                activeForm === value ? '' : value,
              )
            }
          >
            {label}
          </button>
        ))}
      </section>

      {activeForm === 'client' && (
        <ClientForm
          onCreated={async () => {
            await load();
            setActiveForm('');
            setSuccess('Cliente registrado.');
          }}
        />
      )}

      {activeForm === 'vehicle' && (
        <VehicleForm
          onCreated={async () => {
            await load();
            setActiveForm('');
            setSuccess('Unidad registrada.');
          }}
        />
      )}

      {activeForm === 'driver' && (
        <DriverForm
          driver={editingDriver}
          onCancel={() => {
            setActiveForm('');
            setEditingDriver(null);
          }}
          onSaved={async () => {
            await load();
            setActiveForm('');
            setEditingDriver(null);
            setSuccess('Operador guardado.');
          }}
        />
      )}

      {activeForm === 'order' && (
        <OrderForm
          clients={data.clients}
          vehicles={data.vehicles.filter(
            (vehicle) =>
              vehicle.active &&
              vehicle.status !== 'IN_TRANSIT',
          )}
          onCreated={async () => {
            await load();
            setActiveForm('');
            setSuccess('Pedido creado.');
          }}
        />
      )}

      {editing && (
        <div
          ref={editOrderRef}
          className="admin-edit-form-anchor"
        >
          <OrderEditForm
            order={editing}
            clients={data.clients}
            vehicles={data.vehicles}
            drivers={data.drivers}
            onCancel={() => setEditing(null)}
            onSaved={async () => {
              setEditing(null);
              await load();
              setSuccess('Pedido actualizado.');
            }}
          />
        </div>
      )}

      {error && (
        <div
          className="admin-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="admin-success"
          role="status"
        >
          {success}
        </div>
      )}

      <DashboardSummary {...data} />

      <section className="admin-vehicles">
        <h2>Unidades</h2>

        <div>
          {data.vehicles.length ? (
            data.vehicles.map((vehicle) => (
              <article key={vehicle.id}>
                <strong>{vehicle.internalCode}</strong>

                <span>
                  {vehicle.plateNumber || 'Sin placas'} ·{' '}
                  {vehicle.brand || 'Sin marca'}{' '}
                  {vehicle.model || ''}
                </span>

                <span>
                  Estado:{' '}
                  {VEHICLE_STATUS_LABELS[vehicle.status] ||
                    vehicle.status}
                </span>

                <span>
                  {vehicle.active ? 'Activa' : 'Inactiva'}
                </span>

                {vehicle.active ? (
                  <button
                    type="button"
                    onClick={() =>
                      handleDeactivateVehicle(vehicle)
                    }
                  >
                    Desactivar
                  </button>
                ) : (
                  <button
  type="button"
  className="admin-vehicle-activate-button"
  onClick={() =>
    handleActivateVehicle(vehicle)
  }
>
  Reactivar
</button>
                )}
              </article>
            ))
          ) : (
            <p>No hay unidades registradas.</p>
          )}
        </div>
      </section>

      <section className="admin-drivers">
        <h2>Operadores</h2>

        <div>
          {data.drivers.map((driver) => (
            <article key={driver.id}>
              <strong>{driver.fullName}</strong>

              <span>
                {driver.licenseNumber || 'Sin licencia'} ·{' '}
                {driver.active ? 'Activo' : 'Inactivo'}
              </span>

              <button
                type="button"
                onClick={() => {
                  setEditingDriver(driver);
                  setActiveForm('driver');
                }}
              >
                Consultar / editar
              </button>

              {driver.active && (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      setError('');
                      setSuccess('');

                      await deactivateDriver(driver.id);
                      await load();

                      setSuccess(
                        'Operador desactivado.',
                      );
                    } catch (requestError) {
                      setError(requestError.message);
                    }
                  }}
                >
                  Desactivar
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      <AdminFilters
        filters={filters}
        setFilters={setFilters}
        vehicles={data.vehicles}
        drivers={data.drivers}
      />

      <section className="admin-orders">
        {orders.length ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              updating={updating === order.id}
              onStatus={handleStatusChange}
              onEdit={handleEditOrder}
              onReload={load}
            />
          ))
        ) : (
          <div className="admin-empty">
            No hay pedidos que coincidan con los filtros.
          </div>
        )}
      </section>
    </main>
  );
}