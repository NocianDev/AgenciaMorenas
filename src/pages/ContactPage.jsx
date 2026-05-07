import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import MediaShowcase from '../components/MediaShowcase';
import { assets, brand, mediaSections } from '../data/siteData';

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Atención para agencia aduanal, transporte y rastreo."
        description="Comunícate con Morenas para resolver dudas sobre regularización vehicular, importación, coordinación de camiones o consulta de un servicio registrado."
        image={assets.heroCustoms}
        primaryCta={{ label: 'Escribir por WhatsApp', href: `https://wa.me/${brand.whatsapp}`, target: '_blank' }}
        secondaryCta={{ label: 'Llamar', href: `tel:${brand.phoneMX}` }}
        pills={['WhatsApp', 'Llamada', 'Correo', 'Oficina']}
      />

      <section className="section">
        <div className="container split-section contact-layout">
          <div>
            <SectionTitle
              eyebrow="Canales activos"
              title="Contacto directo para iniciar o consultar un servicio"
              description="El cliente puede comunicarse por teléfono, WhatsApp o correo para solicitar orientación, confirmar información o pedir seguimiento de una solicitud ya registrada."
            />
            <div className="contact-card-grid">
              <article className="detail-card">
                <h3>Teléfono México</h3>
                <p><a href={`tel:${brand.phoneMX}`}>{brand.phoneMX}</a></p>
              </article>
              <article className="detail-card">
                <h3>Teléfono EE. UU.</h3>
                <p><a href={`tel:${brand.phoneUS}`}>{brand.phoneUS}</a></p>
              </article>
              <article className="detail-card">
                <h3>WhatsApp</h3>
                <p><a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">Iniciar conversación</a></p>
              </article>
              <article className="detail-card">
                <h3>Correo</h3>
                <p><a href={`mailto:${brand.email}`}>{brand.email}</a></p>
              </article>
            </div>
          </div>

          <div className="form-card">
            <h3>Solicitud de información</h3>
            <p>Este formulario puede conectarse después a un CRM o servicio de correo. Por ahora concentra los campos principales para una solicitud comercial.</p>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Nombre completo" />
              <input type="email" placeholder="Correo electrónico" />
              <input type="text" placeholder="Servicio requerido" />
              <textarea rows="5" placeholder="Describe brevemente tu trámite, ruta o consulta." />
              <button className="btn btn-primary" type="submit">Enviar solicitud</button>
            </form>
          </div>
        </div>
      </section>
      <MediaShowcase data={mediaSections.contact} />
    </>
  );
}
