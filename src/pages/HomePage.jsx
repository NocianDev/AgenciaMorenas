import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import MediaShowcase from '../components/MediaShowcase';
import { brand, heroHighlights, homeServices, processSteps, valueProps, gallery, faqs, mediaSections, operatingCoverage } from '../data/siteData';

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container">
          <div className="hero-brand-title hero-brand-title--wide">
            <span>Aduana y Transportes</span>
            <strong>Morenas</strong>
          </div>

          <div className="home-hero-content">
            <div className="hero-flyer-frame">
              <img
                src="/images/Morenas1.jpeg"
                alt="Importaciones Morenas: servicios de aduana y transporte entre Estados Unidos y México"
              />
            </div>
            <p className="home-lead">
              Morenas atiende a clientes que necesitan asesoría aduanal, legalización de vehículos, traslados y seguimiento de servicio con canales directos de comunicación en México y Estados Unidos.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">
                Cotizar por WhatsApp
              </a>
              <Link className="btn btn-secondary" to="/rastreo-gps">
                Rastrear mi traslado
              </Link>
            </div>
            <div className="pill-row">
              {heroHighlights.map((item) => <span className="pill" key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section coverage-section">
        <div className="container">
          <SectionTitle eyebrow="Cobertura operativa" title="Estamos donde tu trámite o traslado lo necesita" description="Atendemos servicios de aduana, legalización de vehículos y traslados en puntos clave para clientes de México y Estados Unidos." align="center" />
          <div className="coverage-grid">
            {operatingCoverage.map((item) => <article className="coverage-card" key={item.city}><span>{item.city}</span><h3>{item.focus}</h3><p>{item.text}</p></article>)}
          </div>
          <div className="coverage-actions">
            <a className="btn btn-primary" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">Solicitar atención</a>
            <Link className="btn btn-secondary" to="/oficinas">Ver oficinas</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Servicios" title="Lo que necesitas para mover o legalizar tu vehículo" description="Elige el servicio que buscas, conoce cómo te ayudamos y comunícate con nosotros por WhatsApp, teléfono o correo." align="center" />
          <div className="card-grid service-grid three-up">
            {homeServices.map((service) => (
              <article className={`service-card accent-${service.accent}`} key={service.title}>
                <div className="service-image"><img src={service.image} alt={service.title} loading="lazy" decoding="async" /></div>
                <p className="card-kicker">{service.eyebrow}</p><h3>{service.title}</h3><p>{service.summary}</p>
                <ul>{service.points.map((point) => <li key={point}>{point}</li>)}</ul>
                <Link to={service.path} className="text-link">Conocer servicio</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section home-confidence-section">
        <div className="container split-section">
          <div>
            <SectionTitle eyebrow="Operación y confianza" title="Atención clara, desde la primera pregunta" description="Te ayudamos a identificar el servicio correcto, pedir atención y revisar el avance de tu traslado sin dar vueltas entre distintos canales." align="center" />
            <div className="value-grid">{valueProps.map((item) => <article className="value-card" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div>
          <article className="media-card banner-card"><img src="/images/Morenas1.jpeg" alt="Información de servicios de Importaciones Morenas" loading="lazy" decoding="async" /></article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Cómo trabajamos" title="Del primer mensaje al seguimiento de tu servicio" description="Comenzamos con una consulta directa, revisamos tu caso y mantenemos la comunicación durante el proceso." align="center" />
          <div className="process-grid">{processSteps.map((step) => <article className="process-card" key={step.number}><span className="step-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <SectionTitle eyebrow="Áreas de atención" title="Aduana, traslados y seguimiento en un mismo lugar" description="Conoce los servicios y la operación de Morenas a través de imágenes reales de vehículos, plataformas y atención al cliente." align="center" />
          <div className="gallery-grid">{gallery.map((item) => <article className="gallery-card" key={item.title}><div className={`gallery-image ${item.fit === 'contain' ? 'gallery-image--contain' : ''}`}><img src={item.image} alt={item.title} loading="lazy" decoding="async" /></div><span className="tag">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container">
          <SectionTitle eyebrow="Rastreo y atención" title="Preguntas frecuentes" align="center" />
          <div className="faq-list">{faqs.map((item) => <article className="faq-item" key={item.q}><h3>{item.q}</h3><p>{item.a}</p></article>)}</div>
        </div>
      </section>
      <MediaShowcase data={mediaSections.home} />
    </>
  );
}
