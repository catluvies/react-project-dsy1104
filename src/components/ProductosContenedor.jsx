import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductosFiltros from './ProductosFiltros'
import ProductosGrid from './ProductosGrid'
import { productosService } from '../api/productosService'
import { categoriasService } from '../api/categoriasService'

function ProductosContenedor() {
  const [searchParams] = useSearchParams()
  const categoriaURL = searchParams.get('categoria')

  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

  useEffect(() => {
    cargarDatos()
  }, [])

  useEffect(() => {
    if (categoriaURL) {
      setCategoriaFiltro(categoriaURL)
    }
  }, [categoriaURL])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const [productosData, categoriasData] = await Promise.all([
        productosService.obtenerActivos(),
        categoriasService.obtenerActivas()
      ])
      setProductos(productosData)
      setCategorias(categoriasData)
    } catch (err) {
      setError('Error al cargar los productos')
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  if (cargando) {
    return (
      <>
        <section className="bg-primary text-white text-center py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">Nuestros Productos</h1>
            <p className="lead">Descubre nuestra amplia variedad de tortas y postres tradicionales</p>
          </div>
        </section>
        <section className="py-5">
          <div className="container text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 text-muted">Cargando productos...</p>
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
            <h1 className="display-4 fw-bold">Nuestros Productos</h1>
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

  let productosFiltrados = productos

  if (categoriaFiltro !== 'todas') {
    productosFiltrados = productos.filter(p =>
      p.categoriaId?.toString() === categoriaFiltro ||
      p.categoriaNombre?.toLowerCase() === categoriaFiltro.toLowerCase()
    )
  }

  if (busqueda.trim()) {
    const termino = busqueda.toLowerCase()
    productosFiltrados = productosFiltrados.filter(p =>
      p.nombre?.toLowerCase().includes(termino) ||
      p.descripcion?.toLowerCase().includes(termino)
    )
  }

  return (
    <>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Nuestros Productos</h1>
          <p className="lead">Descubre nuestra amplia variedad de tortas y postres tradicionales</p>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <ProductosFiltros
            busqueda={busqueda}
            onBusquedaChange={setBusqueda}
            categoriaFiltro={categoriaFiltro}
            onCategoriaChange={setCategoriaFiltro}
            categorias={categorias}
          />

          <p className="text-muted mb-4">
            Mostrando {productosFiltrados.length} productos
          </p>

          <ProductosGrid productos={productosFiltrados} />
        </div>
      </section>
    </>
  )
}

export default ProductosContenedor
