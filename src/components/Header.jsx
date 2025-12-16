import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect, useRef } from 'react'
import { CarritoContext } from '../context/CarritoContext'
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

function Header() {
  const { totalItems } = useContext(CarritoContext)
  const { usuario, logout, isAdmin, isVendedor } = useContext(AuthContext)
  const navigate = useNavigate()
  const [avatarImagen, setAvatarImagen] = useState(null)
  const [dropdownAbierto, setDropdownAbierto] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (usuario?.id) {
      const avatarGuardado = localStorage.getItem(`avatar_${usuario.id}`)
      if (avatarGuardado && AVATARES_MAP[avatarGuardado]) {
        setAvatarImagen(AVATARES_MAP[avatarGuardado])
      } else {
        setAvatarImagen(null)
      }
    }
  }, [usuario])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAbierto(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-pastel-cream border-bottom border-3" style={{ minHeight: '80px', padding: '12px 0' }}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src="/logo_sanic.jpg"
            alt="Logo Mil Sabores"
            style={{width: '60px', height: '60px', borderRadius: '50%'}}
          />
          <h1 className="h2 mb-0">Mil Sabores</h1>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto" style={{ gap: '8px' }}>
            <li className="nav-item"><Link to="/" className="nav-link" style={{ fontSize: '1.05rem', padding: '10px 14px' }}>Inicio</Link></li>
            <li className="nav-item"><Link to="/productos" className="nav-link" style={{ fontSize: '1.05rem', padding: '10px 14px' }}>Productos</Link></li>
            <li className="nav-item"><Link to="/categorias" className="nav-link" style={{ fontSize: '1.05rem', padding: '10px 14px' }}>Categorías</Link></li>
            <li className="nav-item"><Link to="/ofertas" className="nav-link" style={{ fontSize: '1.05rem', padding: '10px 14px' }}>Ofertas</Link></li>
            <li className="nav-item"><Link to="/blog" className="nav-link" style={{ fontSize: '1.05rem', padding: '10px 14px' }}>Blog</Link></li>
            <li className="nav-item"><Link to="/nosotros" className="nav-link" style={{ fontSize: '1.05rem', padding: '10px 14px' }}>Nosotros</Link></li>
            <li className="nav-item"><Link to="/contacto" className="nav-link" style={{ fontSize: '1.05rem', padding: '10px 14px' }}>Contacto</Link></li>
          </ul>

          <div className="d-flex gap-2 align-items-center">
            <Link to="/carrito" className="btn btn-outline-primary position-relative" style={{ padding: '10px 18px', fontSize: '1rem' }}>
              Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>

            {usuario ? (
              <div className="dropdown" ref={dropdownRef}>
                <button
                  className="btn btn-primary dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  onClick={() => setDropdownAbierto(!dropdownAbierto)}
                  aria-expanded={dropdownAbierto}
                  style={{ padding: '8px 16px', fontSize: '1rem' }}
                >
                  {avatarImagen ? (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
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
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '0.85rem'
                      }}
                    >
                      {usuario.nombre?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                  {usuario.nombre}
                </button>
                <ul className={`dropdown-menu dropdown-menu-end ${dropdownAbierto ? 'show' : ''}`}>
                  {(isAdmin() || isVendedor()) ? (
                    <>
                      <li>
                        <Link to="/admin/dashboard" className="dropdown-item" onClick={() => setDropdownAbierto(false)}>
                          {isAdmin() ? 'Panel Administrador' : 'Panel Vendedor'}
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button onClick={handleLogout} className="dropdown-item text-danger">
                          Cerrar Sesión
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/perfil" className="dropdown-item" onClick={() => setDropdownAbierto(false)}>
                          Mi Perfil
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button onClick={handleLogout} className="dropdown-item text-danger">
                          Cerrar Sesión
                        </button>
                      </li>
                    </>
                  )}
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
