import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { formatearPrecio } from '../utils/formateo'
import { CarritoContext } from '../context/CarritoContext'
import { productosService } from '../api/productosService'

function CarritoContenido() {
  const { carrito, subtotal, actualizarCantidad, eliminarDelCarrito } = useContext(CarritoContext)
  const navigate = useNavigate()

  if (carrito.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Tu carrito está vacío</h2>
          <p className="text-muted">Agrega productos para comenzar tu compra</p>
          <Link to="/productos" className="btn-aero btn-aero-cafe">
            Ver Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4" style={{ color: '#5a4035', fontWeight: '600' }}>
        Carrito de Compras
      </h1>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="glass-card">
            <div className="glass-title-bar">
              <span className="title-text">Productos en tu carrito</span>
              <div className="window-buttons">
                <span className="window-btn window-btn-minimize"></span>
                <span className="window-btn window-btn-maximize"></span>
                <span className="window-btn window-btn-close"></span>
              </div>
            </div>
            <div className="p-0">
              <table className="table table-glass mb-0">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map(item => {
                    const imagenUrl = productosService.obtenerUrlImagen(item.imagenUrl)
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            {imagenUrl ? (
                              <img src={imagenUrl} alt={item.nombre} style={{width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px'}} />
                            ) : (
                              <div className="d-flex align-items-center justify-content-center" style={{width: '70px', height: '70px', borderRadius: '10px', backgroundColor: '#fef3c7'}}>
                                <span style={{fontSize: '1.5rem'}}>🍰</span>
                              </div>
                            )}
                            <div>
                              <h6 className="mb-1" style={{color: '#5a4035', fontWeight: '600', fontSize: '0.95rem'}}>{item.nombre}</h6>
                              {item.varianteNombre && (
                                <span className="badge bg-warning text-dark me-1" style={{fontSize: '0.7rem'}}>
                                  {item.varianteNombre}
                                </span>
                              )}
                              {item.categoriaNombre && (
                                <small className="text-muted d-block" style={{fontSize: '0.8rem'}}>
                                  {item.categoriaNombre}
                                </small>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{color: '#8B7355', fontWeight: '500'}}>${formatearPrecio(item.precio)}</span>
                          <br />
                          <small className="text-muted">c/u</small>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn-qty"
                              onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                              disabled={item.cantidad <= 1}
                            >
                              -
                            </button>
                            <span style={{minWidth: '24px', textAlign: 'center', fontWeight: '600', color: '#5a4035'}}>{item.cantidad}</span>
                            <button
                              className="btn-qty"
                              onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <strong style={{color: '#D97706'}}>${formatearPrecio(item.precio * item.cantidad)}</strong>
                        </td>
                        <td>
                          <button
                            className="btn-aero btn-aero-rojo btn-aero-sm"
                            onClick={() => eliminarDelCarrito(item.id)}
                            style={{padding: '6px 14px', fontSize: '0.8rem'}}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="glass-card">
            <div className="glass-title-bar">
              <span className="title-text">Resumen del Pedido</span>
              <div className="window-buttons">
                <span className="window-btn window-btn-minimize"></span>
                <span className="window-btn window-btn-maximize"></span>
                <span className="window-btn window-btn-close"></span>
              </div>
            </div>
            <div className="p-4">

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
                className="btn-aero btn-aero-cafe btn-aero-block mb-2"
                onClick={() => navigate('/checkout')}
              >
                Proceder al Pago
              </button>

              <Link to="/productos" className="btn-aero btn-aero-outline btn-aero-block">
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
