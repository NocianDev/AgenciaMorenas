import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import MediaShowcase from '../components/MediaShowcase';
import { assets, brand, truckServices, mediaSections } from '../data/siteData';

export default function TrucksPage() {
  return (
    <>
      <PageHero
        eyebrow="Transporte terrestre"
        title="Transporte de camiones con registro de ruta y unidad asignada."
        description="Morenas coordina servicios terrestres donde el cliente puede registrar una solicitud, recibir un ID de transporte y consultar el trayecto asociado a su correo."
        image={assets.containerTruck}
        primaryCta={{ label: 'Crear solicitud', href: '/rastreo-gps' }}
        secondaryCta={{ label: 'Cotizar por WhatsApp', href: `https://wa.me/${brand.whatsapp}`, target: '_blank' }}
        pills={['Origen y destino', 'Unidad asignada', 'ID de transporte', 'Consulta por correo']}
      />

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Servicios de transporte"
            title="Movimientos terrestres con información visible para el cliente"
            description="El servicio se presenta con una ruta clara: solicitud, registro de datos, unidad asignada y consulta del estado del recorrido."
          />
          <div className="card-grid two-up">
            {truckServices.map((service) => (
              <article className="detail-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container split-section reverse-mobile">
          <div>
            <SectionTitle
              eyebrow="Seguimiento amigable"
              title="Seguimiento claro para el cliente"
              description="La consulta se mantiene sencilla: correo, ID de transporte, origen, destino, unidad asignada y eventos principales."
            />
            <div className="bullet-list">
              <div>
                <strong>Registro claro</strong>
                <p>La solicitud pide únicamente datos necesarios para identificar al cliente, el trayecto y el tipo de servicio.</p>
              </div>
              <div>
                <strong>ID de transporte</strong>
                <p>Al crear una solicitud se genera un folio para consultar el servicio sin depender de llamadas repetidas.</p>
              </div>
              <div>
                <strong>Consulta por correo</strong>
                <p>El cliente puede recuperar sus solicitudes escribiendo el correo usado en el registro.</p>
              </div>
            </div>
          </div>
          <div className="card-shell photo-frame">
            <img src={assets.trailerUnit} alt="Camión de transporte Morenas" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
      <MediaShowcase data={mediaSections.trucks} />
    </>
  );
}
