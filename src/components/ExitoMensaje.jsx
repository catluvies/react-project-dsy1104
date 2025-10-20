import { Link } from 'react-router-dom'
import './ExitoMensaje.css'

// mensaje cuando la compra sale bien
function ExitoMensaje() {
  return (
    <section className="exito">
      <div className="exito__contenedor">
        <div className="exito__card">
          <div className="exito__icono">
            <svg width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          </div>

          <h2 className="exito__titulo">¡Compra Exitosa!</h2>
          <p className="exito__descripcion">Tu pedido ha sido procesado correctamente</p>

          <div className="exito__detalles">
            <p className="exito__detalle">
              <strong>Número de pedido:</strong> #ORD123456789
            </p>
            <p className="exito__detalle">
              <strong>Fecha estimada de entrega:</strong> 25/10/2025
            </p>
          </div>

          <p className="exito__nota">
            Hemos enviado un correo de confirmación con los detalles de tu pedido
          </p>

          <div className="exito__botones">
            <Link to="/productos" className="boton boton--primario">
              Seguir Comprando
            </Link>
            <Link to="/" className="boton boton--secundario">
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExitoMensaje
