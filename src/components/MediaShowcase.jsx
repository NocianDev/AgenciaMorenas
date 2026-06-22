import SectionTitle from './SectionTitle';

function getFacebookEmbedUrl(url) {
  if (!url || url.includes('FACEBOOK_LINK_PENDIENTE')) return null;

  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false&width=420&height=746`;
}

export default function MediaShowcase({ data }) {
  if (!data?.items?.length) return null;

  const images = data.items.filter((item) => item.type === 'image');
  const videos = data.items.filter((item) => item.type === 'facebook' || item.type === 'video');

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
                className={`media-card image-media-card ${item.featured ? 'media-large' : ''} ${item.banner ? 'banner-card' : ''}`}
                key={`${item.title}-${index}`}
              >
                <img src={item.src} alt={item.title} loading="lazy" decoding="async" />

                <div className="media-caption">
                  <span>{item.tag}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {videos.length ? (
          <div className="media-video-section">
            <SectionTitle
              eyebrow="Galería multimedia"
              title={data.videoTitle || 'Conoce nuestro servicio en video'}
              description="Conoce parte de la operación, los traslados y la atención de Importaciones Morenas."
              align="center"
            />
            <div className="video-embed-list">
              {videos.map((item, index) => {
                const embedUrl = getFacebookEmbedUrl(item.facebookUrl);
                const isReel = item.facebookUrl?.includes('/reel/');
                const isLocalVideo = item.type === 'video';
                const isLandscape = item.orientation === 'landscape';

                return (
                  <article
                    className={`video-feature-card ${isLandscape ? 'video-feature-card--landscape' : ''}`}
                    key={`${item.title}-${index}`}
                  >
                    <div className="video-feature-copy">
                      <span>{item.tag || 'Video'}</span>
                      <h3>{item.title}</h3>
                      {item.description ? <p>{item.description}</p> : null}
                      {item.facebookUrl ? (
                        <a
                          className="video-feature-link"
                          href={item.facebookUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ver video en Facebook
                        </a>
                      ) : null}
                    </div>

                    <div className="video-feature-stage">
                      <div className={`video-reel-frame ${isReel ? 'is-reel' : ''} ${isLandscape ? 'is-landscape' : ''}`}>
                        {isLocalVideo ? (
                          <video
                            controls
                            playsInline
                            preload="metadata"
                            poster={item.poster}
                            aria-label={item.title}
                          >
                            <source src={item.src} type="video/mp4" />
                            Tu navegador no admite la reproducción de video.
                          </video>
                        ) : embedUrl ? (
                          <iframe
                            src={embedUrl}
                            title={item.title}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : (
                          <div className="video-feature-placeholder">
                            {item.image ? <img src={item.image} alt={item.title} loading="lazy" decoding="async" /> : null}
                            <div className="video-feature-placeholder-content">
                              <span>{item.tag || 'Video'}</span>
                              <strong>Contenido multimedia de Morenas</strong>
                              <p>Seguimiento visual de servicios, unidades y atención operativa.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
