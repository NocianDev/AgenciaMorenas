import SectionTitle from './SectionTitle';

function getFacebookEmbedUrl(url) {
  if (!url || url.includes('REEMPLAZA_CON_LINK')) return null;

  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false&width=1200&height=675`;
}

export default function MediaShowcase({ data }) {
  if (!data?.items?.length) return null;

  const images = data.items.filter((item) => item.type !== 'facebook');
  const videos = data.items.filter((item) => item.type === 'facebook');

  return (
    <section className="section media-section">
      <div className="container">
        <SectionTitle
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />

        {images.length ? (
          <div className="media-grid images-only-grid">
            {images.map((item, index) => (
              <article
                className={`media-card image-media-card ${item.featured ? 'media-large' : ''}`}
                key={`${item.title}-${index}`}
              >
                <img src={item.src} alt={item.title} />

                <div className="media-caption">
                  <span>{item.tag}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {videos.length ? (
          <div className="video-embed-list">
            {videos.map((item, index) => {
              const embedUrl = getFacebookEmbedUrl(item.facebookUrl);

              return (
                <article className="facebook-video-card" key={`${item.title}-${index}`}>
                  <div className="facebook-video-info">
                    <span>{item.tag || 'Video'}</span>
                    <h3>{item.title}</h3>
                    {item.description ? <p>{item.description}</p> : null}
                  </div>

                  <div className="facebook-video-frame">
                    {embedUrl ? (
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
                            Cambia el valor <code>facebookUrl</code> en{' '}
                            <code>src/data/siteData.js</code>.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}