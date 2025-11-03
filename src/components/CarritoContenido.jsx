import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { formatearPrecio, formatearCategoria } from '../utils/formateo'
import { CarritoContext } from '../context/CarritoContext'

function CarritoContenido() {
  const { carrito, subtotal } = useContext(CarritoContext)
  const navigate = useNavigate()

  if (carrito.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Tu carrito está vacío</h2>
          <p className="text-muted">Agrega productos para comenzar tu compra</p>
          <Link to="/productos" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Carrito de Compras</h1>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <table className="table table-striped mb-0">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {item.imagen ? (
                            <img src={item.imagen} alt={item.nombre} style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px'}} />
                          ) : (
                            <div className="bg-light d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px', borderRadius: '8px'}}>
                              <span className="text-muted small">Sin imagen</span>
                            </div>
                          )}
                          <div>
                            <h6 className="mb-0">{item.nombre}</h6>
                            <small className="text-muted">
                              {formatearCategoria(item.categoria)}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>${formatearPrecio(item.precio_clp)}</strong>
                        <br />
                        <small>c/u</small>
                      </td>
                      <td>
                        <span>Cantidad: {item.cantidad}</span>
                      </td>
                      <td>
                        <strong>${formatearPrecio(item.precio_clp * item.cantidad)}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumen del Pedido</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${formatearPrecio(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Envío:</span>
                <span className="text-muted">A calcular</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>${formatearPrecio(subtotal)}</strong>
              </div>

              <p className="text-muted small">
                * El costo de envío se calculará según tu comuna en el checkout
              </p>

              <button
                className="btn btn-primary w-100 mb-2"
                onClick={() => navigate('/checkout')}
              >
                Proceder al Pago
              </button>

              <Link to="/productos" className="btn btn-outline-secondary w-100">
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarritoContenido
