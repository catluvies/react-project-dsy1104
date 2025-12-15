import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function AdminHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const { usuario, isAdmin, logout } = useContext(AuthContext)

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const tituloHeader = isAdmin() ? 'Admin - Mil Sabores' : 'Vendedor - Mil Sabores'
  const colorFondo = isAdmin() ? 'bg-dark' : 'bg-primary'

  return (
    <nav className={`navbar navbar-dark ${colorFondo} border-bottom`}>
      <div className="container-fluid">
        <Link to="/admin" className="navbar-brand">
          <h1 className="h4 mb-0">{tituloHeader}</h1>
        </Link>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link
              to="/admin"
              className={`nav-link ${isActive('/admin') ? 'active' : 'text-light'}`}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/ordenes"
              className={`nav-link ${isActive('/admin/ordenes') ? 'active' : 'text-light'}`}
            >
              Pedidos
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/productos"
              className={`nav-link ${isActive('/admin/productos') ? 'active' : 'text-light'}`}
            >
              Productos
            </Link>
          </li>
          {isAdmin() && (
            <>
              <li className="nav-item">
                <Link
                  to="/admin/categorias"
                  className={`nav-link ${isActive('/admin/categorias') ? 'active' : 'text-light'}`}
                >
                  Categorías
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/usuarios"
                  className={`nav-link ${isActive('/admin/usuarios') ? 'active' : 'text-light'}`}
                >
                  Usuarios
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="d-flex align-items-center gap-3">
          <span className="text-light">{usuario?.nombre}</span>
          <div className="vr bg-light opacity-50"></div>
          <Link to="/" className="btn btn-warning btn-sm d-flex align-items-center gap-1">
            <span>Ver Tienda</span>
          </Link>
          <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
            Cerrar Sesion
          </button>
        </div>
      </div>
    </nav>
  )
}

export default AdminHeader
