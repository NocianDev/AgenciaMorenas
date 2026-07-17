import { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom';

import {
  assets,
  brand,
  navItems,
} from '../data/siteData';

const DESKTOP_BREAKPOINT = 1161;

export default function Header() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        closeMenu();
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-strip">
        <div className="container strip-inner">
          <span>
            Aduana y transportes · Morenas
          </span>

          <span>
            Atención directa{' '}
            <span className="strip-separator">
              •
            </span>{' '}
            <a href={`tel:${brand.phoneUS}`}>
              {brand.phoneUS}
            </a>
          </span>
        </div>
      </div>

      <div className="container navbar">
        <Link
          to="/"
          className="brand-link"
          onClick={closeMenu}
          aria-label={brand.legalName}
        >
          <img
            src={assets.logo}
            alt={brand.legalName}
          />
        </Link>

        <nav
          id="main-navigation"
          className={`nav-panel ${
            menuOpen ? 'is-open' : ''
          }`}
          aria-label="Navegación principal"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? 'is-active' : ''
                }`.trim()
              }
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/solicitar-servicio"
            className="nav-cta"
            onClick={closeMenu}
          >
            Solicitar atención
          </Link>
        </nav>

        <button
          type="button"
          className={`menu-button ${
            menuOpen ? 'is-open' : ''
          }`}
          onClick={() =>
            setMenuOpen((current) => !current)
          }
          aria-label={
            menuOpen
              ? 'Cerrar menú'
              : 'Abrir menú'
          }
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
