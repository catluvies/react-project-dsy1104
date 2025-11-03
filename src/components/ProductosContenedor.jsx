import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import productosData from '../data/productos.json'
import ProductosFiltros from './ProductosFiltros'
import ProductosGrid from './ProductosGrid'
import { obtenerCategoriasUnicas, filtrarPorCategoria, filtrarPorBusqueda } from '../utils/productos'

function ProductosContenedor() {
  const [searchParams] = useSearchParams()
  const categoriaURL = searchParams.get('categoria')

  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

  useEffect(() => {
    if (categoriaURL) {
      setCategoriaFiltro(categoriaURL)
    }
  }, [categoriaURL])

  if (!productosData || !Array.isArray(productosData)) {
    return (
      <section className="py-5">
        <div className="container">
          <h1 className="text-center mb-3">Error al cargar productos</h1>
          <p className="text-center text-muted">
            No se pudieron cargar los productos. Por favor, intenta nuevamente más tarde.
          </p>
        </div>
      </section>
    )
  }

  const categorias = obtenerCategoriasUnicas(productosData)

  let productosFiltrados = productosData
  productosFiltrados = filtrarPorCategoria(productosFiltrados, categoriaFiltro)
  productosFiltrados = filtrarPorBusqueda(productosFiltrados, busqueda)

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
