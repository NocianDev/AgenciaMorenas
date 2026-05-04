import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="section not-found-page">
      <div className="container not-found-box">
        <p className="eyebrow">404</p>
        <h1>Página no encontrada</h1>
        <p>La ruta solicitada no existe o fue reemplazada en la nueva estructura del sitio.</p>
        <Link className="btn btn-primary" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
