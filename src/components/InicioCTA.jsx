import { Link } from 'react-router-dom'

function InicioCTA() {
  return (
    <section
      className="py-5 my-5"
      style={{ backgroundColor: '#FDF2F8' }}
    >
      <div className="container py-4">
        <div
          className="mx-auto text-center"
          style={{
            maxWidth: '600px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '3px dashed #F9A8D4',
            borderRadius: '28px',
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
            className="btn btn-lg"
            style={{
              backgroundColor: '#F59E0B',
              color: 'white',
              borderRadius: '9999px',
              padding: '12px 28px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#D97706'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#F59E0B'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            💌 Solicitar Cotización
          </Link>
        </div>
      </div>
    </section>
  )
}

export default InicioCTA
