import { useParams, Link } from 'react-router-dom'
import { noticiasData } from '../data/noticias'

function DetalleBlogContenido() {
  const { id } = useParams()
  const noticia = noticiasData.find(n => n.id === id)

  if (!noticia) {
    return (
      <section className="py-5 blog-detail-section">
        <div className="container">
          <div className="glass-card p-5 text-center">
            <div className="glass-title-bar">
              <span className="title-text">Error</span>
              <div className="window-buttons">
                <span className="window-btn window-btn-minimize"></span>
                <span className="window-btn window-btn-maximize"></span>
                <span className="window-btn window-btn-close"></span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="mb-3">Artículo no encontrado</h2>
              <p className="text-muted mb-4">El artículo que buscas no existe o fue eliminado.</p>
              <Link to="/blog" className="btn-aero btn-aero-cafe">
                Volver al Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-5 blog-detail-section">
      <div className="container">
        {/* Botón volver */}
        <Link
          to="/blog"
          className="btn-aero btn-aero-outline mb-4 d-inline-flex align-items-center gap-2"
          style={{ textDecoration: 'none' }}
        >
          <span>←</span>
          <span>Volver al Blog</span>
        </Link>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {/* Card principal del artículo */}
            <article className="glass-card blog-article-card">
              {/* Barra de título estilo ventana */}
              <div className="glass-title-bar">
                <span className="title-text">Blog - Artículo</span>
                <div className="window-buttons">
                  <span className="window-btn window-btn-minimize"></span>
                  <span className="window-btn window-btn-maximize"></span>
                  <span className="window-btn window-btn-close"></span>
                </div>
              </div>

              {/* Imagen destacada */}
              {noticia.imagen && (
                <div className="blog-featured-image">
                  <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="w-100"
                    style={{
                      maxHeight: '450px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div className="blog-image-overlay"></div>
                </div>
              )}

              {/* Contenido del artículo */}
              <div className="p-4 p-md-5">
                {/* Categoría */}
                {noticia.categoria && (
                  <span className="blog-category-badge mb-3">
                    {noticia.categoria}
                  </span>
                )}

                {/* Título */}
                <h1 className="blog-article-title mb-3">
                  {noticia.titulo}
                </h1>

                {/* Metadata */}
                <div className="blog-meta-bar mb-4">
                  <div className="blog-meta-item">
                    <span className="blog-meta-icon">✍️</span>
                    <span>Por <strong>{noticia.autor}</strong></span>
                  </div>
                  <div className="blog-meta-divider">•</div>
                  <div className="blog-meta-item">
                    <span className="blog-meta-icon">📅</span>
                    <span>{noticia.fecha}</span>
                  </div>
                  <div className="blog-meta-divider">•</div>
                  <div className="blog-meta-item">
                    <span className="blog-meta-icon">⏱️</span>
                    <span>{noticia.tiempo_lectura} de lectura</span>
                  </div>
                </div>

                {/* Separador decorativo */}
                <div className="blog-separator mb-4">
                  <span className="blog-separator-icon">🍰</span>
                </div>

                {/* Contenido del artículo */}
                <div
                  className="blog-article-content"
                  dangerouslySetInnerHTML={{ __html: noticia.contenido }}
                />

                {/* Footer del artículo */}
                <div className="blog-article-footer mt-5 pt-4">
                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                    <div className="blog-share-section">
                      <span className="text-muted small">Compartir:</span>
                      <div className="blog-share-buttons">
                        <button className="blog-share-btn" title="Compartir en Facebook">
                          📘
                        </button>
                        <button className="blog-share-btn" title="Compartir en WhatsApp">
                          💬
                        </button>
                        <button className="blog-share-btn" title="Copiar enlace">
                          🔗
                        </button>
                      </div>
                    </div>
                    <Link to="/blog" className="btn-aero btn-aero-cafe">
                      Ver más artículos
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetalleBlogContenido
