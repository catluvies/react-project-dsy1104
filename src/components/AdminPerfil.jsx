import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { usuariosService } from '../api/usuariosService'
import { authService } from '../api/authService'

const AVATARES_DISPONIBLES = [
  { id: 'nekoo', imagen: '/images/iconos/nekoo-lol.jpeg', nombre: 'Nekoo' },
  { id: 'zoe', imagen: '/images/iconos/zoe-lol.jpeg', nombre: 'Zoe' },
  { id: 'xayah', imagen: '/images/iconos/xayah.jpeg', nombre: 'Xayah' },
  { id: 'jinx', imagen: '/images/iconos/jinx pixel.jpeg', nombre: 'Jinx' },
  { id: 'ludo', imagen: '/images/iconos/ludo.jpeg', nombre: 'Ludo' },
  { id: 'gato-alien', imagen: '/images/iconos/gato-alien.jpeg', nombre: 'Gato Alien' },
  { id: 'nino-kawai', imagen: '/images/iconos/niño-kawai.jpeg', nombre: 'Kawaii' },
  { id: 'barbie', imagen: '/images/iconos/barbie.jpeg', nombre: 'Barbie' },
  { id: 'tocanna', imagen: '/images/iconos/tocanna.jpg', nombre: 'Tocanna' },
  { id: 'jiafei', imagen: '/images/iconos/jiafei.jpeg', nombre: 'Jiafei' },
  { id: 'jovani', imagen: '/images/iconos/jovani-vazquez.jpg', nombre: 'Jovani' }
]

function AdminPerfil() {
  const { usuario, isAdmin } = useContext(AuthContext)

  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rut: '',
    telefono: '',
    direccion: '',
    comuna: ''
  })
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(null)
  const [mostrarAvatares, setMostrarAvatares] = useState(false)

  // Estados para cambio de contraseña
  const [mostrarCambioPassword, setMostrarCambioPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    passwordActual: '',
    passwordNueva: '',
    confirmarPassword: ''
  })
  const [erroresPassword, setErroresPassword] = useState({})
  const [guardandoPassword, setGuardandoPassword] = useState(false)

  useEffect(() => {
    cargarPerfil()
    const avatarGuardado = localStorage.getItem(`avatar_${usuario?.id}`)
    if (avatarGuardado) {
      setAvatarSeleccionado(avatarGuardado)
    }
  }, [usuario])

  const cargarPerfil = async () => {
    if (!usuario?.id) return

    try {
      setCargando(true)
      const datos = await usuariosService.obtenerPorId(usuario.id)
      setPerfil({
        nombre: datos.nombre || '',
        apellido: datos.apellido || '',
        email: datos.email || '',
        rut: datos.rut || '',
        telefono: datos.telefono || '',
        direccion: datos.direccion || '',
        comuna: datos.comuna || ''
      })
    } catch (error) {
      console.error('Error al cargar perfil:', error)
      setMensaje({ tipo: 'danger', texto: 'Error al cargar los datos del perfil' })
    } finally {
      setCargando(false)
    }
  }

  const seleccionarAvatar = (avatarId) => {
    setAvatarSeleccionado(avatarId)
    localStorage.setItem(`avatar_${usuario?.id}`, avatarId)
    setMostrarAvatares(false)
    setMensaje({ tipo: 'success', texto: 'Avatar actualizado' })
    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000)
  }

  const obtenerAvatarActual = () => {
    if (avatarSeleccionado) {
      const avatar = AVATARES_DISPONIBLES.find(a => a.id === avatarSeleccionado)
      if (avatar) return avatar
    }
    return null
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
    if (erroresPassword[name]) {
      setErroresPassword({ ...erroresPassword, [name]: '' })
    }
  }

  const validarPassword = () => {
    const nuevosErrores = {}

    if (!passwordData.passwordActual) {
      nuevosErrores.passwordActual = 'La contraseña actual es requerida'
    }

    if (!passwordData.passwordNueva || passwordData.passwordNueva.length < 6) {
      nuevosErrores.passwordNueva = 'La nueva contraseña debe tener al menos 6 caracteres'
    }

    if (passwordData.passwordNueva !== passwordData.confirmarPassword) {
      nuevosErrores.confirmarPassword = 'Las contraseñas no coinciden'
    }

    setErroresPassword(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleCambiarPassword = async (e) => {
    e.preventDefault()
    if (!validarPassword()) return

    setGuardandoPassword(true)
    try {
      await authService.cambiarPassword(passwordData.passwordActual, passwordData.passwordNueva)
      setMensaje({ tipo: 'success', texto: 'Contraseña actualizada correctamente' })
      setMostrarCambioPassword(false)
      setPasswordData({ passwordActual: '', passwordNueva: '', confirmarPassword: '' })
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'Error al cambiar la contraseña'
      setErroresPassword({ general: msg })
    } finally {
      setGuardandoPassword(false)
    }
  }

  const cancelarCambioPassword = () => {
    setMostrarCambioPassword(false)
    setPasswordData({ passwordActual: '', passwordNueva: '', confirmarPassword: '' })
    setErroresPassword({})
  }

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando perfil...</p>
      </div>
    )
  }

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="mb-4">Mi Perfil</h2>

          {mensaje.texto && (
            <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show`} role="alert">
              {mensaje.texto}
              <button type="button" className="btn-close" onClick={() => setMensaje({ tipo: '', texto: '' })}></button>
            </div>
          )}

          <div className="row">
            {/* Columna del avatar */}
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body text-center">
                  <div className="position-relative d-inline-block mb-3">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: '120px',
                        height: '120px',
                        cursor: 'pointer',
                        background: obtenerAvatarActual() ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2), inset 0 -2px 5px rgba(0,0,0,0.1)',
                        border: '4px solid #fff',
                        overflow: 'hidden'
                      }}
                      onClick={() => setMostrarAvatares(!mostrarAvatares)}
                      title="Cambiar avatar"
                    >
                      {obtenerAvatarActual() ? (
                        <img
                          src={obtenerAvatarActual().imagen}
                          alt={obtenerAvatarActual().nombre}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <span className="text-white display-4 fw-bold">
                          {perfil.nombre?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                    <small className="d-block text-muted mt-2">Click para cambiar</small>
                  </div>

                  <h5 className="mb-1">{perfil.nombre} {perfil.apellido}</h5>
                  <p className="text-muted small mb-2">{perfil.email}</p>
                  <span className={`badge ${isAdmin() ? 'bg-danger' : 'bg-warning text-dark'}`}>
                    {isAdmin() ? 'Administrador' : 'Vendedor'}
                  </span>

                  {mostrarAvatares && (
                    <div className="card mt-3 shadow">
                      <div className="card-body p-3">
                        <p className="small text-muted mb-3">Selecciona tu avatar:</p>
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                          {AVATARES_DISPONIBLES.map(avatar => (
                            <button
                              key={avatar.id}
                              onClick={() => seleccionarAvatar(avatar.id)}
                              className="btn p-0 position-relative"
                              style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: avatarSeleccionado === avatar.id ? '3px solid #0d6efd' : '2px solid #dee2e6',
                                boxShadow: avatarSeleccionado === avatar.id ? '0 0 10px rgba(13,110,253,0.5)' : 'none',
                                transition: 'all 0.2s ease'
                              }}
                              title={avatar.nombre}
                            >
                              <img
                                src={avatar.imagen}
                                alt={avatar.nombre}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Columna de información */}
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Información Personal</h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Nombre</label>
                      <p className="form-control-plaintext fw-medium">{perfil.nombre || '-'}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Apellido</label>
                      <p className="form-control-plaintext fw-medium">{perfil.apellido || '-'}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Email</label>
                      <p className="form-control-plaintext fw-medium">{perfil.email || '-'}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">RUT</label>
                      <p className="form-control-plaintext fw-medium">{perfil.rut || '-'}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Teléfono</label>
                      <p className="form-control-plaintext fw-medium">{perfil.telefono || '-'}</p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small">Comuna</label>
                      <p className="form-control-plaintext fw-medium">{perfil.comuna || '-'}</p>
                    </div>
                    {perfil.direccion && (
                      <div className="col-12">
                        <label className="form-label text-muted small">Dirección</label>
                        <p className="form-control-plaintext fw-medium">{perfil.direccion}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sección de seguridad */}
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Seguridad</h5>
                  {!mostrarCambioPassword && (
                    <button
                      onClick={() => setMostrarCambioPassword(true)}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Cambiar Contraseña
                    </button>
                  )}
                </div>
                {mostrarCambioPassword ? (
                  <div className="card-body">
                    {erroresPassword.general && (
                      <div className="alert alert-danger" role="alert">
                        {erroresPassword.general}
                      </div>
                    )}
                    <form onSubmit={handleCambiarPassword}>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label">Contraseña actual</label>
                          <input
                            type="password"
                            name="passwordActual"
                            value={passwordData.passwordActual}
                            onChange={handlePasswordChange}
                            className={`form-control ${erroresPassword.passwordActual ? 'is-invalid' : ''}`}
                            disabled={guardandoPassword}
                          />
                          {erroresPassword.passwordActual && (
                            <div className="invalid-feedback">{erroresPassword.passwordActual}</div>
                          )}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Nueva contraseña</label>
                          <input
                            type="password"
                            name="passwordNueva"
                            value={passwordData.passwordNueva}
                            onChange={handlePasswordChange}
                            className={`form-control ${erroresPassword.passwordNueva ? 'is-invalid' : ''}`}
                            disabled={guardandoPassword}
                          />
                          {erroresPassword.passwordNueva && (
                            <div className="invalid-feedback">{erroresPassword.passwordNueva}</div>
                          )}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Confirmar nueva contraseña</label>
                          <input
                            type="password"
                            name="confirmarPassword"
                            value={passwordData.confirmarPassword}
                            onChange={handlePasswordChange}
                            className={`form-control ${erroresPassword.confirmarPassword ? 'is-invalid' : ''}`}
                            disabled={guardandoPassword}
                          />
                          {erroresPassword.confirmarPassword && (
                            <div className="invalid-feedback">{erroresPassword.confirmarPassword}</div>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 d-flex gap-2">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={guardandoPassword}
                        >
                          {guardandoPassword ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Guardando...
                            </>
                          ) : (
                            'Actualizar Contraseña'
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={cancelarCambioPassword}
                          className="btn btn-outline-secondary"
                          disabled={guardandoPassword}
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="card-body">
                    <p className="text-muted mb-0">
                      Tu contraseña está protegida. Haz clic en "Cambiar Contraseña" para actualizarla.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPerfil
