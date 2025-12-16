import { Link, useLocation } from 'react-router-dom'
import { formatearPrecio } from '../utils/formateo'

function ExitoMensaje() {
  const location = useLocation()
  const { boleta, fechaEntrega, horarioEntrega } = location.state || {}

  const formatearFechaEntrega = (fecha) => {
    if (!fecha) return 'Por confirmar'
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-CL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body text-center p-5">
              <div className="text-success mb-4">
                <svg width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
              </div>

              <h2 className="mb-3">¡Compra Exitosa!</h2>
              <p className="text-muted mb-4">Tu pedido ha sido registrado correctamente</p>

              <div className="alert alert-light mb-4 text-start">
                <p className="mb-2">
                  <strong>Número de pedido:</strong> #{boleta?.id || 'Generando...'}
                </p>
                <p className="mb-2">
                  <strong>Fecha de entrega:</strong> {formatearFechaEntrega(fechaEntrega)}
                </p>
                {horarioEntrega && (
                  <p className="mb-2">
                    <strong>Horario:</strong> {horarioEntrega}
                  </p>
                )}
                {boleta?.total && (
                  <p className="mb-0">
                    <strong>Total:</strong> ${formatearPrecio(boleta.total)}
                  </p>
                )}
              </div>

              {boleta?.metodoPago === 'TRANSFERENCIA' && (
                <div className="alert alert-warning mb-4 text-start">
                  <strong>Importante - Pago por transferencia</strong>
                  <p className="mb-2 mt-2">
                    Tu pedido quedará confirmado una vez que realices la transferencia y nuestro equipo la verifique.
                  </p>
                  <hr />
                  <small>
                    <strong>Datos bancarios:</strong><br />
                    Banco Estado - Cuenta Corriente<br />
                    N°: 123456789<br />
                    RUT: 12.345.678-9<br />
                    Nombre: Pastelería Mil Sabores<br />
                    Email: pagos@milsabores.cl
                  </small>
                </div>
              )}

              <p className="text-muted mb-4">
                Puedes revisar el estado de tu pedido en la sección "Mi Perfil"
              </p>

              <div className="d-grid gap-2">
                <Link to="/perfil" className="btn btn-primary">
                  Ver Mi Perfil
                </Link>
                <Link to="/productos" className="btn btn-outline-primary">
                  Seguir Comprando
                </Link>
                <Link to="/" className="btn btn-outline-secondary">
                  Volver al Inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExitoMensaje
