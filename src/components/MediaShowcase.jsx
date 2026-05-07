import SectionTitle from './SectionTitle';

function getFacebookEmbedUrl(url) {
  if (!url || url.includes('REEMPLAZA_CON_LINK')) return null;
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=1200&height=675`;
}

export default function MediaShowcase({ data }) {
  if (!data?.items?.length) return null;

  return (
    <section className="section media-section">
      <div className="container">
        <SectionTitle
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />

        <div className="media-grid">
          {data.items.map((item, index) => {
            const embedUrl = item.type === 'facebook' ? getFacebookEmbedUrl(item.facebookUrl) : null;

            return (
              <article
                className={`media-card ${item.featured ? 'media-large' : ''} ${item.type === 'facebook' ? 'facebook-media-card' : ''}`}
                key={`${item.title}-${index}`}
              >
                {item.type === 'facebook' ? (
                  embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={item.title}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="facebook-placeholder">
                      <img src={item.image} alt={item.title} />
                      <div className="facebook-placeholder-content">
                        <span>Facebook Embed</span>
                        <strong>Pega aquí el link del video</strong>
                        <p>
                          Cambia el valor <code>facebookUrl</code> en <code>src/data/siteData.js</code>.
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  <img src={item.src} alt={item.title} />
                )}

                <div className="media-caption">
                  <span>{item.tag}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
