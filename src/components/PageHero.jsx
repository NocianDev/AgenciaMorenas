import { Link } from 'react-router-dom';

export default function PageHero({ eyebrow, title, description, image, imageFit = 'cover', heroVariant = '', primaryCta, secondaryCta, pills = [] }) {
  return (
    <section className={`page-hero ${heroVariant ? `page-hero--${heroVariant}` : ''}`.trim()}>
      <div className="container page-hero-grid">
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          <p className="page-hero-text">{description}</p>
          {pills.length ? (
            <div className="pill-row">
              {pills.map((pill) => (
                <span key={pill} className="pill">
                  {pill}
                </span>
              ))}
            </div>
          ) : null}
          <div className="hero-actions">
            {primaryCta ? (
              primaryCta.href?.startsWith('http') || primaryCta.href?.startsWith('tel:') || primaryCta.href?.startsWith('mailto:') ? (
                <a href={primaryCta.href} className="btn btn-primary" target={primaryCta.target} rel="noreferrer">
                  {primaryCta.label}
                </a>
              ) : (
                <Link to={primaryCta.href} className="btn btn-primary">
                  {primaryCta.label}
                </Link>
              )
            ) : null}
            {secondaryCta ? (
              secondaryCta.href?.startsWith('http') || secondaryCta.href?.startsWith('tel:') || secondaryCta.href?.startsWith('mailto:') ? (
                <a href={secondaryCta.href} className="btn btn-secondary" target={secondaryCta.target} rel="noreferrer">
                  {secondaryCta.label}
                </a>
              ) : (
                <Link to={secondaryCta.href} className="btn btn-secondary">
                  {secondaryCta.label}
                </Link>
              )
            ) : null}
          </div>
        </div>
        <div className={`visual-panel visual-panel--${imageFit}`}>
          <img src={image} alt={title} />
        </div>
      </div>
    </section>
  );
}
