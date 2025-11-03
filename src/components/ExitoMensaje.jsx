import { Link } from 'react-router-dom'

function ExitoMensaje() {
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
              <p className="text-muted mb-4">Tu pedido ha sido procesado correctamente</p>

              <div className="alert alert-light mb-4">
                <p className="mb-2">
                  <strong>Número de pedido:</strong> #ORD123456789
                </p>
                <p className="mb-0">
                  <strong>Fecha estimada de entrega:</strong> 25/10/2025
                </p>
              </div>

              <p className="text-muted mb-4">
                Hemos enviado un correo de confirmación con los detalles de tu pedido
              </p>

              <div className="d-grid gap-2">
                <Link to="/productos" className="btn btn-primary">
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
