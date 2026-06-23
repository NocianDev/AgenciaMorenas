import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { brand, navItems, assets } from '../data/siteData';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-strip">
        <div className="container strip-inner">
          <span>Aduana y transportes · Morenas</span>
          <span>
            Atención directa <span className="strip-separator">•</span>
            <a href={`tel:${brand.phoneUS}`}>{brand.phoneUS}</a>
          </span>
        </div>
      </div>

      <div className="container navbar">
        <Link to="/" className="brand-link" onClick={closeMenu} aria-label={brand.legalName}>
          <img src={assets.logo} alt={brand.legalName} />
        </Link>

        <nav className={`nav-panel ${menuOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`.trim()}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={`https://wa.me/${brand.whatsappUS}`}
            className="nav-cta"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Solicitar atención
          </a>
        </nav>

        <button
          type="button"
          className={`menu-button ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
