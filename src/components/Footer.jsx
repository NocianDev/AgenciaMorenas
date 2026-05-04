import { Link } from 'react-router-dom';
import { brand, navItems } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-kicker">Morenas</p>
          <h3>{brand.tagline}</h3>
          <p>{brand.shortDescription}</p>
        </div>
        <div>
          <p className="footer-title">Secciones</p>
          <div className="footer-links">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="footer-title">Contacto</p>
          <div className="footer-links">
            <a href={`tel:${brand.phoneMX}`}>{brand.phoneMX}</a>
            <a href={`tel:${brand.phoneUS}`}>{brand.phoneUS}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <span>{brand.address}</span>
            <span>{brand.hours}</span>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 {brand.legalName}. Agencia aduanal, regularización vehicular y transporte terrestre.</span>
      </div>
    </footer>
  );
}
