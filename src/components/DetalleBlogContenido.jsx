import { useParams, Link } from 'react-router-dom'
import { noticiasData } from '../data/noticias'

function DetalleBlogContenido() {
  const { id } = useParams()
  const noticia = noticiasData.find(n => n.id === id)

  if (!noticia) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="alert alert-danger">Artículo no encontrado</div>
          <Link to="/blog" className="btn btn-primary">Volver al Blog</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-5">
      <div className="container">
        <Link to="/blog" className="btn btn-link text-decoration-none mb-4">
          ← Volver al Blog
        </Link>

        <article className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <h1 className="display-5 fw-bold mb-3">{noticia.titulo}</h1>

            <div className="d-flex gap-2 text-muted mb-4">
              <span>Por {noticia.autor}</span>
              <span>•</span>
              <span>{noticia.fecha}</span>
              <span>•</span>
              <span>{noticia.tiempo_lectura} de lectura</span>
            </div>

            {noticia.categoria && (
              <span className="badge bg-primary mb-4">{noticia.categoria}</span>
            )}

            {noticia.imagen ? (
              <img
                src={noticia.imagen}
                alt={noticia.titulo}
                className="img-fluid mb-4"
                style={{width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover'}}
              />
            ) : (
              <div className="bg-secondary text-white text-center py-5 mb-4">
                [Imagen del artículo]
              </div>
            )}

            <div
              className="fs-5 lh-lg"
              dangerouslySetInnerHTML={{ __html: noticia.contenido }}
            />
          </div>
        </article>
      </div>
    </section>
  )
}

export default DetalleBlogContenido
