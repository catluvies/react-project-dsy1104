import { Link } from 'react-router-dom'

function InicioCTA() {
  return (
    <section
      className="py-5 my-5"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="container py-4">
        <div
          className="card-aero card-aero-rosa mx-auto text-center"
          style={{
            maxWidth: '600px',
            padding: '48px 32px'
          }}
        >
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>
            🎀
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              color: '#6B5B4F',
              fontSize: '2rem',
              marginBottom: '1rem'
            }}
          >
            ¿Tienes un evento especial?
          </h2>
          <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
            Creamos tortas personalizadas para matrimonios, cumpleaños y celebraciones
          </p>
          <Link
            to="/contacto"
            className="btn-aero btn-aero-naranja"
          >
            Solicitar Cotización
          </Link>
        </div>
      </div>
    </section>
  )
}

export default InicioCTA
