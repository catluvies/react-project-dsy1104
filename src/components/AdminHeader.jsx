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

  return (
    <nav className="navbar navbar-dark bg-dark border-bottom">
      <div className="container-fluid">
        <Link to="/admin" className="navbar-brand">
          <h1 className="h4 mb-0">Admin - Mil Sabores</h1>
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

        <div className="d-flex align-items-center gap-2">
          <span className="text-light small">{usuario?.nombre}</span>
          <Link to="/" className="btn btn-outline-light btn-sm">
            Ir al sitio
          </Link>
          <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
            Salir
          </button>
        </div>
      </div>
    </nav>
  )
}

export default AdminHeader
