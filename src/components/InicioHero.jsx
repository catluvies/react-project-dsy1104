import { Link } from 'react-router-dom'

function InicioHero() {
  return (
    <section
      className="text-white py-5 mb-5 position-relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px'
      }}
    >
      <div className="container text-center py-5 d-flex flex-column justify-content-center" style={{ minHeight: '400px' }}>
        <h1 className="display-1 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Mil Sabores
        </h1>
        <p className="lead fs-3 mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
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
