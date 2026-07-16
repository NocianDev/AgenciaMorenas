import { Link } from 'react-router-dom';

function CtaButton({ cta, variant }) {
  if (!cta) {
    return null;
  }

  const className = `btn ${variant}`;
  const href = cta.href || '#';

  const isExternal =
    href.startsWith('http') ||
    href.startsWith('tel:') ||
    href.startsWith('mailto:');

  const isAnchor = href.startsWith('#');

  if (isExternal || isAnchor) {
    return (
      <a
        href={href}
        className={className}
        target={cta.target}
        rel={cta.target === '_blank' ? 'noreferrer' : undefined}
        onClick={cta.onClick}
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={className}
      onClick={cta.onClick}
    >
      {cta.label}
    </Link>
  );
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageFit = 'cover',
  heroVariant = '',
  primaryCta,
  secondaryCta,
  pills = [],
}) {
  return (
    <section
      className={`page-hero ${
        heroVariant
          ? `page-hero--${heroVariant}`
          : ''
      }`.trim()}
    >
      <div className="container page-hero-grid">
        <div>
          {eyebrow ? (
            <p className="eyebrow">
              {eyebrow}
            </p>
          ) : null}

          <h1>{title}</h1>

          <p className="page-hero-text">
            {description}
          </p>

          {pills.length ? (
            <div className="pill-row">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="pill"
                >
                  {pill}
                </span>
              ))}
            </div>
          ) : null}

          <div className="hero-actions">
            <CtaButton
              cta={primaryCta}
              variant="btn-primary"
            />

            <CtaButton
              cta={secondaryCta}
              variant="btn-secondary"
            />
          </div>
        </div>

        <div
          className={`visual-panel visual-panel--${imageFit}`}
        >
          <img
            src={image}
            alt={title}
          />
        </div>
      </div>
    </section>
  );
}