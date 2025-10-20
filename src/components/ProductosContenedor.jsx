import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import productosData from '../data/productos.json'
import ProductosFiltros from './ProductosFiltros'
import ProductosGrid from './ProductosGrid'
import { obtenerCategoriasUnicas, filtrarPorCategoria, filtrarPorBusqueda } from '../utils/productos'
import './ProductosContenedor.css'

// Componente contenedor de la página de productos
function ProductosContenedor() {
  // Obtener parámetros de la URL (por ejemplo: ?categoria=tortas-tradicionales)
  const [searchParams] = useSearchParams()
  const categoriaURL = searchParams.get('categoria')

  // Estados para los filtros
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

  // useEffect se ejecuta cuando categoriaURL cambia
  // Sirve para actualizar el filtro cuando se navega desde otra página
  useEffect(() => {
    if (categoriaURL) {
      setCategoriaFiltro(categoriaURL)
    }
  }, [categoriaURL])

  // Validar que los datos de productos existen y son un array
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

  // Obtener todas las categorías únicas
  const categorias = obtenerCategoriasUnicas(productosData)

  // Filtrar productos según búsqueda y categoría
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
