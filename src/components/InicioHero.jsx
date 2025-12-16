import { Link } from 'react-router-dom'

function InicioHero() {
  return (
    <section
      className="text-white py-5 mb-5 position-relative overflow-hidden"
      style={{
        minHeight: '500px'
      }}
    >
      {/* Imagen de fondo con blur */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/images/hero/hero-pasteleria.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
          transform: 'scale(1.05)',
          zIndex: 0
        }}
      />
      {/* Overlay oscuro para mejor contraste */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          zIndex: 1
        }}
      />

      {/* Contenido */}
      <div
        className="container text-center py-5 d-flex flex-column justify-content-center position-relative"
        style={{ minHeight: '400px', zIndex: 2 }}
      >
        {/* Logo - puedes reemplazar esto con una imagen de logo */}
        <div className="mb-3">
          <img
            src="/logo_sanic.jpg"
            alt="Logo Mil Sabores"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '4px solid white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          />
        </div>
        <h1
          className="display-1 fw-bold mb-3"
          style={{
            textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
            fontFamily: "'Playfair Display', Georgia, serif"
          }}
        >
          Mil Sabores
        </h1>
        <p
          className="lead fs-4 mb-4"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          50 años endulzando a Chile con las mejores tortas y postres tradicionales
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link
            to="/productos"
            className="btn btn-lg px-4 py-2"
            style={{
              backgroundColor: '#8B7355',
              color: 'white',
              border: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#6B5B4F'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#8B7355'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Ver Productos
          </Link>
          <Link
            to="/categorias"
            className="btn btn-lg px-4 py-2"
            style={{
              backgroundColor: '#F8BBD9',
              color: '#6B5B4F',
              border: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#F5A3C7'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#F8BBD9'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Explorar Categorías
          </Link>
        </div>
      </div>
    </section>
  )
}

export default InicioHero
