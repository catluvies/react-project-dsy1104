import { ordenesData } from '../data/ordenes'
import './AdminOrders.css'

function AdminOrders() {
  // Datos estáticos - sin lógica compleja
  const ordenes = ordenesData
  const estados = ['todos', 'pendiente', 'en_preparacion', 'completada', 'entregada', 'cancelada']

  return (
    <div className="admin-orders">
      <div className="contenedor">
        <div className="admin-orders__header">
          <h1 className="titulo-principal">Gestión de Órdenes</h1>
          
          <div className="admin-orders__filtros">
            <select className="admin-filtro-select">
              {estados.map(estado => (
                <option key={estado} value={estado}>
                  {estado === 'todos' ? 'Todos los estados' : estado.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-orders__resumen">
          <p className="texto-muted">
            Mostrando {ordenes.length} órdenes
          </p>
        </div>

        <div className="admin-orders-lista">
          {ordenes.map((orden) => (
            <div key={orden.numero_orden} className="admin-order-card card">
              <div className="admin-order-card__header">
                <div className="admin-order-card__info">
                  <h3 className="admin-order-card__numero">{orden.numero_orden}</h3>
                  <span className={`admin-order-card__estado admin-order-card__estado--${orden.estado}`}>
                    {orden.estado.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="admin-order-card__total">
                  ${orden.costos.total.toLocaleString('es-CL')}
                </div>
              </div>

              <div className="admin-order-card__contenido">
                <div className="admin-order-card__col">
                  <h4>Cliente</h4>
                  <p><strong>{orden.cliente.nombre}</strong></p>
                  <p>{orden.cliente.email}</p>
                  <p><strong>Fecha:</strong> {orden.fecha}</p>
                  <p><strong>Pago:</strong> {orden.metodo_pago}</p>
                </div>
                
                <div className="admin-order-card__col">
                  <h4>Productos ({orden.productos.length})</h4>
                  <div className="admin-order-productos">
                    {orden.productos.slice(0, 3).map((producto, index) => (
                      <div key={index} className="admin-order-producto">
                        <span className="admin-order-producto__cantidad">{producto.cantidad}x</span>
                        <span className="admin-order-producto__nombre">{producto.nombre}</span>
                        <span className="admin-order-producto__precio">
                          ${producto.subtotal.toLocaleString('es-CL')}
                        </span>
                      </div>
                    ))}
                    {orden.productos.length > 3 && (
                      <div className="admin-order-producto-more">
                        +{orden.productos.length - 3} productos más
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {orden.notas_adicionales && (
                <div className="admin-order-card__notas">
                  <strong>Notas:</strong> {orden.notas_adicionales}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
