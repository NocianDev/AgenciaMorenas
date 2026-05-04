import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import { assets, brand, customServices } from '../data/siteData';

export default function CustomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Agencia aduanal"
        title="Regularización e importación vehicular con acompañamiento documental."
        description="Morenas atiende procesos donde el cliente requiere revisar requisitos, ordenar documentación y dar continuidad a trámites relacionados con vehículos americanos e importación vehicular."
        image={assets.customsVehicle}
        primaryCta={{ label: 'Solicitar asesoría', href: `https://wa.me/${brand.whatsapp}`, target: '_blank' }}
        secondaryCta={{ label: 'Contactar oficina', href: '/contacto' }}
        pills={['Regularización', 'Importación', 'Expediente', 'Seguimiento']}
      />

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Atención aduanal"
            title="Un servicio para avanzar con documentos claros y comunicación directa"
            description="El objetivo es que el cliente conozca qué datos se revisan, qué información debe preparar y cómo se mantiene el seguimiento durante las etapas del proceso."
          />
          <div className="card-grid two-up">
            {customServices.map((service) => (
              <article className="detail-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container split-section">
          <div className="card-shell photo-frame">
            <img src={assets.heroCustoms} alt="Agencia aduanal Morenas" />
          </div>
          <div>
            <SectionTitle
              eyebrow="Cómo se atiende"
              title="Revisión inicial, integración de datos y seguimiento del caso"
              description="La atención inicia con la revisión del caso y continúa con una comunicación ordenada para que el cliente tenga mayor claridad sobre el avance."
            />
            <div className="bullet-list">
              <div>
                <strong>Revisión previa</strong>
                <p>Se analiza la información del vehículo y los datos disponibles antes de indicar los siguientes pasos.</p>
              </div>
              <div>
                <strong>Documentación ordenada</strong>
                <p>El servicio busca reducir confusiones desde el inicio mediante una preparación más clara del expediente.</p>
              </div>
              <div>
                <strong>Contacto durante el proceso</strong>
                <p>El cliente conserva un canal directo para aclarar dudas y recibir información de seguimiento.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
