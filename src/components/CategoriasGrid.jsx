import { Link } from 'react-router-dom'
import productosData from '../data/productos.json'
import { obtenerCategoriasUnicas } from '../utils/productos'
import { formatearCategoria } from '../utils/formateo'
import './CategoriasGrid.css'

// Componente que muestra una grilla de categorías con cantidad de productos
function CategoriasGrid() {
  // Obtener categorías únicas
  const categoriasUnicas = obtenerCategoriasUnicas(productosData)

  // Contar productos por categoría
  const categoriasConInfo = []
  for (let i = 0; i < categoriasUnicas.length; i++) {
    const categoria = categoriasUnicas[i]

    // Contar cuántos productos hay en esta categoría
    let cantidad = 0
    for (let j = 0; j < productosData.length; j++) {
      if (productosData[j].categoria === categoria) {
        cantidad = cantidad + 1
      }
    }

    // Agregar al array de categorías con info
    categoriasConInfo.push({
      nombre: categoria,
      cantidad: cantidad
    })
  }

  return (
    <section className="categorias">
      <div className="categorias__contenedor">
        <h1 className="categorias__titulo">Categorías</h1>
        <p className="categorias__descripcion">
          Explora nuestras categorías y encuentra el producto perfecto
        </p>

        <div className="categorias__grid">
          {categoriasConInfo.map(categoria => (
            <div key={categoria.nombre} className="categoria-card">
              <h5 className="categoria-card__nombre">{formatearCategoria(categoria.nombre)}</h5>
              <p className="categoria-card__cantidad">
                {categoria.cantidad} {categoria.cantidad === 1 ? 'producto' : 'productos'}
              </p>
              <Link
                to={`/productos?categoria=${categoria.nombre}`}
                className="categoria-card__link"
              >
                Ver Productos
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriasGrid
