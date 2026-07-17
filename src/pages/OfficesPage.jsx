import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import MediaShowcase from '../components/MediaShowcase';
import { brand, coverageCities, offices, mediaSections, operatingCoverage } from '../data/siteData';

export default function OfficesPage() {
  return (
    <>
      <PageHero
        eyebrow="Oficinas y atención"
        title="Canales de contacto para trámites, transporte y seguimiento."
        description="Morenas mantiene canales de atención en México y Estados Unidos para orientar solicitudes, resolver dudas comerciales y dar continuidad a servicios registrados."
        image="/imagen-reemplazo/MorenasCambio1.jpeg"
        imageFit="contain"
        heroVariant="contact-request"
        primaryCta={{ label: 'Llamar ahora', href: `tel:${brand.phoneMX}` }}
        secondaryCta={{ label: 'Enviar correo', href: `mailto:${brand.email}` }}
        pills={['México', 'Estados Unidos', 'WhatsApp', 'Correo']}
      />

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Ubicaciones"
            title="Puntos de atención y cobertura operativa"
            description="La información de contacto se presenta para facilitar llamadas, correos y coordinación con el equipo de Morenas."
          />
          <div className="card-grid two-up">
            {offices.map((office) => (
              <article className="office-card" key={office.city}>
                <span className="tag">{office.city}</span>
                <h3>{office.title}</h3>
                {office.addressLines ? office.addressLines.map((line) => <p key={line}>{line}</p>) : <p>{office.address}</p>}
                <ul>
                  {office.phone && <li>{office.phone}</li>}
                  {office.email && <li>{office.email}</li>}
                  {office.schedule && <li>{office.schedule}</li>}
                </ul>
                {office.mapUrl && <a className="text-link" href={office.mapUrl} target="_blank" rel="noreferrer">Ver en Google Maps</a>}
              </article>
            ))}
          </div>
          <div className="coverage-strip">
            <span>Cobertura</span>
            <p>{coverageCities.join(' · ')}</p>
          </div>
          <div className="coverage-grid compact-coverage-grid">
            {operatingCoverage.map((item) => (
              <article className="coverage-card" key={item.city}>
                <span>{item.city}</span>
                <h3>{item.focus}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <MediaShowcase data={mediaSections.offices} />
    </>
  );
}
