import { Link } from 'react-router-dom'

function InicioCTA() {
  return (
    <section className="bg-pastel-pink py-5 my-5">
      <div className="container text-center py-4">
        <h2 className="mb-3">¿Tienes un evento especial?</h2>
        <p className="lead mb-4">
          Creamos tortas personalizadas para matrimonios, cumpleaños y celebraciones
        </p>
        <Link to="/contacto" className="btn btn-primary btn-lg">
          Solicitar Cotización
        </Link>
      </div>
    </section>
  )
}

export default InicioCTA
