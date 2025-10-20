import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { formatearPrecio, formatearCategoria } from '../utils/formateo'
import { CarritoContext } from '../context/CarritoContext'
import './CarritoContenido.css'

// Componente que muestra el contenido del carrito de compras
function CarritoContenido() {
  // Usar el contexto del carrito
  const { carrito, subtotal } = useContext(CarritoContext)
  const navigate = useNavigate()

  if (carrito.length === 0) {
    return (
      <section className="carrito-vacio">
        <div className="carrito-vacio__contenedor">
          <h2 className="carrito-vacio__titulo">Tu carrito está vacío</h2>
          <p className="carrito-vacio__descripcion">Agrega productos para comenzar tu compra</p>
          <Link to="/productos" className="boton boton--primario">
            Ver Productos
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="carrito">
      <div className="carrito__contenedor">
        <h1 className="carrito__titulo">Carrito de Compras</h1>

        <div className="carrito__grid">
          {/* Lista de productos */}
          <div className="carrito__lista">
            <div className="card carrito__card">
              {carrito.map(item => (
                <div key={item.id} className="carrito-item">
                  <div className="carrito-item__imagen">
                    <span>[Imagen]</span>
                  </div>

                  <div className="carrito-item__info">
                    <h6 className="carrito-item__nombre">{item.nombre}</h6>
                    <p className="carrito-item__categoria">
                      {formatearCategoria(item.categoria)}
                    </p>
                  </div>

                  <div className="carrito-item__precio">
                    <p><strong>${formatearPrecio(item.precio_clp)}</strong></p>
                    <small>c/u</small>
                  </div>

                  <div className="carrito-item__cantidad">
                    <span className="carrito-item__cantidad-texto">
                      Cantidad: {item.cantidad}
                    </span>
                  </div>

                  <div className="carrito-item__total">
                    <p><strong>${formatearPrecio(item.precio_clp * item.cantidad)}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="carrito__resumen">
            <div className="card carrito__resumen-card">
              <h5 className="carrito__resumen-titulo">Resumen del Pedido</h5>

              <div className="carrito__resumen-item">
                <span>Subtotal:</span>
                <span>${formatearPrecio(subtotal)}</span>
              </div>
              <div className="carrito__resumen-item">
                <span>Envío:</span>
                <span className="carrito__resumen-nota">A calcular</span>
              </div>

              <div className="carrito__resumen-divider"></div>

              <div className="carrito__resumen-total">
                <strong>Total:</strong>
                <strong>${formatearPrecio(subtotal)}</strong>
              </div>

              <p className="carrito__resumen-texto">
                * El costo de envío se calculará según tu comuna en el checkout
              </p>

              <button
                className="boton boton--primario boton--block"
                onClick={() => navigate('/checkout')}
              >
                Proceder al Pago
              </button>

              <Link to="/productos" className="boton boton--secundario boton--block">
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarritoContenido
