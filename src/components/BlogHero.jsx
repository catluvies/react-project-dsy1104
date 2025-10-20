import './BlogHero.css'

// hero del blog
function BlogHero() {
  return (
    <section className="blog-hero">
      <div className="blog-hero__contenedor">
        <h1 className="blog-hero__titulo">Blog</h1>
        <p className="blog-hero__descripcion">
          Historias, recetas y novedades de Mil Sabores
        </p>
      </div>
    </section>
  )
}

export default BlogHero
