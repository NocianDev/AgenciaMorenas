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
        href={`https://wa.me/${brand.whatsappUS}?text=${encodeURIComponent('Hola, quiero información sobre sus servicios.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M16.02 3.2c-7.03 0-12.75 5.66-12.75 12.62 0 2.22.6 4.39 1.72 6.29L3.2 28.8l6.88-1.75a12.86 12.86 0 0 0 5.94 1.49c7.03 0 12.75-5.66 12.75-12.62S23.05 3.2 16.02 3.2Zm0 23.19c-1.91 0-3.78-.51-5.42-1.49l-.39-.23-4.08 1.04 1.09-3.95-.26-.41a10.42 10.42 0 0 1-1.55-5.53c0-5.78 4.76-10.47 10.61-10.47s10.61 4.69 10.61 10.47-4.76 10.57-10.61 10.57Zm5.82-7.84c-.32-.16-1.88-.92-2.17-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.58-1.86-1.76-2.17-.18-.31-.02-.48.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.7-.97-2.33-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61s1.13 3.03 1.29 3.24c.16.21 2.23 3.37 5.39 4.72.75.32 1.34.52 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.88-.76 2.15-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37Z"
          />
        </svg>
      </a>
    </div>
  );
}
