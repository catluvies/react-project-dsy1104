import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { usuariosService } from '../api/usuariosService'
import { obtenerComunas } from '../data/comunas'
import { validarNombre, validarEmail, validarTelefono, validarRut } from '../utils/validaciones'

const AVATARES_DISPONIBLES = [
  { id: 'cake', emoji: '🎂', nombre: 'Pastel' },
  { id: 'cupcake', emoji: '🧁', nombre: 'Cupcake' },
  { id: 'cookie', emoji: '🍪', nombre: 'Galleta' },
  { id: 'donut', emoji: '🍩', nombre: 'Donut' },
  { id: 'ice-cream', emoji: '🍦', nombre: 'Helado' },
  { id: 'candy', emoji: '🍬', nombre: 'Caramelo' },
  { id: 'chocolate', emoji: '🍫', nombre: 'Chocolate' },
  { id: 'strawberry', emoji: '🍓', nombre: 'Fresa' },
  { id: 'cherry', emoji: '🍒', nombre: 'Cereza' },
  { id: 'heart', emoji: '💖', nombre: 'Corazon' },
  { id: 'star', emoji: '⭐', nombre: 'Estrella' },
  { id: 'chef', emoji: '👨‍🍳', nombre: 'Chef' }
]

function PerfilContenido() {
  const { usuario, isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()

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

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }
    cargarPerfil()
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

  const seleccionarAvatar = (avatarId) => {
    setAvatarSeleccionado(avatarId)
    localStorage.setItem(`avatar_${usuario?.id}`, avatarId)
    setMostrarAvatares(false)
    setMensaje({ tipo: 'success', texto: 'Avatar actualizado' })
  }

  const obtenerAvatarActual = () => {
    if (avatarSeleccionado) {
      const avatar = AVATARES_DISPONIBLES.find(a => a.id === avatarSeleccionado)
      if (avatar) return avatar.emoji
    }
    return formData.nombre?.charAt(0)?.toUpperCase() || 'U'
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
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="position-relative d-inline-block mb-3">
                <div
                  className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center"
                  style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                  onClick={() => setMostrarAvatares(!mostrarAvatares)}
                  title="Cambiar avatar"
                >
                  <span className={avatarSeleccionado ? 'fs-1' : 'text-white fs-1'}>
                    {obtenerAvatarActual()}
                  </span>
                </div>
                <button
                  className="btn btn-sm btn-outline-secondary position-absolute"
                  style={{ bottom: '0', right: '-10px', borderRadius: '50%', padding: '2px 6px' }}
                  onClick={() => setMostrarAvatares(!mostrarAvatares)}
                  title="Cambiar avatar"
                >
                  ✏️
                </button>
              </div>

              {mostrarAvatares && (
                <div className="card mb-3">
                  <div className="card-body p-2">
                    <p className="small text-muted mb-2">Selecciona tu avatar:</p>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      {AVATARES_DISPONIBLES.map(avatar => (
                        <button
                          key={avatar.id}
                          onClick={() => seleccionarAvatar(avatar.id)}
                          className={`btn btn-sm ${avatarSeleccionado === avatar.id ? 'btn-primary' : 'btn-outline-secondary'}`}
                          style={{ fontSize: '1.5rem', padding: '4px 8px' }}
                          title={avatar.nombre}
                        >
                          {avatar.emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <h4 className="card-title">{formData.nombre} {formData.apellido}</h4>
              <p className="text-muted">{formData.email}</p>
              <span className="badge bg-primary">{usuario?.rol?.replace('ROLE_', '') || 'Usuario'}</span>
            </div>
            <div className="list-group list-group-flush">
              <Link to="/mis-compras" className="list-group-item list-group-item-action">
                Mis Compras
              </Link>
              <button
                onClick={logout}
                className="list-group-item list-group-item-action text-danger"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
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
        </div>
      </div>
    </div>
  )
}

export default PerfilContenido
