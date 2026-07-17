import { useCallback, useEffect, useRef, useState } from 'react';

import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import MediaShowcase from '../components/MediaShowcase';

import {
  assets,
  brand,
  mediaSections,
} from '../data/siteData';

import {
  createPublicCheckoutSession,
  getPublicTracking,
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
  IN_TRANSIT: 'En tránsito',
  AT_CUSTOMS: 'En aduana',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
};

const PAYMENT_LABELS = {
  PENDING: 'Pendiente',
  PARTIALLY_PAID: 'Pago parcial',
  PAID: 'Pagado',
  FAILED: 'Pago no completado',
  REFUNDED: 'Reembolsado',
  CANCELLED: 'Cancelado',
};

export default function TrackingPage() {
  const [trackingToken, setTrackingToken] = useState('');

  const [tracking, setTracking] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const [paymentNotice, setPaymentNotice] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const activeTokenRef = useRef('');

  const trackingInputRef =
    useRef(null);

  const loadTracking = useCallback(async (token) => {
    const value = token.trim();
    if (!value) {
      setError('Ingresa tu clave privada de rastreo.');
      setTracking(null);
      trackingInputRef.current?.focus();
      return;
    }

    setLoading(true);
    setError('');
    setTracking(null);
    try {
      const response = await getPublicTracking(value);
      activeTokenRef.current = value;
      setTracking(response.tracking);
      setTrackingToken('');
    } catch (requestError) {
      setError(requestError.message || 'No se pudo consultar el pedido.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const payment = params.get('payment');
    if (payment === 'success') setPaymentNotice('Pago recibido. Estamos confirmando el estado.');
    if (payment === 'cancelled') setPaymentNotice('El pago fue cancelado. Puedes intentarlo nuevamente.');
    if (token) {
      window.history.replaceState({}, '', '/rastreo');
      loadTracking(token);
      if (payment === 'success') {
        const retryId = window.setTimeout(() => loadTracking(token), 2000);
        return () => window.clearTimeout(retryId);
      }
    }
  }, [loadTracking]);

  async function search(event) {
    event.preventDefault();
    await loadTracking(trackingToken);
  }

  async function payNow() {
    if (!activeTokenRef.current) return;
    try {
      setPaymentLoading(true);
      setError('');
      const response = await createPublicCheckoutSession(activeTokenRef.current);
      window.location.assign(response.url);
    } catch (requestError) {
      setError(requestError.message || 'No fue posible iniciar el pago.');
      setPaymentLoading(false);
    }
  }

  const formattedAmount = tracking?.totalAmountCents
    ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(tracking.totalAmountCents / 100)
    : null;

  const currentIndex =
    tracking?.timeline?.indexOf(
      tracking.status,
    ) ?? -1;

  const whatsappMessage =
    tracking
      ? `Hola, necesito ayuda con el pedido ${tracking.trackingNumber}.`
      : 'Hola, necesito ayuda para rastrear mi pedido.';

  return (
    <>
      <PageHero
        eyebrow="Seguimiento de pedidos"
        title="Consulta el avance de tu pedido."
        description="Abre tu enlace privado para revisar cada etapa del proceso. No se muestran ubicaciones GPS."
        image={assets.trackingMap}
        primaryCta={{
          label: 'Rastrear pedido',
          href: '#consulta',
        }}
        secondaryCta={{
          label: 'Contactar',
          href: `https://wa.me/${brand.whatsapp}`,
          target: '_blank',
        }}
        pills={[
          'Proceso claro',
          'Actualizaciones del pedido',
          'Consulta segura',
        ]}
      />

      <section
        className="section tracking-portal"
        id="consulta"
      >
        <div className="container tracking-portal-container">
          <SectionTitle
            eyebrow="Consulta pública"
            title="¿Dónde está mi pedido?"
            description="El enlace privado consulta el pedido automáticamente. También puedes pegar aquí la clave recibida."
          />

          <form
            className="tracking-search"
            onSubmit={search}
          >
            <label htmlFor="trackingToken">
              Clave privada de rastreo
            </label>

            <div>
              <input
                ref={trackingInputRef}
                id="trackingToken"
                name="trackingToken"
                type="text"
                value={trackingToken}
                onChange={(event) =>
                  setTrackingToken(
                    event.target.value.trim(),
                  )
                }
                placeholder="Pega aquí la clave recibida por WhatsApp"
                autoComplete="off"
                spellCheck="false"
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading
                  ? 'Consultando…'
                  : 'Consultar'}
              </button>
            </div>
          </form>

          {paymentNotice && <div className="alert-ok" role="status">{paymentNotice}</div>}

          {loading && (
            <div
              className="tracking-state"
              role="status"
            >
              <span className="tracking-spinner" />
              Consultando el avance de tu pedido…
            </div>
          )}

          {error && (
            <div
              className="tracking-state tracking-state-error"
              role="alert"
            >
              <strong>
                No pudimos mostrar el pedido
              </strong>

              <p>{error}</p>
            </div>
          )}

          {!loading &&
            !error &&
            !tracking && (
              <div className="tracking-state">
                <strong>
                  Tu seguimiento aparecerá aquí
                </strong>

                <p>
                  Abre el enlace privado o pega la clave
                  recibida por WhatsApp.
                </p>
              </div>
            )}

          {tracking && (
            <article
              className={`tracking-result ${
                tracking.status ===
                'CANCELLED'
                  ? 'is-cancelled'
                  : ''
              }`}
            >
              <header>
                <div>
                  <span>
                    Número de rastreo
                  </span>

                  <h2>
                    {
                      tracking.trackingNumber
                    }
                  </h2>

                  <p>
                    Actualizado{' '}
                    {new Date(
                      tracking.updatedAt,
                    ).toLocaleString(
                      'es-MX',
                    )}
                  </p>
                </div>

                <span className="tracking-current-status">
                  {
                    STATUS_LABELS[
                      tracking.status
                    ]
                  }
                </span>
              </header>

              <div className="tracking-progress-heading">
                <strong>
                  {tracking.status ===
                  'CANCELLED'
                    ? 'Proceso cancelado'
                    : 'Progreso del pedido'}
                </strong>

                <span>
                  {tracking.progress}%
                </span>
              </div>

              <div
                className="tracking-progress"
                aria-label={`Progreso ${tracking.progress}%`}
              >
                <span
                  style={{
                    width: `${tracking.progress}%`,
                  }}
                />
              </div>

              <div className="tracking-facts">
                <div>
                  <span>Origen</span>
                  <strong>
                    {tracking.origin}
                  </strong>
                </div>

                <div>
                  <span>Destino</span>
                  <strong>
                    {tracking.destination}
                  </strong>
                </div>

                <div>
                  <span>Servicio</span>
                  <strong>
                    {tracking.serviceType}
                  </strong>
                </div>

                <div>
                  <span>
                    Estado del pago
                  </span>

                  <strong>
                    {PAYMENT_LABELS[
                      tracking.paymentStatus
                    ] ||
                      tracking.paymentStatus}
                  </strong>
                </div>

                <div>
                  <span>Monto total</span>
                  <strong>{formattedAmount || 'Pendiente de asignar'}</strong>
                </div>
              </div>

              <section className="process-timeline">
                <h3>
                  Línea del tiempo
                </h3>

                <ol>
                  {tracking.timeline.map(
                    (status, index) => {
                      const current =
                        status ===
                        tracking.status;

                      const complete =
                        tracking.status !==
                          'CANCELLED' &&
                        index < currentIndex;

                      const itemClass =
                        current
                          ? 'current'
                          : complete
                            ? 'complete'
                            : 'pending';

                      return (
                        <li
                          className={
                            itemClass
                          }
                          key={status}
                        >
                          <span className="timeline-marker">
                            {complete
                              ? '✓'
                              : index + 1}
                          </span>

                          <strong>
                            {
                              STATUS_LABELS[
                                status
                              ]
                            }
                          </strong>
                        </li>
                      );
                    },
                  )}
                </ol>
              </section>

              <section className="public-notes">
                <h3>
                  Notas públicas
                </h3>

                {tracking.publicNotes
                  ?.length ? (
                  <ul>
                    {tracking.publicNotes.map(
                      (note, index) => (
                        <li key={`${note.createdAt}-${index}`}>
                          <p>
                            {note.message}
                          </p>

                          <time>
                            {new Date(
                              note.createdAt,
                            ).toLocaleString(
                              'es-MX',
                            )}
                          </time>
                        </li>
                      ),
                    )}
                  </ul>
                ) : (
                  <p>
                    No hay notas públicas para
                    este pedido.
                  </p>
                )}
              </section>

              {tracking.totalAmountCents > 0 && tracking.paymentStatus !== 'PAID' && (
                <button type="button" className="btn btn-primary tracking-pay-button" onClick={payNow} disabled={paymentLoading}>
                  {paymentLoading ? 'Abriendo pago…' : `Pagar ahora${formattedAmount ? ` · ${formattedAmount}` : ''}`}
                </button>
              )}

              <a
                className="btn btn-secondary tracking-whatsapp"
                href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
                  whatsappMessage,
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Contactar por WhatsApp
              </a>
            </article>
          )}
        </div>
      </section>

      <MediaShowcase
        data={mediaSections.tracking}
      />
    </>
  );
}
