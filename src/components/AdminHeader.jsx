import { Link, useLocation } from 'react-router-dom'
import './AdminHeader.css'

function AdminHeader() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <header className="admin-header">
      <div className="admin-header__contenedor">
        <Link to="/admin" className="admin-header__logo">
          <h1>🏪 Admin - Mil Sabores</h1>
        </Link>

        <nav className="admin-header__nav">
          <Link 
            to="/admin" 
            className={`admin-header__link ${isActive('/admin') && !location.pathname.includes('/admin/ordenes') && !location.pathname.includes('/admin/productos') ? 'admin-header__link--active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/ordenes" 
            className={`admin-header__link ${isActive('/admin/ordenes') ? 'admin-header__link--active' : ''}`}
          >
            Órdenes
          </Link>
          <Link 
            to="/admin/productos" 
            className={`admin-header__link ${isActive('/admin/productos') ? 'admin-header__link--active' : ''}`}
          >
            Productos
          </Link>
        </nav>

        <div className="admin-header__acciones">
          <Link to="/" className="admin-header__volver">
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
