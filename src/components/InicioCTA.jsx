import { Link } from 'react-router-dom'
import './InicioCTA.css'

// Componente Call-to-Action (CTA) para eventos especiales
function InicioCTA() {
  return (
    <section className="inicio-cta">
      <div className="inicio-cta__contenedor">
        <h2 className="inicio-cta__titulo">¿Tienes un evento especial?</h2>
        <p className="inicio-cta__descripcion">
          Creamos tortas personalizadas para matrimonios, cumpleaños y celebraciones
        </p>
        <Link to="/contacto" className="inicio-cta__boton">
          Solicitar Cotización
        </Link>
      </div>
    </section>
  )
}

export default InicioCTA
