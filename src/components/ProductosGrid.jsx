import { Link } from 'react-router-dom'
import { formatearPrecio, formatearCategoria } from '../utils/formateo'
import { truncarTexto } from '../utils/helpers'
import './ProductosGrid.css'

// Componente para mostrar una grilla de productos
function ProductosGrid(props) {
  // Recibir el array de productos como prop
  const productos = props.productos

  if (productos.length === 0) {
    return (
      <div className="productos-grid-vacio">
        <p>No se encontraron productos con los filtros aplicados.</p>
      </div>
    )
  }

  return (
    <div className="productos-grid">
      {productos.map(producto => (
        <Link
          key={producto.id}
          to={`/producto/${producto.id}`}
          className="card card--hover producto-card"
        >
          <div className="producto-card__imagen">
            {producto.imagen ? (
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
                className="producto-card__img"
                loading="lazy"
              />
            ) : (
              <span className="producto-card__placeholder">[Imagen]</span>
            )}
          </div>

          <div className="producto-card__contenido">
            <span className="badge badge--primario producto-card__categoria">
              {formatearCategoria(producto.categoria)}
            </span>

            <h3 className="producto-card__nombre">{producto.nombre}</h3>

            <p className="producto-card__descripcion">
              {truncarTexto(producto.descripcion, 80)}
            </p>

            <div className="producto-card__footer">
              <span className="producto-card__precio">
                ${formatearPrecio(producto.precio_clp)}
              </span>
              {producto.stock === 0 && (
                <span className="producto-card__sin-stock">Sin stock</span>
              )}
              {producto.stock > 0 && producto.stock <= 5 && (
                <span className="producto-card__poco-stock">¡Pocas unidades!</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductosGrid
