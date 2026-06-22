import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import MediaShowcase from '../components/MediaShowcase';
import { brand, heroHighlights, homeServices, processSteps, valueProps, gallery, faqs, mediaSections, operatingCoverage } from '../data/siteData';

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div>
            <div className="hero-brand-title">
              <span>Aduana y Transportes</span>
              <strong>Morenas</strong>
            </div>
            <h1>Regularización, importación y transporte de camiones con seguimiento claro.</h1>
            <p className="home-lead">
              Morenas atiende a clientes que necesitan asesoría aduanal, legalización de vehículos, traslados y seguimiento de servicio con canales directos de comunicación en México y Estados Unidos.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">
                Solicitar atención
              </a>
              <Link className="btn btn-secondary" to="/rastreo-gps">
                Consultar mi transporte
              </Link>
            </div>
            <div className="pill-row">
              {heroHighlights.map((item) => (
                <span className="pill" key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="hero-stack">
            <div className="hero-card large photo-card customs-card">
              <img src="/imagenes-nuevas/Morenas7.jpeg" alt="Vehículos transportados por Importaciones Morenas" />
              <div className="floating-badge badge-gold">Agencia aduanal</div>
            </div>
            <div className="hero-card small offset photo-card truck-card">
              <img src="/imagenes-nuevas/Morenas6.jpeg" alt="Unidad de Importaciones Morenas durante un traslado" />
              <div className="floating-badge badge-red">Transporte terrestre</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section coverage-section">
        <div className="container">
          <SectionTitle
            eyebrow="Cobertura operativa"
            title="Cobertura operativa en frontera"
            description="Morenas atiende servicios de aduana, regularización vehicular, importación y transporte en puntos estratégicos para clientes en México y Estados Unidos."
          />
          <div className="coverage-grid">
            {operatingCoverage.map((item) => (
              <article className="coverage-card" key={item.city}>
                <span>{item.city}</span>
                <h3>{item.focus}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="coverage-actions">
            <a className="btn btn-primary" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">
              Solicitar atención
            </a>
            <Link className="btn btn-secondary" to="/oficinas">
              Ver oficinas
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Servicios"
            title="Atención aduanal y logística terrestre en un solo lugar"
            description="La atención se organiza en agencia aduanal, transportes y rastreo. Cada apartado explica el servicio, muestra material visual de la operación y conecta al cliente con WhatsApp, teléfono o consulta por correo."
          />
          <div className="card-grid service-grid three-up">
            {homeServices.map((service) => (
              <article className={`service-card accent-${service.accent}`} key={service.title}>
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <p className="card-kicker">{service.eyebrow}</p>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ul>
                  {service.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <Link to={service.path} className="text-link">Conocer servicio</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container split-section">
          <div>
            <SectionTitle
              eyebrow="Operación y confianza"
              title="Información clara para decidir, solicitar y dar seguimiento"
              description="El sitio está diseñado para que el cliente identifique el servicio correcto, solicite atención y consulte el avance de un traslado sin perder tiempo buscando información en distintos canales."
            />
            <div className="value-grid">
              {valueProps.map((item) => (
                <article className="value-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <article className="media-card banner-card">
            <img
              src="/images/Morenas1.jpeg"
              alt="Equipo de asesoría aduanal de Importaciones Morenas"
              loading="lazy"
              decoding="async"
            />
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Flujo de servicio"
            title="Del primer contacto al seguimiento del recorrido"
            description="El proceso comienza con una consulta directa y continúa con la revisión del caso, el registro del servicio y el seguimiento cuando existe una unidad o traslado asignado."
            align="center"
          />
          <div className="process-grid">
            {processSteps.map((step) => (
              <article className="process-card" key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <SectionTitle
            eyebrow="Áreas de atención"
            title="Aduanas, transporte y rastreo presentados con una imagen consistente"
            description="La comunicación visual utiliza vehículos, plataformas, asesoría y material de operación para presentar a Morenas como una empresa enfocada en aduana, legalización y transportes."
          />
          <div className="gallery-grid">
            {gallery.map((item) => (
              <article className="gallery-card" key={item.title}>
                <div className="gallery-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <span className="tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container">
          <SectionTitle
            eyebrow="Rastreo y atención"
            title="Consultas pensadas para el cliente"
          />
          <div className="faq-list">
            {faqs.map((item) => (
              <article className="faq-item" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <MediaShowcase data={mediaSections.home} />
    </>
  );
}
