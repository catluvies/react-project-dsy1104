import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import productosData from '../data/productos.json'
import ProductosFiltros from './ProductosFiltros'
import ProductosGrid from './ProductosGrid'
import { obtenerCategoriasUnicas, filtrarPorCategoria, filtrarPorBusqueda } from '../utils/productos'
import './ProductosContenedor.css'

// contenedor de productos
function ProductosContenedor() {
  // obtener parámetros de la url
  const [searchParams] = useSearchParams()
  const categoriaURL = searchParams.get('categoria')

  // estados para filtros
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

  // actualizar filtro cuando cambia la url
  useEffect(() => {
    if (categoriaURL) {
      setCategoriaFiltro(categoriaURL)
    }
  }, [categoriaURL])

  // validar que productos existe
  if (!productosData || !Array.isArray(productosData)) {
    return (
      <section className="productos">
        <div className="productos__contenedor">
          <h1 className="productos__titulo">Error al cargar productos</h1>
          <p className="productos__descripcion">
            No se pudieron cargar los productos. Por favor, intenta nuevamente más tarde.
          </p>
        </div>
      </section>
    )
  }

  // obtener categorías sin repetir
  const categorias = obtenerCategoriasUnicas(productosData)

  // filtrar productos
  let productosFiltrados = productosData
  productosFiltrados = filtrarPorCategoria(productosFiltrados, categoriaFiltro)
  productosFiltrados = filtrarPorBusqueda(productosFiltrados, busqueda)

  return (
    <section className="productos">
      <div className="productos__contenedor">
        <h1 className="productos__titulo">Nuestros Productos</h1>
        <p className="productos__descripcion">
          Descubre nuestra amplia variedad de tortas y postres tradicionales
        </p>

        <ProductosFiltros
          busqueda={busqueda}
          onBusquedaChange={setBusqueda}
          categoriaFiltro={categoriaFiltro}
          onCategoriaChange={setCategoriaFiltro}
          categorias={categorias}
        />

        <p className="productos__contador">
          Mostrando {productosFiltrados.length} productos
        </p>

        <ProductosGrid productos={productosFiltrados} />
      </div>
    </section>
  )
}

export default ProductosContenedor
