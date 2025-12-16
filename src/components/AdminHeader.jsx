import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const AVATARES_MAP = {
  'nekoo': '/images/iconos/nekoo-lol.jpeg',
  'zoe': '/images/iconos/zoe-lol.jpeg',
  'xayah': '/images/iconos/xayah.jpeg',
  'jinx': '/images/iconos/jinx pixel.jpeg',
  'ludo': '/images/iconos/ludo.jpeg',
  'gato-alien': '/images/iconos/gato-alien.jpeg',
  'nino-kawai': '/images/iconos/niño-kawai.jpeg',
  'barbie': '/images/iconos/barbie.jpeg',
  'tocanna': '/images/iconos/tocanna.jpg',
  'jiafei': '/images/iconos/jiafei.jpeg',
  'jovani': '/images/iconos/jovani-vazquez.jpg'
}

function AdminHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const { usuario, isAdmin, logout } = useContext(AuthContext)
  const [avatarImagen, setAvatarImagen] = useState(null)

  useEffect(() => {
    const cargarAvatar = () => {
      if (usuario?.id) {
        const avatarGuardado = localStorage.getItem(`avatar_${usuario.id}`)
        if (avatarGuardado && AVATARES_MAP[avatarGuardado]) {
          setAvatarImagen(AVATARES_MAP[avatarGuardado])
        } else {
          setAvatarImagen(null)
        }
      }
    }

    cargarAvatar()

    // Escuchar cambios de avatar
    window.addEventListener('avatarChanged', cargarAvatar)
    return () => window.removeEventListener('avatarChanged', cargarAvatar)
  }, [usuario])

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

  return (
    <nav className="navbar admin-header">
      <div className="container-fluid">
        <Link to="/admin" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src="/images/logo/logo-pasteleria.png"
            alt="Logo"
            style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}}
          />
          <h1 className="h4 mb-0">{tituloHeader}</h1>
        </Link>

        <ul className="nav">
          <li className="nav-item">
            <Link
              to="/admin"
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/ordenes"
              className={`nav-link ${isActive('/admin/ordenes') ? 'active' : ''}`}
            >
              Pedidos
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/productos"
              className={`nav-link ${isActive('/admin/productos') ? 'active' : ''}`}
            >
              Productos
            </Link>
          </li>
          {isAdmin() && (
            <>
              <li className="nav-item">
                <Link
                  to="/admin/categorias"
                  className={`nav-link ${isActive('/admin/categorias') ? 'active' : ''}`}
                >
                  Categorías
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/usuarios"
                  className={`nav-link ${isActive('/admin/usuarios') ? 'active' : ''}`}
                >
                  Usuarios
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link
              to="/admin/perfil"
              className={`nav-link ${isActive('/admin/perfil') ? 'active' : ''}`}
            >
              Mi Perfil
            </Link>
          </li>
        </ul>

        <div className="d-flex align-items-center gap-3">
          <Link
            to="/admin/perfil"
            className="d-flex align-items-center gap-2 text-decoration-none"
            title="Ver mi perfil"
          >
            {avatarImagen ? (
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              >
                <img
                  src={avatarImagen}
                  alt="Avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}
              >
                {usuario?.nombre?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
            <span className="fw-medium text-dark">{usuario?.nombre}</span>
          </Link>
          <div className="vr opacity-50"></div>
          <Link to="/" className="btn-aero btn-aero-cafe btn-aero-sm">
            Ver Tienda
          </Link>
          <button onClick={handleLogout} className="btn-aero btn-aero-rojo btn-aero-sm">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  )
}

export default AdminHeader
