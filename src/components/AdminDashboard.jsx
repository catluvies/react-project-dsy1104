import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { boletasService, getEstadoColor } from '../api/boletasService'
import { productosService } from '../api/productosService'
import { usuariosService } from '../api/usuariosService'
import { formatearPrecio } from '../utils/formateo'

function AdminDashboard() {
  const { isAdmin, isVendedor, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  const [estadisticas, setEstadisticas] = useState({
    totalBoletas: 0,
    boletasPendientes: 0,
    totalProductos: 0,
    productosSinStock: 0,
    totalUsuarios: 0,
    totalVentas: 0
  })
  const [ultimasBoletas, setUltimasBoletas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isAuthenticated() || (!isAdmin() && !isVendedor())) {
      navigate('/')
      return
    }
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      setError(null)

      const [boletas, productos] = await Promise.all([
        boletasService.obtenerTodas(),
        productosService.obtenerTodos()
      ])

      let usuarios = []
      if (isAdmin()) {
        try {
          usuarios = await usuariosService.obtenerTodos()
        } catch (e) {
          console.log('No se pudo cargar usuarios')
        }
      }

      const totalVentas = boletas
        .filter(b => b.estado !== 'CANCELADA')
        .reduce((sum, b) => sum + b.total, 0)

      setEstadisticas({
        totalBoletas: boletas.length,
        boletasPendientes: boletas.filter(b => b.estado === 'PENDIENTE').length,
        totalProductos: productos.length,
        productosSinStock: productos.filter(p => p.stock === 0).length,
        totalUsuarios: usuarios.length,
        totalVentas
      })

      const ordenadas = boletas
        .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
        .slice(0, 5)
      setUltimasBoletas(ordenadas)
    } catch (err) {
      console.error('Error cargando datos:', err)
      setError('Error al cargar datos del dashboard')
    } finally {
      setCargando(false)
    }
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (cargando) {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Dashboard Admin</h1>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Dashboard Admin</h1>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button onClick={cargarDatos} className="btn btn-primary">
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Dashboard Admin</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="fs-1 mb-2">$</div>
              <h3 className="mb-0">${formatearPrecio(estadisticas.totalVentas)}</h3>
              <p className="text-muted mb-0">Total Ventas</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <Link to="/admin/ordenes" className="text-decoration-none">
            <div className="card h-100">
              <div className="card-body text-center">
                <div className="fs-1 mb-2">
                  <span className="badge bg-warning">{estadisticas.boletasPendientes}</span>
                </div>
                <h3 className="mb-0 text-dark">{estadisticas.totalBoletas}</h3>
                <p className="text-muted mb-0">Total Pedidos</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-lg-3">
          <Link to="/admin/productos" className="text-decoration-none">
            <div className="card h-100">
              <div className="card-body text-center">
                {estadisticas.productosSinStock > 0 && (
                  <div className="fs-1 mb-2">
                    <span className="badge bg-danger">{estadisticas.productosSinStock} sin stock</span>
                  </div>
                )}
                {estadisticas.productosSinStock === 0 && (
                  <div className="fs-1 mb-2">OK</div>
                )}
                <h3 className="mb-0 text-dark">{estadisticas.totalProductos}</h3>
                <p className="text-muted mb-0">Productos</p>
              </div>
            </div>
          </Link>
        </div>

        {isAdmin() && (
          <div className="col-md-6 col-lg-3">
            <Link to="/admin/usuarios" className="text-decoration-none">
              <div className="card h-100">
                <div className="card-body text-center">
                  <div className="fs-1 mb-2">U</div>
                  <h3 className="mb-0 text-dark">{estadisticas.totalUsuarios}</h3>
                  <p className="text-muted mb-0">Usuarios</p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Últimos Pedidos</h5>
              <Link to="/admin/ordenes" className="btn btn-outline-primary btn-sm">
                Ver todos
              </Link>
            </div>
            <div className="card-body p-0">
              {ultimasBoletas.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  No hay pedidos registrados
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ultimasBoletas.map(boleta => (
                        <tr key={boleta.id}>
                          <td><strong>{boleta.id}</strong></td>
                          <td>{formatearFecha(boleta.fechaCreacion)}</td>
                          <td>{boleta.usuarioNombre || `Usuario #${boleta.usuarioId}`}</td>
                          <td>${formatearPrecio(boleta.total)}</td>
                          <td>
                            <span className={`badge bg-${getEstadoColor(boleta.estado)}`}>
                              {boleta.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Accesos Rápidos</h5>
            </div>
            <div className="list-group list-group-flush">
              <Link to="/admin/productos" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                Gestionar Productos
                <span className="badge bg-primary rounded-pill">{estadisticas.totalProductos}</span>
              </Link>
              <Link to="/admin/ordenes" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                Ver Pedidos
                <span className="badge bg-warning rounded-pill">{estadisticas.boletasPendientes} pendientes</span>
              </Link>
              {isAdmin() && (
                <>
                  <Link to="/admin/usuarios" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    Gestionar Usuarios
                    <span className="badge bg-secondary rounded-pill">{estadisticas.totalUsuarios}</span>
                  </Link>
                  <Link to="/admin/categorias" className="list-group-item list-group-item-action">
                    Gestionar Categorías
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
