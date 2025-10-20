import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formateo'
import './InicioProductosDestacados.css'

function InicioProductosDestacados(props) {
  const [slide, setSlide] = useState(0)
  const productos = props.productos

  return (
    <section className="inicio-productos">
      <div className="inicio-productos__contenedor">
        <h2 className="inicio-productos__titulo">Nuestros Mejores Productos</h2>

        <div className="inicio-productos__carrusel">
          <button 
            className="inicio-productos__flecha inicio-productos__flecha--prev"
            onClick={() => setSlide(slide === 0 ? productos.length - 1 : slide - 1)}
          >
            ‹
          </button>
          
          <div className="inicio-productos__contenido">
            <div 
              className="inicio-productos__slides"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {productos.map(producto => (
                <div key={producto.id} className="inicio-productos__slide">
                  <Link to={`/producto/${producto.id}`} className="inicio-producto-card">
                    <div className="inicio-producto-card__imagen">
                      {producto.imagen ? (
                        <img src={producto.imagen} alt={producto.nombre} className="inicio-producto-card__img" loading="lazy" />
                      ) : (
                        <span className="inicio-producto-card__placeholder">[Imagen]</span>
                      )}
                    </div>
                    <div className="inicio-producto-card__info">
                      <h3 className="inicio-producto-card__nombre">{producto.nombre}</h3>
                      <p className="inicio-producto-card__descripcion">{producto.descripcion}</p>
                      <p className="inicio-producto-card__precio">${formatearPrecio(producto.precio_clp)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="inicio-productos__flecha inicio-productos__flecha--next"
            onClick={() => setSlide((slide + 1) % productos.length)}
          >
            ›
          </button>
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
