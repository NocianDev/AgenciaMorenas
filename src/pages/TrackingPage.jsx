import { useEffect, useMemo, useState } from 'react';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import MediaShowcase from '../components/MediaShowcase';
import { assets, brand, gpsUnits, mediaSections } from '../data/siteData';

const initialEmail = 'cliente@morenas.com';

export default function TrackingPage() {
  const [email, setEmail] = useState(initialEmail);
  const [trackingId, setTrackingId] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [requestForm, setRequestForm] = useState({
    name: 'Cliente Morenas',
    email: initialEmail,
    phone: '+52 812 402 0614',
    serviceType: 'Transporte terrestre',
    origin: 'Apodaca, Nuevo León',
    destination: 'Laredo, Texas',
    cargo: 'Carga terrestre en camión',
    date: '',
  });

  const selectedUnitId = selectedOrder?.unitId || unit?.id || gpsUnits[0].id;

  const routeSummary = useMemo(() => {
    if (!selectedOrder) return 'Registra una solicitud o consulta por correo para ver el trayecto.';
    return `${selectedOrder.origin} → ${selectedOrder.destination}`;
  }, [selectedOrder]);

  const readJson = async (response) => {
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('El backend de rastreo no está activo. Inicia npm run backend y vuelve a consultar.');
    }
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || 'No fue posible completar la consulta.');
    }
    return data;
  };

  const fetchUnit = async (id) => {
    const response = await fetch(`/api/tracking/unit?id=${encodeURIComponent(id)}`);
    return readJson(response);
  };

  const loadByEmail = async (emailToSearch = email) => {
    setLoading(true);
    setError('');
    setNotice('');
    try {
      const response = await fetch(`/api/orders/by-email?email=${encodeURIComponent(emailToSearch.trim())}`);
      const data = await readJson(response);
      setOrders(data.orders || []);

      if (data.orders?.length) {
        const first = data.orders[0];
        setSelectedOrder(first);
        setTrackingId(first.trackingId);
        const unitData = await fetchUnit(first.unitId);
        setUnit(unitData);
        setNotice(`Encontramos ${data.orders.length} servicio(s) registrado(s) para ${emailToSearch}.`);
      } else {
        setSelectedOrder(null);
        setUnit(null);
        setNotice('No encontramos servicios con ese correo. Puedes crear una solicitud desde el formulario.');
      }
    } catch (err) {
      setError(err.message);
      setSelectedOrder(null);
      setUnit(null);
    } finally {
      setLoading(false);
    }
  };

  const loadByTrackingId = async (id = trackingId) => {
    setLoading(true);
    setError('');
    setNotice('');
    try {
      const response = await fetch(`/api/orders/${encodeURIComponent(id.trim())}`);
      const data = await readJson(response);
      setSelectedOrder(data.order);
      setEmail(data.order.email);
      const unitData = await fetchUnit(data.order.unitId);
      setUnit(unitData);
      setNotice(`Servicio ${data.order.trackingId} localizado correctamente.`);
    } catch (err) {
      setError(err.message);
      setSelectedOrder(null);
      setUnit(null);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setNotice('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestForm),
      });
      const data = await readJson(response);
      setSelectedOrder(data.order);
      setTrackingId(data.order.trackingId);
      setEmail(data.order.email);
      setOrders((current) => [data.order, ...current.filter((item) => item.trackingId !== data.order.trackingId)]);
      const unitData = await fetchUnit(data.order.unitId);
      setUnit(unitData);
      setNotice(`Solicitud creada. ID de transporte: ${data.order.trackingId}. Puedes consultarlo con el correo ${data.order.email}.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectOrder = async (order) => {
    setSelectedOrder(order);
    setTrackingId(order.trackingId);
    setEmail(order.email);
    setError('');
    setNotice(`Mostrando servicio ${order.trackingId}.`);
    try {
      const unitData = await fetchUnit(order.unitId);
      setUnit(unitData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadByEmail(initialEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Rastreo para clientes"
        title="Consulta tu transporte con correo o ID de seguimiento."
        description="Consulta servicios registrados por correo o ID de transporte para revisar unidad asignada, trayecto y eventos principales del recorrido."
        image={assets.trackingMap}
        primaryCta={{ label: 'Crear solicitud', href: '#crear-solicitud' }}
        secondaryCta={{ label: 'Consultar por correo', href: '#consulta' }}
        pills={['Correo del cliente', 'ID de transporte', 'Unidad asignada', 'Trayecto']}
      />

      <section className="section tracking-suite" id="consulta">
        <div className="container tracking-dashboard-layout">
          <div className="tracking-left">
            <SectionTitle
              eyebrow="Consulta rápida"
              title="Busca un servicio registrado"
              description="Ingresa el correo del cliente o el ID de transporte para localizar un servicio registrado y revisar su información de seguimiento."
            />

            <div className="lookup-grid">
              <form className="lookup-card" onSubmit={(event) => { event.preventDefault(); loadByEmail(); }}>
                <label htmlFor="email">Correo del cliente</label>
                <div className="tracking-input-row">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cliente@correo.com"
                  />
                  <button type="submit" className="btn btn-primary compact">
                    {loading ? 'Buscando…' : 'Buscar'}
                  </button>
                </div>
              </form>

              <form className="lookup-card" onSubmit={(event) => { event.preventDefault(); loadByTrackingId(); }}>
                <label htmlFor="trackingId">ID de transporte</label>
                <div className="tracking-input-row">
                  <input
                    id="trackingId"
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                    placeholder="MOR-25001"
                  />
                  <button type="submit" className="btn btn-secondary compact">
                    Consultar ID
                  </button>
                </div>
              </form>
            </div>

            {notice ? <div className="alert-ok">{notice}</div> : null}
            {error ? <div className="alert-error">{error}</div> : null}

            {orders.length ? (
              <div className="orders-list">
                <h3>Servicios vinculados al correo</h3>
                {orders.map((order) => (
                  <button
                    type="button"
                    className={`order-row ${selectedOrder?.trackingId === order.trackingId ? 'active' : ''}`}
                    key={order.trackingId}
                    onClick={() => selectOrder(order)}
                  >
                    <span>
                      <strong>{order.trackingId}</strong>
                      <small>{order.serviceType}</small>
                    </span>
                    <span>
                      <strong>{order.unitId}</strong>
                      <small>{order.status}</small>
                    </span>
                  </button>
                ))}
              </div>
            ) : null}

            <article className="tracking-card client-tracking-card">
              <div className="tracking-head">
                <div>
                  <p className="card-kicker">Estatus del servicio</p>
                  <h3>{selectedOrder ? selectedOrder.trackingId : 'Sin servicio seleccionado'}</h3>
                  <p>{routeSummary}</p>
                </div>
                <span className={`status-badge ${selectedOrder?.status?.toLowerCase().replace(/\s+/g, '-') || 'programado'}`}>
                  {selectedOrder?.status || 'Pendiente'}
                </span>
              </div>

              <div className="stat-grid">
                <div className="stat-box">
                  <span>Unidad</span>
                  <strong>{selectedUnitId}</strong>
                </div>
                <div className="stat-box">
                  <span>Cliente</span>
                  <strong>{selectedOrder?.clientName || '—'}</strong>
                </div>
                <div className="stat-box">
                  <span>Último reporte</span>
                  <strong>{unit?.lastUpdate || '—'}</strong>
                </div>
                <div className="stat-box">
                  <span>Velocidad</span>
                  <strong>{unit ? `${unit.speedKmh} km/h` : '—'}</strong>
                </div>
              </div>

              <div className="map-card">
                <div className="fake-map client-map">
                  <div className="route-line" />
                  <div className="map-point start">Origen</div>
                  <div className="map-point current">Unidad</div>
                  <div className="map-point end">Destino</div>
                </div>
                <div className="coords-panel">
                  <div>
                    <span>Origen</span>
                    <strong>{selectedOrder?.origin || '—'}</strong>
                  </div>
                  <div>
                    <span>Destino</span>
                    <strong>{selectedOrder?.destination || '—'}</strong>
                  </div>
                  <div>
                    <span>Conductor / operador</span>
                    <strong>{unit?.driver || '—'}</strong>
                  </div>
                  <div>
                    <span>Ignición</span>
                    <strong>{unit ? (unit.ignition ? 'Encendida' : 'Apagada') : '—'}</strong>
                  </div>
                </div>
              </div>

              <div className="timeline">
                {(selectedOrder?.events || unit?.events || []).map((event) => (
                  <div className="timeline-item" key={`${event.time}-${event.title}`}>
                    <span>{event.time}</span>
                    <div>
                      <strong>{event.title}</strong>
                      <p>{event.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="tracking-side-panel">
            <div className="card-shell gradient-panel">
              <img src={assets.operationsCenter} alt="Panel de rastreo Morenas" />
            </div>
            <div className="shell-note">
              <strong>Forma fácil para el cliente</strong>
              <p>
                El cliente consulta su servicio con datos simples: correo, ID, unidad asignada, ruta y eventos principales del recorrido.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section soft-section" id="crear-solicitud">
        <div className="container split-section">
          <div>
            <SectionTitle
              eyebrow="Nueva solicitud"
              title="Registra un transporte y genera un ID de seguimiento"
              description="Completa los datos principales del servicio para generar un ID de seguimiento y vincular la solicitud a una unidad de referencia."
            />
            <div className="bullet-list">
              <div>
                <strong>1. El cliente registra su correo</strong>
                <p>Ese correo será la llave principal para consultar servicios asociados.</p>
              </div>
              <div>
                <strong>2. Se genera un ID de transporte</strong>
                <p>El sistema crea un folio tipo MOR-25001 para consultar el recorrido.</p>
              </div>
              <div>
                <strong>3. Se asigna una unidad</strong>
                <p>La solicitud queda vinculada a una unidad y una ruta para mostrar estatus.</p>
              </div>
            </div>
          </div>

          <div className="form-card request-card">
            <h3>Crear solicitud de transporte</h3>
            <p>Llena los datos principales para generar un ID de rastreo.</p>
            <form className="contact-form" onSubmit={createOrder}>
              <input
                type="text"
                placeholder="Nombre del cliente"
                value={requestForm.name}
                onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Correo del cliente"
                value={requestForm.email}
                onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={requestForm.phone}
                onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
              />
              <select
                value={requestForm.serviceType}
                onChange={(e) => setRequestForm({ ...requestForm, serviceType: e.target.value })}
              >
                <option>Transporte terrestre</option>
                <option>Regularización vehicular</option>
                <option>Importación vehicular</option>
                <option>Coordinación aduanal y transporte</option>
              </select>
              <input
                type="text"
                placeholder="Origen"
                value={requestForm.origin}
                onChange={(e) => setRequestForm({ ...requestForm, origin: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Destino"
                value={requestForm.destination}
                onChange={(e) => setRequestForm({ ...requestForm, destination: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Carga o descripción"
                value={requestForm.cargo}
                onChange={(e) => setRequestForm({ ...requestForm, cargo: e.target.value })}
              />
              <input
                type="date"
                value={requestForm.date}
                onChange={(e) => setRequestForm({ ...requestForm, date: e.target.value })}
              />
              <button className="btn btn-primary" type="submit">
                {loading ? 'Creando solicitud…' : 'Generar ID de transporte'}
              </button>
            </form>
          </div>
        </div>
      </section>
      <MediaShowcase data={mediaSections.tracking} />
    </>
  );
}
