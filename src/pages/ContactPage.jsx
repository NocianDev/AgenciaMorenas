import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import MediaShowcase from '../components/MediaShowcase';
import { Link } from 'react-router-dom';
import { branches, brand, mediaSections } from '../data/siteData';

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Atención para agencia aduanal, transporte y rastreo."
        description="Comunícate con Morenas para resolver dudas sobre regularización vehicular, importación, coordinación de camiones o consulta de un servicio registrado."
        image="/imagen-reemplazo/MorenasCambio1.jpeg"
        imageFit="contain"
        heroVariant="contact-request"
        primaryCta={{ label: 'Solicitar servicio', href: '/solicitar-servicio' }}
        secondaryCta={{ label: 'Escribir por WhatsApp', href: `https://wa.me/${brand.whatsapp}`, target: '_blank' }}
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
                <h3>Teléfono principal</h3>
                <p><a href={`tel:${brand.phoneMX}`}>{brand.phoneMX}</a></p>
              </article>
              {brand.phoneUS !== brand.phoneMX ? (
                <article className="detail-card">
                  <h3>Teléfono EE. UU.</h3>
                  <p><a href={`tel:${brand.phoneUS}`}>{brand.phoneUS}</a></p>
                </article>
              ) : null}
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

          <div className="form-card"><h3>Solicitud de servicio</h3><p>Registra los datos completos del cliente, la ruta y el servicio. Recibirás un folio para seguimiento administrativo.</p><Link className="btn btn-primary" to="/solicitar-servicio">Completar solicitud</Link></div>
        </div>
        <div className="contact-branches">{branches.map((branch) => <article className="detail-card" key={branch.city}><h3>{branch.title}</h3>{branch.addressLines ? branch.addressLines.map((line) => <p key={line}>{line}</p>) : <p>{branch.address}</p>}{branch.mapUrl && <a href={branch.mapUrl} target="_blank" rel="noreferrer">Ver en Google Maps</a>}</article>)}</div>
      </section>
      <MediaShowcase data={mediaSections.contact} />
    </>
  );
}
