import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { brand, heroHighlights, homeServices, processSteps, valueProps, gallery, faqs } from '../data/siteData';

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div>
            <p className="eyebrow">Morenas · Aduanas y transporte terrestre</p>
            <h1>Regularización, importación y transporte de camiones con seguimiento claro.</h1>
            <p className="home-lead">
              Morenas acompaña a clientes que necesitan resolver trámites aduanales, coordinar
              transporte terrestre y consultar el avance de sus servicios desde una plataforma
              simple, ordenada y diseñada para tomar acción rápido.
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
              <img src="/images/photo-customs-hq.jpg" alt="Regularización vehicular y agencia aduanal" />
              <div className="floating-badge badge-gold">Agencia aduanal</div>
            </div>
            <div className="hero-card small offset photo-card truck-card">
              <img src="/images/photo-trucks-hq.jpg" alt="Transporte terrestre de camiones" />
              <div className="floating-badge badge-red">Transporte terrestre</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Servicios"
            title="Atención aduanal y logística terrestre en un solo lugar"
            description="Morenas concentra sus servicios en tres áreas: gestión aduanal, transporte de camiones y rastreo del servicio registrado. El cliente puede solicitar atención, crear una solicitud y consultar el avance con su correo o ID de transporte."
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
              description="La plataforma está pensada para clientes que necesitan respuestas concretas: qué servicio se atiende, qué datos deben entregar, cuál es el ID de seguimiento y cómo consultar el recorrido de una unidad asignada."
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
          <div className="side-visual card-shell gradient-panel">
            <img src="/images/photo-control-hq.jpg" alt="Centro de control operativo" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Flujo de servicio"
            title="Del primer contacto al seguimiento del recorrido"
            description="El proceso se construyó para que el cliente pueda iniciar una solicitud, recibir un ID y consultar el estado de su transporte de forma sencilla."
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
            description="La comunicación visual se enfoca en patios de revisión, unidades de camión, paneles de control y rutas monitoreadas para que el giro de la empresa se entienda desde el primer vistazo."
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
    </>
  );
}
