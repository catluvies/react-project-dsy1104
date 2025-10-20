import { Link } from 'react-router-dom'
import { truncarTexto } from '../utils/helpers'
import './BlogLista.css'

// Componente para mostrar la lista de noticias/blog
function BlogLista(props) {
  // Recibir el array de noticias como prop
  const noticias = props.noticias

  return (
    <section className="blog-lista">
      <div className="blog-lista__contenedor">
        <div className="blog-lista__grid">
          {noticias.map(noticia => (
            <Link key={noticia.id} to={`/blog/${noticia.id}`} className="blog-card">
              <div className="blog-card__imagen">
                {noticia.imagen ? (
                  <img 
                    src={noticia.imagen} 
                    alt={noticia.titulo}
                    className="blog-card__img"
                    loading="lazy"
                  />
                ) : (
                  <span className="blog-card__placeholder">[Imagen]</span>
                )}
              </div>
              <div className="blog-card__contenido">
                <h3 className="blog-card__titulo">{noticia.titulo}</h3>
                <p className="blog-card__extracto">{truncarTexto(noticia.excerpt, 100)}</p>
                <div className="blog-card__meta">
                  <span>{noticia.autor}</span>
                  <span>•</span>
                  <span>{noticia.fecha}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogLista
