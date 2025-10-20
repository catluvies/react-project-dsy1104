import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formateo'
import './InicioProductosDestacados.css'

// Componente para mostrar los productos destacados en la página de inicio
function InicioProductosDestacados(props) {
  // Recibir el array de productos como prop
  const productos = props.productos

  return (
    <section className="inicio-productos">
      <div className="inicio-productos__contenedor">
        <h2 className="inicio-productos__titulo">Nuestros Clásicos</h2>

        <div className="inicio-productos__grid">
          {productos.map(producto => (
            <Link
              key={producto.id}
              to={`/producto/${producto.id}`}
              className="inicio-producto-card"
            >
              <div className="inicio-producto-card__imagen">
                <span className="inicio-producto-card__placeholder">[Imagen]</span>
              </div>
              <div className="inicio-producto-card__info">
                <h3 className="inicio-producto-card__nombre">{producto.nombre}</h3>
                <p className="inicio-producto-card__descripcion">{producto.descripcion}</p>
                <p className="inicio-producto-card__precio">${formatearPrecio(producto.precio_clp)}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="inicio-productos__cta">
          <Link to="/productos" className="inicio-productos__boton">
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  )
}

export default InicioProductosDestacados
