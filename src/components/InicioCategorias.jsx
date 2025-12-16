import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoriasService } from '../api/categoriasService'
import { productosService } from '../api/productosService'

function InicioCategorias() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      const [categoriasData, productosData] = await Promise.all([
        categoriasService.obtenerActivas(),
        productosService.obtenerActivos()
      ])
      setCategorias(categoriasData)
      setProductos(productosData)
    } catch (error) {
      console.error('Error cargando categorías:', error)
    } finally {
      setCargando(false)
    }
  }

  const contarProductos = (categoriaId) => {
    return productos.filter(p => p.categoriaId === categoriaId).length
  }

  const obtenerImagenCategoria = (categoria) => {
    if (categoria.imagenUrl) {
      if (categoria.imagenUrl.startsWith('http')) return categoria.imagenUrl
      return `https://api.anyararosso.com${categoria.imagenUrl}`
    }
    // Imágenes por defecto según nombre de categoría
    const imagenesDefault = {
      'tortas': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
      'pasteles': 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80',
      'cupcakes': 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&q=80',
      'galletas': 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80',
      'postres': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80',
      'dulces': 'https://images.unsplash.com/photo-1582176604856-e824b4736522?w=400&q=80'
    }
    const nombreLower = categoria.nombre.toLowerCase()
    for (const [key, url] of Object.entries(imagenesDefault)) {
      if (nombreLower.includes(key)) return url
    }
    return 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80'
  }

  if (cargando) {
    return (
      <section className="py-5 bg-light">
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </section>
    )
  }

  if (categorias.length === 0) return null

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-cafe">Nuestras Categorías</h2>
          <p className="lead text-muted">Explora nuestra variedad de productos artesanales</p>
        </div>

        <div className="row g-4">
          {categorias.slice(0, 6).map(categoria => {
            const cantidadProductos = contarProductos(categoria.id)
            const imagenUrl = obtenerImagenCategoria(categoria)

            return (
              <div key={categoria.id} className="col-md-6 col-lg-4">
                <Link
                  to={`/productos?categoria=${categoria.id}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card h-100 border-0 shadow-sm overflow-hidden"
                    style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)'
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)'
                    }}
                  >
                    <div
                      className="card-img-top"
                      style={{
                        height: '200px',
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url("${imagenUrl}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title text-cafe mb-2">{categoria.nombre}</h5>
                      {categoria.descripcion && (
                        <p className="card-text text-muted small mb-2">
                          {categoria.descripcion.substring(0, 60)}
                          {categoria.descripcion.length > 60 ? '...' : ''}
                        </p>
                      )}
                      <span className="badge" style={{ backgroundColor: '#FFB6C1', color: '#654321' }}>
                        {cantidadProductos} {cantidadProductos === 1 ? 'producto' : 'productos'}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {categorias.length > 6 && (
          <div className="text-center mt-4">
            <Link to="/categorias" className="btn btn-outline-primary btn-lg">
              Ver todas las categorías
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default InicioCategorias
