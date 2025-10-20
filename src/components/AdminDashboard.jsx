import { ordenesData } from '../data/ordenes'
import productosData from '../data/productos.json'
import './AdminDashboard.css'

function AdminDashboard() {
  // Estadísticas básicas
  const totalOrdenes = ordenesData.length
  const ordenesPendientes = ordenesData.filter(o => o.estado === 'pendiente').length
  const totalProductos = productosData.length
  const productosSinStock = productosData.filter(p => p.stock === 0).length

  // Últimas órdenes
  const ultimasOrdenes = ordenesData
    .sort((a, b) => new Date(b.fecha.split('-').reverse().join('-')) - new Date(a.fecha.split('-').reverse().join('-')))
    .slice(0, 5)

  return (
    <div className="admin-dashboard">
      <div className="contenedor">
        <h1 className="titulo-principal">Dashboard Admin</h1>
        
        {/* Estadísticas principales */}
        <div className="admin-stats grid grid--4">
          <div className="admin-stat-card card">
            <div className="admin-stat-card__icon">📦</div>
            <div className="admin-stat-card__content">
              <h3>{totalOrdenes}</h3>
              <p>Total Órdenes</p>
            </div>
          </div>
          
          <div className="admin-stat-card card">
            <div className="admin-stat-card__icon">⏳</div>
            <div className="admin-stat-card__content">
              <h3>{ordenesPendientes}</h3>
              <p>Pendientes</p>
            </div>
          </div>
          
          <div className="admin-stat-card card">
            <div className="admin-stat-card__icon">🍰</div>
            <div className="admin-stat-card__content">
              <h3>{totalProductos}</h3>
              <p>Total Productos</p>
            </div>
          </div>
          
          <div className="admin-stat-card card">
            <div className="admin-stat-card__icon">⚠️</div>
            <div className="admin-stat-card__content">
              <h3>{productosSinStock}</h3>
              <p>Sin Stock</p>
            </div>
          </div>
        </div>

        {/* Últimas órdenes */}
        <div className="admin-section card">
          <h2 className="titulo-seccion">Últimas Órdenes</h2>
          <div className="admin-ordenes-lista">
            {ultimasOrdenes.map((orden) => (
              <div key={orden.numero_orden} className="admin-orden-item">
                <div className="admin-orden-item__header">
                  <span className="admin-orden-item__numero">{orden.numero_orden}</span>
                  <span className={`admin-orden-item__estado admin-orden-item__estado--${orden.estado}`}>
                    {orden.estado}
                  </span>
                </div>
                <div className="admin-orden-item__cliente">
                  {orden.cliente.nombre}
                </div>
                <div className="admin-orden-item__fecha">
                  {orden.fecha}
                </div>
                <div className="admin-orden-item__total">
                  ${orden.costos.total.toLocaleString('es-CL')}
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
