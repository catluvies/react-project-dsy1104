import { ordenesData } from '../data/ordenes'

function AdminOrders() {
  const ordenes = ordenesData
  const estados = ['todos', 'pendiente', 'en_preparacion', 'completada', 'entregada', 'cancelada']

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Órdenes</h1>

        <div>
          <select className="form-select">
            {estados.map(estado => (
              <option key={estado} value={estado}>
                {estado === 'todos' ? 'Todos los estados' : estado.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-muted">
          Mostrando {ordenes.length} órdenes
        </p>
      </div>

      <div className="row g-3">
        {ordenes.map((orden) => (
          <div key={orden.numero_orden} className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h3 className="h5 mb-2">{orden.numero_orden}</h3>
                    <span className={`badge ${getEstadoBadge(orden.estado)}`}>
                      {orden.estado.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="fs-4 fw-bold">
                    ${orden.costos.total.toLocaleString('es-CL')}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <h4 className="h6 mb-2">Cliente</h4>
                    <p className="mb-1"><strong>{orden.cliente.nombre}</strong></p>
                    <p className="mb-1 text-muted">{orden.cliente.email}</p>
                    <p className="mb-1"><strong>Fecha:</strong> {orden.fecha}</p>
                    <p className="mb-0"><strong>Pago:</strong> {orden.metodo_pago}</p>
                  </div>

                  <div className="col-md-6">
                    <h4 className="h6 mb-2">Productos ({orden.productos.length})</h4>
                    <div>
                      {orden.productos.slice(0, 3).map((producto, index) => (
                        <div key={index} className="d-flex justify-content-between mb-2">
                          <span>
                            <span className="badge bg-secondary me-2">{producto.cantidad}x</span>
                            {producto.nombre}
                          </span>
                          <span className="fw-bold">
                            ${producto.subtotal.toLocaleString('es-CL')}
                          </span>
                        </div>
                      ))}
                      {orden.productos.length > 3 && (
                        <div className="text-muted small">
                          +{orden.productos.length - 3} productos más
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {orden.notas_adicionales && (
                  <div className="mt-3 pt-3 border-top">
                    <strong>Notas:</strong> {orden.notas_adicionales}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminOrders
