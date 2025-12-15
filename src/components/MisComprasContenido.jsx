import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { boletasService, getEstadoColor } from '../api/boletasService'
import { formatearPrecio } from '../utils/formateo'

function MisComprasContenido() {
  const { usuario, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  const [boletas, setBoletas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }
    cargarBoletas()
  }, [usuario])

  const cargarBoletas = async () => {
    if (!usuario?.id) return

    try {
      setCargando(true)
      const data = await boletasService.obtenerPorUsuario(usuario.id)
      setBoletas(data.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)))
    } catch (err) {
      console.error('Error al cargar boletas:', err)
      setError('Error al cargar el historial de compras')
    } finally {
      setCargando(false)
    }
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated()) {
    return null
  }

  if (cargando) {
    return (
      <>
        <section className="bg-primary text-white text-center py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">Mis Compras</h1>
            <p className="lead">Historial de pedidos</p>
          </div>
        </section>
        <section className="py-5">
          <div className="container text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 text-muted">Cargando historial...</p>
          </div>
        </section>
      </>
    )
  }

  if (error) {
    return (
      <>
        <section className="bg-primary text-white text-center py-5">
          <div className="container">
            <h1 className="display-4 fw-bold">Mis Compras</h1>
          </div>
        </section>
        <section className="py-5">
          <div className="container">
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
            <div className="text-center">
              <button onClick={cargarBoletas} className="btn btn-primary">
                Reintentar
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Mis Compras</h1>
          <p className="lead">Historial de pedidos</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {boletas.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted mb-3">No tienes compras registradas</h4>
              <p className="text-muted">Cuando realices tu primera compra, aparecerá aquí.</p>
              <Link to="/productos" className="btn btn-primary">
                Ver Productos
              </Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Pedidos ({boletas.length})</h5>
                  </div>
                  <div className="list-group list-group-flush">
                    {boletas.map(boleta => (
                      <button
                        key={boleta.id}
                        onClick={() => setBoletaSeleccionada(boleta)}
                        className={`list-group-item list-group-item-action ${boletaSeleccionada?.id === boleta.id ? 'active' : ''}`}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <strong>Pedido #{boleta.id}</strong>
                            <br />
                            <small className={boletaSeleccionada?.id === boleta.id ? '' : 'text-muted'}>
                              {formatearFecha(boleta.fechaCreacion)}
                            </small>
                          </div>
                          <div className="text-end">
                            <span className={`badge bg-${getEstadoColor(boleta.estado)}`}>
                              {boleta.estado}
                            </span>
                            <br />
                            <strong>${formatearPrecio(boleta.total)}</strong>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                {boletaSeleccionada ? (
                  <div className="card position-sticky" style={{ top: '20px' }}>
                    <div className="card-header">
                      <h5 className="mb-0">Detalle Pedido #{boletaSeleccionada.id}</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <span className={`badge bg-${getEstadoColor(boletaSeleccionada.estado)} mb-2`}>
                          {boletaSeleccionada.estado}
                        </span>
                        <p className="small text-muted mb-1">
                          <strong>Fecha:</strong> {formatearFecha(boletaSeleccionada.fechaCreacion)}
                        </p>
                        <p className="small text-muted mb-1">
                          <strong>Método de pago:</strong> {boletaSeleccionada.metodoPago}
                        </p>
                      </div>

                      <hr />

                      <h6>Productos</h6>
                      {boletaSeleccionada.detalles?.map((detalle, index) => (
                        <div key={index} className="d-flex justify-content-between small mb-2">
                          <span>
                            {detalle.productoNombre || `Producto #${detalle.productoId}`} x{detalle.cantidad}
                          </span>
                          <span>${formatearPrecio(detalle.subtotal)}</span>
                        </div>
                      ))}

                      <hr />

                      <div className="d-flex justify-content-between mb-1">
                        <span>Subtotal:</span>
                        <span>${formatearPrecio(boletaSeleccionada.subtotal)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Envío:</span>
                        <span>${formatearPrecio(boletaSeleccionada.costoEnvio)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <strong>Total:</strong>
                        <strong className="text-primary">${formatearPrecio(boletaSeleccionada.total)}</strong>
                      </div>

                      <hr />

                      <h6>Entrega</h6>
                      <p className="small mb-1">
                        <strong>Tipo:</strong>{' '}
                        <span className={`badge ${boletaSeleccionada.tipoEntrega === 'RETIRO' ? 'bg-info' : 'bg-primary'}`}>
                          {boletaSeleccionada.tipoEntrega === 'RETIRO' ? 'Retiro en tienda' : 'Delivery'}
                        </span>
                      </p>
                      {boletaSeleccionada.fechaEntrega && (
                        <p className="small mb-1">
                          <strong>Fecha entrega:</strong> {new Date(boletaSeleccionada.fechaEntrega).toLocaleDateString('es-CL')}
                        </p>
                      )}
                      {boletaSeleccionada.horarioEntrega && (
                        <p className="small mb-1">
                          <strong>Horario:</strong> {boletaSeleccionada.horarioEntrega.replace('H_', '').replace('_', ':00 - ') + ':00'}
                        </p>
                      )}
                      <p className="small mb-1">
                        <strong>Dirección:</strong> {boletaSeleccionada.direccionEntrega}
                      </p>
                      <p className="small mb-1">
                        <strong>Comuna:</strong> {boletaSeleccionada.comunaEntrega}
                      </p>
                      {boletaSeleccionada.notas && (
                        <p className="small mb-0">
                          <strong>Notas:</strong> {boletaSeleccionada.notas}
                        </p>
                      )}

                      {boletaSeleccionada.estado === 'PENDIENTE' && (
                        <div className="alert alert-warning mt-3 mb-0 small">
                          <strong>Pendiente de pago</strong><br />
                          Realiza la transferencia para confirmar tu pedido.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="card">
                    <div className="card-body text-center text-muted">
                      <p className="mb-0">Selecciona un pedido para ver los detalles</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default MisComprasContenido
