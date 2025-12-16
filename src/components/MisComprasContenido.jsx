import { useState, useContext, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { boletasService, getEstadoColor } from '../api/boletasService'
import { formatearPrecio } from '../utils/formateo'

function MisComprasContenido() {
  const { usuario, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const comprobanteInputRef = useRef(null)

  const [boletas, setBoletas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null)

  const [comprobanteFile, setComprobanteFile] = useState(null)
  const [comprobantePreview, setComprobantePreview] = useState(null)
  const [subiendoComprobante, setSubiendoComprobante] = useState(false)
  const [errorComprobante, setErrorComprobante] = useState(null)
  const [exitoComprobante, setExitoComprobante] = useState(false)

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

  const limpiarComprobante = () => {
    setComprobanteFile(null)
    setComprobantePreview(null)
    setErrorComprobante(null)
    setExitoComprobante(false)
    if (comprobanteInputRef.current) {
      comprobanteInputRef.current.value = ''
    }
  }

  const handleComprobanteChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorComprobante('Solo se permiten imágenes')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorComprobante('La imagen no puede superar 5MB')
        return
      }
      setComprobanteFile(file)
      setComprobantePreview(URL.createObjectURL(file))
      setErrorComprobante(null)
      setExitoComprobante(false)
    }
  }

  const handleSubirComprobante = async () => {
    if (!comprobanteFile || !boletaSeleccionada) return

    setSubiendoComprobante(true)
    setErrorComprobante(null)
    try {
      await boletasService.subirComprobante(boletaSeleccionada.id, comprobanteFile)
      setExitoComprobante(true)
      limpiarComprobante()
      await cargarBoletas()
      // Actualizar la boleta seleccionada con los nuevos datos
      const boletasActualizadas = await boletasService.obtenerPorUsuario(usuario.id)
      const boletaActualizada = boletasActualizadas.find(b => b.id === boletaSeleccionada.id)
      if (boletaActualizada) {
        setBoletaSeleccionada(boletaActualizada)
      }
    } catch (err) {
      console.error('Error subiendo comprobante:', err)
      setErrorComprobante(err.response?.data?.mensaje || 'Error al subir el comprobante')
    } finally {
      setSubiendoComprobante(false)
    }
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
                        onClick={() => {
                          setBoletaSeleccionada(boleta)
                          limpiarComprobante()
                        }}
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

                      {boletaSeleccionada.estado === 'PENDIENTE' && boletaSeleccionada.metodoPago === 'TRANSFERENCIA' && (
                        <>
                          {!boletaSeleccionada.comprobanteUrl ? (
                            <div className="mt-3 p-3 border rounded bg-light">
                              <h6 className="mb-2">Subir comprobante de transferencia</h6>
                              <p className="small text-muted mb-2">
                                Sube una captura de pantalla de tu transferencia para agilizar la confirmación.
                              </p>

                              <div className="alert alert-info py-2 small mb-2">
                                <strong>Datos para transferencia:</strong><br />
                                Banco: Banco Estado<br />
                                Tipo de cuenta: Cuenta Corriente<br />
                                Número: 123456789<br />
                                RUT: 12.345.678-9<br />
                                Email: pagos@milsabores.cl
                              </div>

                              <input
                                type="file"
                                ref={comprobanteInputRef}
                                onChange={handleComprobanteChange}
                                accept="image/*"
                                className={`form-control form-control-sm ${errorComprobante ? 'is-invalid' : ''}`}
                                disabled={subiendoComprobante}
                              />
                              {errorComprobante && <div className="invalid-feedback">{errorComprobante}</div>}
                              <small className="text-muted">JPG, PNG. Máximo 5MB</small>

                              {comprobantePreview && (
                                <div className="mt-2 position-relative d-inline-block">
                                  <img
                                    src={comprobantePreview}
                                    alt="Preview comprobante"
                                    style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '8px' }}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                    style={{ transform: 'translate(30%, -30%)' }}
                                    onClick={limpiarComprobante}
                                    disabled={subiendoComprobante}
                                  >
                                    ×
                                  </button>
                                </div>
                              )}

                              {comprobanteFile && (
                                <div className="mt-2">
                                  <button
                                    onClick={handleSubirComprobante}
                                    className="btn btn-primary btn-sm w-100"
                                    disabled={subiendoComprobante}
                                  >
                                    {subiendoComprobante ? (
                                      <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Subiendo...
                                      </>
                                    ) : (
                                      'Subir comprobante'
                                    )}
                                  </button>
                                </div>
                              )}

                              {exitoComprobante && (
                                <div className="alert alert-success py-2 mt-2 mb-0 small">
                                  ¡Comprobante subido exitosamente!
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="alert alert-success mt-3 mb-0 small">
                              <strong>Comprobante enviado</strong><br />
                              Tu comprobante está siendo revisado.
                            </div>
                          )}
                        </>
                      )}

                      {boletaSeleccionada.estado === 'PENDIENTE' && boletaSeleccionada.metodoPago !== 'TRANSFERENCIA' && (
                        <div className="alert alert-warning mt-3 mb-0 small">
                          <strong>Pendiente de confirmación</strong><br />
                          Tu pedido está siendo procesado.
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
