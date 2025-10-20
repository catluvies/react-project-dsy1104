import { useParams, Link } from 'react-router-dom'
import { noticiasData } from '../data/noticias'
import './DetalleBlogContenido.css'

// Componente que muestra el detalle de un artículo del blog
function DetalleBlogContenido() {
  // Obtener el ID del artículo desde la URL
  const { id } = useParams()

  // Buscar la noticia por ID
  const noticia = noticiasData.find(n => n.id === id)

  if (!noticia) {
    return (
      <section className="detalle-blog-error">
        <div className="detalle-blog-error__contenedor">
          <div className="alerta alerta--error">Artículo no encontrado</div>
          <Link to="/blog" className="boton boton--primario">Volver al Blog</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="detalle-blog">
      <div className="detalle-blog__contenedor">
        <Link to="/blog" className="detalle-blog__volver">
          ← Volver al Blog
        </Link>

        <article className="detalle-blog__articulo">
          <h1 className="detalle-blog__titulo">{noticia.titulo}</h1>

          <div className="detalle-blog__meta">
            <span>Por {noticia.autor}</span>
            <span>•</span>
            <span>{noticia.fecha}</span>
            <span>•</span>
            <span>{noticia.tiempo_lectura} de lectura</span>
          </div>

          <div className="detalle-blog__imagen">
            {noticia.imagen ? (
              <img 
                src={noticia.imagen} 
                alt={noticia.titulo}
                className="detalle-blog__img"
              />
            ) : (
              <span>[Imagen del artículo]</span>
            )}
          </div>

          <div
            className="detalle-blog__contenido"
            dangerouslySetInnerHTML={{ __html: noticia.contenido }}
          />
        </article>
      </div>
    </section>
  )
}

export default DetalleBlogContenido
