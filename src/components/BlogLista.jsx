import { Link } from 'react-router-dom'
import { truncarTexto } from '../utils/helpers'

function BlogLista(props) {
  const noticias = props.noticias

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4">
          {noticias.map(noticia => (
            <div key={noticia.id} className="col-12 col-md-6 col-lg-4">
              <Link to={`/blog/${noticia.id}`} className="text-decoration-none">
                <div className="card h-100 shadow-sm">
                  {noticia.imagen ? (
                    <img
                      src={noticia.imagen}
                      alt={noticia.titulo}
                      className="card-img-top"
                      style={{height: '200px', objectFit: 'cover'}}
                      loading="lazy"
                    />
                  ) : (
                    <div className="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center" style={{height: '200px'}}>
                      [Imagen]
                    </div>
                  )}
                  <div className="card-body">
                    <h3 className="card-title h5">{noticia.titulo}</h3>
                    <p className="card-text text-muted">{truncarTexto(noticia.excerpt, 100)}</p>
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
