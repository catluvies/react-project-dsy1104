import { Link } from 'react-router-dom'
import { truncarTexto } from '../utils/helpers'

function BlogLista(props) {
  const noticias = props.noticias

  return (
    <section className="contacto-bg-decorativo py-5">
      <div className="container">
        <div className="row g-4">
          {noticias.map(noticia => (
            <div key={noticia.id} className="col-12 col-md-6 col-lg-4">
              <Link to={`/blog/${noticia.id}`} className="text-decoration-none">
                <div className="glass-card h-100 overflow-hidden">
                  {noticia.imagen ? (
                    <img
                      src={noticia.imagen}
                      alt={noticia.titulo}
                      style={{height: '200px', objectFit: 'cover', width: '100%', borderRadius: '20px 20px 0 0'}}
                      loading="lazy"
                    />
                  ) : (
                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{height: '200px', borderRadius: '20px 20px 0 0'}}>
                      [Imagen]
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="h5 mb-2" style={{ color: '#8B4513' }}>{noticia.titulo}</h3>
                    <p className="text-muted small">{truncarTexto(noticia.excerpt, 100)}</p>
                    <div className="d-flex gap-2 text-muted small">
                      <span>{noticia.autor}</span>
                      <span>•</span>
                      <span>{noticia.fecha}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogLista
