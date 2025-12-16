import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { usuariosService } from '../api/usuariosService'
import { authService } from '../api/authService'
import { boletasService, getEstadoColor } from '../api/boletasService'
import { obtenerComunas } from '../data/comunas'
import { validarNombre, validarEmail, validarTelefono, validarRut } from '../utils/validaciones'
import { formatearPrecio } from '../utils/formateo'

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

function PerfilContenido() {
  const { usuario, isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  // Tab activo - puede venir de la URL o del state de navegación
  const [tabActivo, setTabActivo] = useState(
    location.state?.tab === 'compras' ? 'compras' : 'perfil'
  )

  // Estados de perfil
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rut: '',
    telefono: '',
    direccion: '',
    comuna: ''
  })
  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })
  const [modoEdicion, setModoEdicion] = useState(false)
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(null)
  const [mostrarAvatares, setMostrarAvatares] = useState(false)
  const [comunas, setComunas] = useState([])
  const [mostrarCambioPassword, setMostrarCambioPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    passwordActual: '',
    passwordNueva: '',
    confirmarPassword: ''
  })
  const [erroresPassword, setErroresPassword] = useState({})
  const [guardandoPassword, setGuardandoPassword] = useState(false)

  // Estados de mis compras
  const [boletas, setBoletas] = useState([])
  const [cargandoBoletas, setCargandoBoletas] = useState(false)
  const [errorBoletas, setErrorBoletas] = useState(null)
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null)

  // Estados para subir comprobante
  const [archivoComprobante, setArchivoComprobante] = useState(null)
  const [subiendoComprobante, setSubiendoComprobante] = useState(false)
  const [errorComprobante, setErrorComprobante] = useState(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }
    cargarPerfil()
    cargarBoletas()
    const cargarComunas = async () => {
      const data = await obtenerComunas()
      setComunas(data)
    }
    cargarComunas()
    const avatarGuardado = localStorage.getItem(`avatar_${usuario?.id}`)
    if (avatarGuardado) {
      setAvatarSeleccionado(avatarGuardado)
    }
  }, [usuario])

  // Funciones de perfil
  const seleccionarAvatar = (avatarId) => {
    setAvatarSeleccionado(avatarId)
    localStorage.setItem(`avatar_${usuario?.id}`, avatarId)
    setMostrarAvatares(false)
    setMensaje({ tipo: 'success', texto: 'Avatar actualizado' })
  }

  const obtenerAvatarActual = () => {
    if (avatarSeleccionado) {
      const avatar = AVATARES_DISPONIBLES.find(a => a.id === avatarSeleccionado)
      if (avatar) return avatar
    }
    return null
  }

  const cargarPerfil = async () => {
    if (!usuario?.id) return

    try {
      setCargando(true)
      const datos = await usuariosService.obtenerPorId(usuario.id)
      setFormData({
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

  const cargarBoletas = async () => {
    if (!usuario?.id) return

    try {
      setCargandoBoletas(true)
      const data = await boletasService.obtenerPorUsuario(usuario.id)
      setBoletas(data.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)))
    } catch (err) {
      console.error('Error al cargar boletas:', err)
      setErrorBoletas('Error al cargar el historial de compras')
    } finally {
      setCargandoBoletas(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' })
    }
    setMensaje({ tipo: '', texto: '' })
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!validarNombre(formData.nombre)) {
      nuevosErrores.nombre = 'Nombre inválido (mínimo 2 caracteres)'
    }

    if (!validarNombre(formData.apellido)) {
      nuevosErrores.apellido = 'Apellido inválido (mínimo 2 caracteres)'
    }

    if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'Email inválido'
    }

    if (formData.rut && !validarRut(formData.rut)) {
      nuevosErrores.rut = 'RUT inválido'
    }

    if (formData.telefono && !validarTelefono(formData.telefono)) {
      nuevosErrores.telefono = 'Teléfono inválido'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return
    if (!usuario?.id) {
      setMensaje({ tipo: 'danger', texto: 'Error: sesión no válida' })
      return
    }

    setGuardando(true)
    setMensaje({ tipo: '', texto: '' })

    try {
      await usuariosService.actualizarPerfil(usuario.id, {
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono || null,
        direccion: formData.direccion || null,
        comuna: formData.comuna || null
      })

      const usuarioActualizado = {
        ...usuario,
        nombre: formData.nombre
      }
      localStorage.setItem('usuario', JSON.stringify(usuarioActualizado))

      setMensaje({ tipo: 'success', texto: 'Perfil actualizado correctamente' })
      setModoEdicion(false)
    } catch (error) {
      const msg = error.response?.data?.mensaje || 'Error al actualizar el perfil'
      setMensaje({ tipo: 'danger', texto: msg })
    } finally {
      setGuardando(false)
    }
  }

  const cancelarEdicion = () => {
    setModoEdicion(false)
    setErrores({})
    cargarPerfil()
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

  // Funciones para subir comprobante
  const handleArchivoComprobante = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validar tipo de archivo
      const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
      if (!tiposPermitidos.includes(file.type)) {
        setErrorComprobante('Solo se permiten imágenes (JPG, PNG, WEBP) o PDF')
        return
      }
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorComprobante('El archivo no puede superar los 5MB')
        return
      }
      setArchivoComprobante(file)
      setErrorComprobante(null)
    }
  }

  const handleSubirComprobante = async () => {
    if (!archivoComprobante || !boletaSeleccionada) return

    setSubiendoComprobante(true)
    setErrorComprobante(null)

    try {
      await boletasService.subirComprobante(boletaSeleccionada.id, archivoComprobante)
      setMensaje({ tipo: 'success', texto: 'Comprobante subido correctamente. Tu pedido será revisado pronto.' })
      setArchivoComprobante(null)
      // Recargar boletas para actualizar el estado
      await cargarBoletas()
      // Actualizar la boleta seleccionada
      const boletasActualizadas = await boletasService.obtenerPorUsuario(usuario.id)
      const boletaActualizada = boletasActualizadas.find(b => b.id === boletaSeleccionada.id)
      if (boletaActualizada) {
        setBoletaSeleccionada(boletaActualizada)
      }
    } catch (error) {
      console.error('Error subiendo comprobante:', error)
      setErrorComprobante(error.response?.data?.mensaje || 'Error al subir el comprobante. Intenta de nuevo.')
    } finally {
      setSubiendoComprobante(false)
    }
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated()) {
    return null
  }

  if (cargando) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="row">
        {/* Panel lateral con info del usuario */}
        <div className="col-lg-3 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="position-relative d-inline-block mb-3">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center avatar-perfil-container"
                  style={{
                    width: '100px',
                    height: '100px',
                    cursor: 'pointer',
                    background: obtenerAvatarActual() ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2), inset 0 -2px 5px rgba(0,0,0,0.1)',
                    border: '3px solid #fff',
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
                    <span className="text-white fs-1 fw-bold">
                      {formData.nombre?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <small className="d-block text-muted mt-1">Click para cambiar</small>
              </div>

              {mostrarAvatares && (
                <div className="card mb-3 shadow">
                  <div className="card-body p-3">
                    <p className="small text-muted mb-3">Selecciona tu avatar:</p>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      {AVATARES_DISPONIBLES.map(avatar => (
                        <button
                          key={avatar.id}
                          onClick={() => seleccionarAvatar(avatar.id)}
                          className="btn p-0 position-relative"
                          style={{
                            width: '55px',
                            height: '55px',
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

              <h5 className="card-title mb-1">{formData.nombre} {formData.apellido}</h5>
              <p className="text-muted small mb-2">{formData.email}</p>
              <span className="badge bg-primary">{usuario?.rol?.replace('ROLE_', '') || 'Usuario'}</span>
            </div>

            {/* Tabs de navegación */}
            <div className="list-group list-group-flush">
              <button
                onClick={() => setTabActivo('perfil')}
                className={`list-group-item list-group-item-action ${tabActivo === 'perfil' ? 'active' : ''}`}
              >
                Mi Perfil
              </button>
              <button
                onClick={() => setTabActivo('compras')}
                className={`list-group-item list-group-item-action ${tabActivo === 'compras' ? 'active' : ''}`}
              >
                Mis Compras
                {boletas.length > 0 && (
                  <span className="badge bg-secondary ms-2">{boletas.length}</span>
                )}
              </button>
              <button
                onClick={logout}
                className="list-group-item list-group-item-action text-danger"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="col-lg-9">
          {/* TAB PERFIL */}
          {tabActivo === 'perfil' && (
            <>
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Información Personal</h5>
                  {!modoEdicion && (
                    <button
                      onClick={() => setModoEdicion(true)}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Editar
                    </button>
                  )}
                </div>
                <div className="card-body">
                  {mensaje.texto && (
                    <div className={`alert alert-${mensaje.tipo}`} role="alert">
                      {mensaje.texto}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                          disabled={!modoEdicion || guardando}
                        />
                        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Apellido</label>
                        <input
                          type="text"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleChange}
                          className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                          disabled={!modoEdicion || guardando}
                        />
                        {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          className="form-control"
                          disabled
                        />
                        <small className="text-muted">El email no se puede modificar</small>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">RUT</label>
                        <input
                          type="text"
                          name="rut"
                          value={formData.rut}
                          className="form-control"
                          disabled
                        />
                        <small className="text-muted">El RUT no se puede modificar</small>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Teléfono</label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder="+56912345678"
                          className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                          disabled={!modoEdicion || guardando}
                        />
                        {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Comuna</label>
                        <select
                          name="comuna"
                          value={formData.comuna}
                          onChange={handleChange}
                          className="form-select"
                          disabled={!modoEdicion || guardando}
                        >
                          <option value="">Selecciona tu comuna</option>
                          {comunas.map(comuna => (
                            <option key={comuna.nombre} value={comuna.nombre}>
                              {comuna.nombre}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label">Dirección</label>
                        <input
                          type="text"
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleChange}
                          placeholder="Calle, número, departamento"
                          className="form-control"
                          disabled={!modoEdicion || guardando}
                        />
                      </div>
                    </div>

                    {modoEdicion && (
                      <div className="mt-4 d-flex gap-2">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={guardando}
                        >
                          {guardando ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Guardando...
                            </>
                          ) : (
                            'Guardar Cambios'
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={cancelarEdicion}
                          className="btn btn-outline-secondary"
                          disabled={guardando}
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              <div className="card mt-4">
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
                {mostrarCambioPassword && (
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
                )}
                {!mostrarCambioPassword && (
                  <div className="card-body">
                    <p className="text-muted mb-0">
                      Tu contraseña está protegida. Haz clic en "Cambiar Contraseña" para actualizarla.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB MIS COMPRAS */}
          {tabActivo === 'compras' && (
            <>
              {cargandoBoletas ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-3 text-muted">Cargando historial...</p>
                </div>
              ) : errorBoletas ? (
                <div className="alert alert-danger text-center" role="alert">
                  {errorBoletas}
                  <div className="mt-2">
                    <button onClick={cargarBoletas} className="btn btn-primary btn-sm">
                      Reintentar
                    </button>
                  </div>
                </div>
              ) : boletas.length === 0 ? (
                <div className="card">
                  <div className="card-body text-center py-5">
                    <h4 className="text-muted mb-3">No tienes compras registradas</h4>
                    <p className="text-muted">Cuando realices tu primera compra, aparecerá aquí.</p>
                    <Link to="/productos" className="btn btn-primary">
                      Ver Productos
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-7">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Mis Pedidos ({boletas.length})</h5>
                      </div>
                      <div className="list-group list-group-flush" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        {boletas.map(boleta => (
                          <button
                            key={boleta.id}
                            onClick={() => setBoletaSeleccionada(boleta)}
                            className={`list-group-item list-group-item-action ${boletaSeleccionada?.id === boleta.id ? 'active' : ''}`}
                          >
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <strong>Pedido #{boleta.id}</strong>
                                <br />
                                <small className={boletaSeleccionada?.id === boleta.id ? '' : 'text-muted'}>
                                  {formatearFecha(boleta.fechaCreacion)}
                                </small>
                              </div>
                              <div className="text-end">
                                <span className={`badge bg-${getEstadoColor(boleta.estado)}`}>
                                  {boleta.estado}
                                </span>
                                <br />
                                <strong>${formatearPrecio(boleta.total)}</strong>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    {boletaSeleccionada ? (
                      <div className="card position-sticky" style={{ top: '20px' }}>
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Pedido #{boletaSeleccionada.id}</h5>
                          <button
                            className="btn-close"
                            onClick={() => setBoletaSeleccionada(null)}
                          ></button>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <span className={`badge bg-${getEstadoColor(boletaSeleccionada.estado)} mb-2`}>
                              {boletaSeleccionada.estado}
                            </span>
                            <p className="small text-muted mb-1">
                              <strong>Fecha:</strong> {formatearFecha(boletaSeleccionada.fechaCreacion)}
                            </p>
                            <p className="small text-muted mb-1">
                              <strong>Método de pago:</strong> {boletaSeleccionada.metodoPago}
                            </p>
                          </div>

                          <hr />

                          <h6>Productos</h6>
                          {boletaSeleccionada.detalles?.map((detalle, index) => (
                            <div key={index} className="d-flex justify-content-between small mb-2">
                              <span>
                                {detalle.productoNombre || `Producto #${detalle.productoId}`} x{detalle.cantidad}
                              </span>
                              <span>${formatearPrecio(detalle.subtotal)}</span>
                            </div>
                          ))}

                          <hr />

                          <div className="d-flex justify-content-between mb-1">
                            <span>Subtotal:</span>
                            <span>${formatearPrecio(boletaSeleccionada.subtotal)}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Envío:</span>
                            <span>${formatearPrecio(boletaSeleccionada.costoEnvio)}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <strong>Total:</strong>
                            <strong className="text-primary">${formatearPrecio(boletaSeleccionada.total)}</strong>
                          </div>

                          <hr />

                          <h6>Entrega</h6>
                          <p className="small mb-1">
                            <strong>Tipo:</strong>{' '}
                            <span className={`badge ${boletaSeleccionada.tipoEntrega === 'RETIRO' ? 'bg-info' : 'bg-primary'}`}>
                              {boletaSeleccionada.tipoEntrega === 'RETIRO' ? 'Retiro en tienda' : 'Delivery'}
                            </span>
                          </p>
                          {boletaSeleccionada.fechaEntrega && (
                            <p className="small mb-1">
                              <strong>Fecha entrega:</strong> {new Date(boletaSeleccionada.fechaEntrega).toLocaleDateString('es-CL')}
                            </p>
                          )}
                          {boletaSeleccionada.horarioEntrega && (
                            <p className="small mb-1">
                              <strong>Horario:</strong> {boletaSeleccionada.horarioEntrega.replace('H_', '').replace('_', ':00 - ') + ':00'}
                            </p>
                          )}
                          <p className="small mb-1">
                            <strong>Dirección:</strong> {boletaSeleccionada.direccionEntrega}
                          </p>
                          <p className="small mb-1">
                            <strong>Comuna:</strong> {boletaSeleccionada.comunaEntrega}
                          </p>
                          {boletaSeleccionada.notas && (
                            <p className="small mb-0">
                              <strong>Notas:</strong> {boletaSeleccionada.notas}
                            </p>
                          )}

                          {boletaSeleccionada.estado === 'PENDIENTE' && (
                            <div className="mt-3">
                              <hr />
                              <h6 className="text-warning">Pendiente de pago</h6>

                              {boletaSeleccionada.comprobanteUrl ? (
                                <div className="alert alert-info small mb-0">
                                  <strong>Comprobante enviado</strong><br />
                                  Tu comprobante está siendo revisado. Te notificaremos cuando sea confirmado.
                                  <div className="mt-2">
                                    <a
                                      href={boletasService.obtenerUrlComprobante(boletaSeleccionada.comprobanteUrl)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="btn btn-outline-primary btn-sm"
                                    >
                                      Ver comprobante
                                    </a>
                                  </div>
                                </div>
                              ) : (
                                <div className="card border-warning">
                                  <div className="card-body p-3">
                                    <p className="small text-muted mb-2">
                                      Sube tu comprobante de transferencia para confirmar tu pedido.
                                    </p>

                                    {errorComprobante && (
                                      <div className="alert alert-danger small py-2 mb-2">
                                        {errorComprobante}
                                      </div>
                                    )}

                                    <div className="mb-2">
                                      <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={handleArchivoComprobante}
                                        className="form-control form-control-sm"
                                        disabled={subiendoComprobante}
                                      />
                                      <small className="text-muted">JPG, PNG, WEBP o PDF (máx. 5MB)</small>
                                    </div>

                                    {archivoComprobante && (
                                      <div className="d-flex align-items-center gap-2 mb-2">
                                        <span className="badge bg-secondary">{archivoComprobante.name}</span>
                                        <button
                                          type="button"
                                          className="btn btn-link btn-sm text-danger p-0"
                                          onClick={() => setArchivoComprobante(null)}
                                        >
                                          Quitar
                                        </button>
                                      </div>
                                    )}

                                    <button
                                      onClick={handleSubirComprobante}
                                      disabled={!archivoComprobante || subiendoComprobante}
                                      className="btn btn-warning btn-sm w-100"
                                    >
                                      {subiendoComprobante ? (
                                        <>
                                          <span className="spinner-border spinner-border-sm me-2"></span>
                                          Subiendo...
                                        </>
                                      ) : (
                                        'Subir Comprobante'
                                      )}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="card">
                        <div className="card-body text-center text-muted py-5">
                          <p className="mb-0">Selecciona un pedido para ver los detalles</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PerfilContenido
