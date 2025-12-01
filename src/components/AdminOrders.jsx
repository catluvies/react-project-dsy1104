import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { boletasService, ESTADOS_BOLETA, getEstadoColor } from '../api/boletasService'
import { formatearPrecio } from '../utils/formateo'

function AdminOrders() {
  const { isAdmin, isVendedor, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  const [boletas, setBoletas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null)
  const [cambiandoEstado, setCambiandoEstado] = useState(false)

  useEffect(() => {
    if (!isAuthenticated() || (!isAdmin() && !isVendedor())) {
      navigate('/')
      return
    }
    cargarBoletas()
  }, [])

  const cargarBoletas = async () => {
    try {
      setCargando(true)
      const data = await boletasService.obtenerTodas()
      setBoletas(data.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)))
    } catch (err) {
      console.error('Error cargando boletas:', err)
      setError('Error al cargar las órdenes')
    } finally {
      setCargando(false)
    }
  }

  const boletasFiltradas = filtroEstado === 'todos'
    ? boletas
    : boletas.filter(b => b.estado === filtroEstado)

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleCambiarEstado = async (boletaId, nuevoEstado) => {
    setCambiandoEstado(true)
    try {
      await boletasService.cambiarEstado(boletaId, nuevoEstado)
      await cargarBoletas()
      if (boletaSeleccionada?.id === boletaId) {
        setBoletaSeleccionada({ ...boletaSeleccionada, estado: nuevoEstado })
      }
    } catch (err) {
      console.error('Error cambiando estado:', err)
      alert('Error al cambiar el estado')
    } finally {
      setCambiandoEstado(false)
    }
  }

  const estadoSiguiente = (estadoActual) => {
    const flujo = {
      PENDIENTE: 'CONFIRMADA',
      CONFIRMADA: 'PREPARANDO',
      PREPARANDO: 'LISTA',
      LISTA: 'ENTREGADA'
    }
    return flujo[estadoActual] || null
  }

  if (cargando) {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Gestión de Órdenes</h1>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Gestión de Órdenes</h1>
        <div className="alert alert-danger">{error}</div>
        <button onClick={cargarBoletas} className="btn btn-primary">Reintentar</button>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Gestión de Órdenes</h1>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="form-select"
          style={{ width: 'auto' }}
        >
          <option value="todos">Todos los estados</option>
          {Object.values(ESTADOS_BOLETA).map(estado => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-2">
          <div className="card text-center">
            <div className="card-body py-2">
              <h5 className="mb-0">{boletas.length}</h5>
              <small className="text-muted">Total</small>
            </div>
          </div>
        </div>
        {Object.values(ESTADOS_BOLETA).slice(0, 5).map(estado => (
          <div key={estado} className="col-md-2">
            <div className="card text-center">
              <div className="card-body py-2">
                <h5 className="mb-0">{boletas.filter(b => b.estado === estado).length}</h5>
                <small className={`text-${getEstadoColor(estado)}`}>{estado}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-muted mb-3">
        Mostrando {boletasFiltradas.length} de {boletas.length} órdenes
      </p>

      <div className="row">
        <div className={boletaSeleccionada ? 'col-lg-7' : 'col-12'}>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {boletasFiltradas.map(boleta => (
                  <tr
                    key={boleta.id}
                    className={boletaSeleccionada?.id === boleta.id ? 'table-active' : ''}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setBoletaSeleccionada(boleta)}
                  >
                    <td><strong>{boleta.id}</strong></td>
                    <td>{formatearFecha(boleta.fechaCreacion)}</td>
                    <td>{boleta.usuarioNombre || `Usuario #${boleta.usuarioId}`}</td>
                    <td>${formatearPrecio(boleta.total)}</td>
                    <td>
                      <span className={`badge bg-${getEstadoColor(boleta.estado)}`}>
                        {boleta.estado}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setBoletaSeleccionada(boleta)
                        }}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {boletasFiltradas.length === 0 && (
            <div className="alert alert-info text-center">
              No hay órdenes con el estado seleccionado
            </div>
          )}
        </div>

        {boletaSeleccionada && (
          <div className="col-lg-5">
            <div className="card position-sticky" style={{ top: '20px' }}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Pedido #{boletaSeleccionada.id}</h5>
                <button
                  className="btn-close"
                  onClick={() => setBoletaSeleccionada(null)}
                ></button>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <span className={`badge bg-${getEstadoColor(boletaSeleccionada.estado)} fs-6`}>
                    {boletaSeleccionada.estado}
                  </span>
                </div>

                <div className="mb-3">
                  <h6>Cliente</h6>
                  <p className="mb-1">
                    <strong>{boletaSeleccionada.usuarioNombre || `Usuario #${boletaSeleccionada.usuarioId}`}</strong>
                  </p>
                  {boletaSeleccionada.usuarioEmail && (
                    <p className="mb-1 text-muted small">{boletaSeleccionada.usuarioEmail}</p>
                  )}
                </div>

                <div className="mb-3">
                  <h6>Fecha</h6>
                  <p className="mb-0">{formatearFecha(boletaSeleccionada.fechaCreacion)}</p>
                </div>

                <div className="mb-3">
                  <h6>Entrega</h6>
                  <p className="mb-1">{boletaSeleccionada.direccionEntrega}</p>
                  <p className="mb-0 text-muted">{boletaSeleccionada.comunaEntrega}</p>
                </div>

                {boletaSeleccionada.notas && (
                  <div className="mb-3">
                    <h6>Notas</h6>
                    <p className="mb-0 text-muted">{boletaSeleccionada.notas}</p>
                  </div>
                )}

                <hr />

                <h6>Productos</h6>
                {boletaSeleccionada.detalles?.map((detalle, index) => (
                  <div key={index} className="d-flex justify-content-between mb-2">
                    <span>
                      <span className="badge bg-secondary me-2">{detalle.cantidad}x</span>
                      {detalle.productoNombre || `Producto #${detalle.productoId}`}
                    </span>
                    <span>${formatearPrecio(detalle.subtotal)}</span>
                  </div>
                ))}

                <hr />

                <div className="d-flex justify-content-between mb-1">
                  <span>Subtotal:</span>
                  <span>${formatearPrecio(boletaSeleccionada.subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span>Envío:</span>
                  <span>${formatearPrecio(boletaSeleccionada.costoEnvio)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong className="text-primary">${formatearPrecio(boletaSeleccionada.total)}</strong>
                </div>

                <hr />

                <div className="mb-3">
                  <h6>Método de pago</h6>
                  <p className="mb-0">{boletaSeleccionada.metodoPago}</p>
                </div>

                {isAdmin() && boletaSeleccionada.estado !== 'ENTREGADA' && boletaSeleccionada.estado !== 'CANCELADA' && (
                  <>
                    <hr />
                    <h6>Cambiar estado</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {estadoSiguiente(boletaSeleccionada.estado) && (
                        <button
                          onClick={() => handleCambiarEstado(boletaSeleccionada.id, estadoSiguiente(boletaSeleccionada.estado))}
                          className="btn btn-primary btn-sm"
                          disabled={cambiandoEstado}
                        >
                          {cambiandoEstado ? 'Cambiando...' : `Pasar a ${estadoSiguiente(boletaSeleccionada.estado)}`}
                        </button>
                      )}
                      {boletaSeleccionada.estado !== 'CANCELADA' && (
                        <button
                          onClick={() => handleCambiarEstado(boletaSeleccionada.id, 'CANCELADA')}
                          className="btn btn-outline-danger btn-sm"
                          disabled={cambiandoEstado}
                        >
                          Cancelar pedido
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrders
