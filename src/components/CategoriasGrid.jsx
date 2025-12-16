import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoriasService } from '../api/categoriasService'
import { productosService } from '../api/productosService'

function CategoriasGrid() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const [categoriasData, productosData] = await Promise.all([
        categoriasService.obtenerActivas(),
        productosService.obtenerActivos()
      ])
      setCategorias(categoriasData)
      setProductos(productosData)
    } catch (err) {
      setError('Error al cargar las categorías')
      console.error(err)
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
      <>
        <section className="bg-primary text-white text-center py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">Categorías</h1>
            <p className="lead">Explora nuestras categorías y encuentra el producto perfecto</p>
          </div>
        </section>
        <section className="py-5">
          <div className="container text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 text-muted">Cargando categorías...</p>
          </div>
        </section>
      </>
    )
  }

  if (error) {
    return (
      <>
        <section className="bg-primary text-white text-center py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">Categorías</h1>
          </div>
        </section>
        <section className="py-5">
          <div className="container">
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
            <div className="text-center">
              <button onClick={cargarDatos} className="btn btn-primary">
                Reintentar
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Categorías</h1>
          <p className="lead">Explora nuestras categorías y encuentra el producto perfecto</p>
        </div>
      </section>
      <section className="contacto-bg-decorativo py-5">
        <div className="container">
          <div className="row g-4">
            {categorias.map(categoria => {
              const cantidadProductos = contarProductos(categoria.id)
              const imagenUrl = obtenerImagenCategoria(categoria)

              return (
                <div key={categoria.id} className="col-md-6 col-lg-4">
                  <div className="glass-card-categoria h-100">
                    <div className="card-img-container">
                      <div
                        style={{
                          height: '180px',
                          backgroundImage: `url("${imagenUrl}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    </div>
                    <div className="p-4 d-flex flex-column text-center" style={{ minHeight: '200px' }}>
                      <h5 className="mb-2" style={{ color: '#8B4513' }}>{categoria.nombre}</h5>
                      <p className="text-muted small mb-3" style={{ minHeight: '40px' }}>
                        {categoria.descripcion || 'Descubre nuestra selección'}
                      </p>
                      <div className="mt-auto d-flex flex-column align-items-center gap-2">
                        <span className="badge-glass-cantidad">
                          {cantidadProductos} {cantidadProductos === 1 ? 'producto' : 'productos'}
                        </span>
                        <Link
                          to={`/productos?categoria=${categoria.id}`}
                          className="glass-btn-card"
                        >
                          Ver Productos
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {categorias.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">No hay categorías disponibles</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default CategoriasGrid
