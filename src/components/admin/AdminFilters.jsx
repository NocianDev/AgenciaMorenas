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

const INITIAL_FILTERS = {
  search: '',
  status: '',
  vehicleId: '',
  driverId: '',
};

export default function AdminFilters({
  filters,
  setFilters,
  vehicles,
  drivers,
}) {
  function change(event) {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters(INITIAL_FILTERS);
  }

  return (
    <section className="admin-filters">
      <input
        name="search"
        value={filters.search}
        onChange={change}
        placeholder="Buscar folio, cliente o teléfono"
      />

      <select
        name="status"
        value={filters.status}
        onChange={change}
      >
        <option value="">Todos los estados</option>

        {Object.entries(STATUS_LABELS).map(
          ([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ),
        )}
      </select>

      <select
        name="vehicleId"
        value={filters.vehicleId}
        onChange={change}
      >
        <option value="">Todas las unidades</option>

        {vehicles.map((vehicle) => (
          <option
            value={vehicle.id}
            key={vehicle.id}
          >
            {vehicle.internalCode}
          </option>
        ))}
      </select>

      <select
        name="driverId"
        value={filters.driverId}
        onChange={change}
      >
        <option value="">Todos los operadores</option>

        {drivers.map((driver) => (
          <option
            value={driver.id}
            key={driver.id}
          >
            {driver.fullName}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={clearFilters}
      >
        Limpiar filtros
      </button>
    </section>
  );
}