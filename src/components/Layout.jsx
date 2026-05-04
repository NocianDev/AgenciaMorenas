import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { brand } from '../data/siteData';

export default function Layout() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <a
        className="floating-wa"
        href={`https://wa.me/${brand.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp"
      >
        WA
      </a>
    </div>
  );
}
