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
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {categorias.map(categoria => {
              const cantidadProductos = contarProductos(categoria.id)

              return (
                <div key={categoria.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 text-center border-2">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-cafe mb-3">{categoria.nombre}</h5>
                      {categoria.descripcion && (
                        <p className="card-text text-muted small flex-grow-1">
                          {categoria.descripcion}
                        </p>
                      )}
                      <div className="mt-auto">
                        <span className="badge mb-3" style={{backgroundColor: '#FFB6C1', color: '#654321'}}>
                          {cantidadProductos} {cantidadProductos === 1 ? 'producto' : 'productos'}
                        </span>
                        <div>
                          <Link
                            to={`/productos?categoria=${categoria.id}`}
                            className="btn btn-primary"
                          >
                            Ver Productos
                          </Link>
                        </div>
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
