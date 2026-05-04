export default function SectionTitle({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-title ${align === 'center' ? 'centered' : ''}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
