import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CarritoContext } from '../context/CarritoContext'
import { AuthContext } from '../context/AuthContext'

function Header() {
  const { totalItems } = useContext(CarritoContext)
  const { usuario, logout, isAdmin, isVendedor } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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

          <div className="d-flex gap-2 align-items-center">
            <Link to="/carrito" className="btn btn-outline-primary position-relative">
              🛒 Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>

            {usuario ? (
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {usuario.nombre}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {(isAdmin() || isVendedor()) && (
                    <>
                      <li>
                        <Link to="/admin/dashboard" className="dropdown-item">
                          Panel Admin
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                    </>
                  )}
                  <li>
                    <Link to="/perfil" className="dropdown-item">
                      Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link to="/mis-compras" className="dropdown-item">
                      Mis Compras
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-item text-danger">
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">Ingresar</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
