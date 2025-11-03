import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CarritoContext } from '../context/CarritoContext'

function Header() {
  const { totalItems } = useContext(CarritoContext)

  return (
    <nav className="navbar navbar-expand-lg bg-pastel-cream border-bottom border-3">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src="/logo_sanic.jpg"
            alt="Logo Mil Sabores"
            style={{width: '50px', height: '50px', borderRadius: '50%'}}
          />
          <h1 className="h3 mb-0">Mil Sabores</h1>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link to="/" className="nav-link">Inicio</Link></li>
            <li className="nav-item"><Link to="/productos" className="nav-link">Productos</Link></li>
            <li className="nav-item"><Link to="/categorias" className="nav-link">Categorías</Link></li>
            <li className="nav-item"><Link to="/ofertas" className="nav-link">Ofertas</Link></li>
            <li className="nav-item"><Link to="/blog" className="nav-link">Blog</Link></li>
            <li className="nav-item"><Link to="/nosotros" className="nav-link">Nosotros</Link></li>
            <li className="nav-item"><Link to="/contacto" className="nav-link">Contacto</Link></li>
          </ul>

          <div className="d-flex gap-2">
            <Link to="/carrito" className="btn btn-outline-primary position-relative">
              🛒 Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/login" className="btn btn-primary">Ingresar</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
