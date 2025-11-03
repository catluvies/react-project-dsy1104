import { ordenesData } from '../data/ordenes'
import productosData from '../data/productos.json'

function AdminDashboard() {
  const totalOrdenes = ordenesData.length
  const ordenesPendientes = ordenesData.filter(o => o.estado === 'pendiente').length
  const totalProductos = productosData.length
  const productosSinStock = productosData.filter(p => p.stock === 0).length

  const ultimasOrdenes = ordenesData
    .sort((a, b) => new Date(b.fecha.split('-').reverse().join('-')) - new Date(a.fecha.split('-').reverse().join('-')))
    .slice(0, 5)

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: 'bg-warning',
      en_preparacion: 'bg-info',
      completada: 'bg-success',
      entregada: 'bg-primary',
      cancelada: 'bg-danger'
    }
    return badges[estado] || 'bg-secondary'
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Dashboard Admin</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="fs-1 mb-2">📦</div>
              <h3 className="mb-0">{totalOrdenes}</h3>
              <p className="text-muted mb-0">Total Órdenes</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="fs-1 mb-2">⏳</div>
              <h3 className="mb-0">{ordenesPendientes}</h3>
              <p className="text-muted mb-0">Pendientes</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="fs-1 mb-2">🍰</div>
              <h3 className="mb-0">{totalProductos}</h3>
              <p className="text-muted mb-0">Total Productos</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body text-center">
              <div className="fs-1 mb-2">⚠️</div>
              <h3 className="mb-0">{productosSinStock}</h3>
              <p className="text-muted mb-0">Sin Stock</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-3">Últimas Órdenes</h2>
          <div className="row g-3">
            {ultimasOrdenes.map((orden) => (
              <div key={orden.numero_orden} className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold">{orden.numero_orden}</span>
                      <span className={`badge ${getEstadoBadge(orden.estado)}`}>
                        {orden.estado}
                      </span>
                    </div>
                    <div className="text-muted small mb-1">
                      {orden.cliente.nombre}
                    </div>
                    <div className="text-muted small mb-2">
                      {orden.fecha}
                    </div>
                    <div className="fw-bold">
                      ${orden.costos.total.toLocaleString('es-CL')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
