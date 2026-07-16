import { useRef, useState } from 'react';

import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import MediaShowcase from '../components/MediaShowcase';

import {
  assets,
  brand,
  mediaSections,
} from '../data/siteData';

import {
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
  const [trackingNumber, setTrackingNumber] =
    useState(() => {
      const searchParams =
        new URLSearchParams(
          window.location.search,
        );

      return (
        searchParams
          .get('tracking')
          ?.toUpperCase() || ''
      );
    });

  const [tracking, setTracking] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const trackingInputRef =
    useRef(null);

  async function search(event) {
    event.preventDefault();

    const value =
      trackingNumber
        .trim()
        .toUpperCase();

    if (!value) {
      setError(
        'Ingresa tu número de rastreo.',
      );

      setTracking(null);
      trackingInputRef.current?.focus();

      return;
    }

    setLoading(true);
    setError('');
    setTracking(null);

    try {
      const response =
        await getPublicTracking(value);

      setTracking(
        response.tracking,
      );

      setTrackingNumber(
        response.tracking.trackingNumber,
      );
    } catch (requestError) {
      setError(
        requestError.message ||
          'No se pudo consultar el pedido.',
      );
    } finally {
      setLoading(false);
    }
  }

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
        description="Revisa cada etapa del proceso con el número de rastreo proporcionado por Importaciones Morenas. No se muestran ubicaciones GPS."
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
            description="Escribe el folio con formato MOR-AAAA-000001."
          />

          <form
            className="tracking-search"
            onSubmit={search}
          >
            <label htmlFor="trackingNumber">
              Número de rastreo
            </label>

            <div>
              <input
                ref={trackingInputRef}
                id="trackingNumber"
                name="trackingNumber"
                type="text"
                value={trackingNumber}
                onChange={(event) =>
                  setTrackingNumber(
                    event.target.value.toUpperCase(),
                  )
                }
                placeholder="MOR-2026-000001"
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
                  Ten a la mano el número recibido
                  al registrar tu pedido.
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
                      (note) => (
                        <li key={note.id}>
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