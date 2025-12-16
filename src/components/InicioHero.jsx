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
          backgroundImage: 'url("/images/hero/gif-pasteleria.gif")',
          backgroundSize: '100% auto',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(2px)',
          transform: 'scale(1.02)',
          zIndex: 0
        }}
      />
      {/* Overlay con gradiente para mejor transición */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 60%, rgba(255,254,247,0.8) 90%, rgba(255,254,247,1) 100%)',
          zIndex: 1
        }}
      />

      {/* Contenido */}
      <div
        className="container text-center py-5 d-flex flex-column justify-content-center position-relative"
        style={{ minHeight: '400px', zIndex: 2 }}
      >
        {/* Logo */}
        <div className="mb-4">
          <img
            src="/images/logo/logo-pasteleria.png"
            alt="Logo Mil Sabores"
            style={{
              maxWidth: '320px',
              width: '100%',
              height: 'auto',
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.4))'
            }}
          />
        </div>
        <div className="hero-text-glass mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p className="lead fs-4">
            50 años endulzando a Chile con las mejores tortas y postres tradicionales
          </p>
        </div>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link to="/productos" className="btn-aero btn-aero-rosa">
            Ver Productos
          </Link>
          <Link to="/categorias" className="btn-aero btn-aero-rosa">
            Ver Categorías
          </Link>
        </div>
      </div>
    </section>
  )
}

export default InicioHero
