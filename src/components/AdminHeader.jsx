import { Link, useLocation } from 'react-router-dom'

function AdminHeader() {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="navbar navbar-dark bg-dark border-bottom">
      <div className="container-fluid">
        <Link to="/admin" className="navbar-brand">
          <h1 className="h4 mb-0">🏪 Admin - Mil Sabores</h1>
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
              Órdenes
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
        </ul>

        <Link to="/" className="btn btn-outline-light btn-sm">
          ← Volver al sitio
        </Link>
      </div>
    </nav>
  )
}

export default AdminHeader
