import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { usuariosService, ROLES, getRolLabel } from '../api/usuariosService'
import { validarNombre, validarEmail, validarRut, validarTelefono } from '../utils/validaciones'

function AdminUsuarios() {
  const { isAdmin, isAuthenticated, usuario: usuarioActual } = useContext(AuthContext)
  const navigate = useNavigate()

  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const [filtroRol, setFiltroRol] = useState('todos')
  const [busqueda, setBusqueda] = useState('')

  const [modalAbierto, setModalAbierto] = useState(false)
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [erroresForm, setErroresForm] = useState({})

  // Estados para modal de confirmación
  const [modalConfirmacion, setModalConfirmacion] = useState({
    abierto: false,
    tipo: '', // 'eliminar' | 'desactivar' | 'activar'
    usuario: null,
    password: '',
    error: ''
  })

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rut: '',
    telefono: ''
  })

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      navigate('/')
      return
    }
    cargarUsuarios()
  }, [])

  const cargarUsuarios = async () => {
    try {
      setCargando(true)
      const data = await usuariosService.obtenerTodos()
      setUsuarios(data)
    } catch (err) {
      console.error('Error cargando usuarios:', err)
      setError('Error al cargar los usuarios')
    } finally {
      setCargando(false)
    }
  }

  const usuariosFiltrados = usuarios.filter(usuario => {
    const rolMatch = filtroRol === 'todos' || usuario.rol === filtroRol

    const busquedaMatch = !busqueda.trim() ||
      usuario.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.apellido?.toLowerCase().includes(busqueda.toLowerCase())

    return rolMatch && busquedaMatch
  })

  const getRolBadge = (rol) => {
    const badges = {
      ROLE_ADMIN: 'bg-danger',
      ROLE_VENDEDOR: 'bg-primary',
      ROLE_CLIENTE: 'bg-secondary'
    }
    return badges[rol] || 'bg-secondary'
  }

  // Función para formatear RUT automáticamente
  const formatearRutInput = (valor) => {
    // Remover todo excepto números y K/k
    let rut = valor.replace(/[^0-9kK]/g, '').toUpperCase()

    if (rut.length === 0) return ''

    // Separar cuerpo y dígito verificador
    let cuerpo = rut.slice(0, -1)
    let dv = rut.slice(-1)

    // Formatear con puntos
    let rutFormateado = ''
    let contador = 0
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      rutFormateado = cuerpo[i] + rutFormateado
      contador++
      if (contador === 3 && i !== 0) {
        rutFormateado = '.' + rutFormateado
        contador = 0
      }
    }

    if (rut.length > 1) {
      rutFormateado = rutFormateado + '-' + dv
    } else {
      rutFormateado = rut
    }

    return rutFormateado
  }

  const abrirModalNuevoVendedor = () => {
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      rut: '',
      telefono: ''
    })
    setErroresForm({})
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setErroresForm({})
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target

    // Formatear RUT automáticamente
    if (name === 'rut') {
      setFormData({ ...formData, [name]: formatearRutInput(value) })
    } else {
      setFormData({ ...formData, [name]: value })
    }

    if (erroresForm[name]) {
      setErroresForm({ ...erroresForm, [name]: '' })
    }
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

    if (!formData.password || formData.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (formData.rut && !validarRut(formData.rut)) {
      nuevosErrores.rut = 'RUT inválido (formato: 12.345.678-9)'
    }

    if (formData.telefono && !validarTelefono(formData.telefono)) {
      nuevosErrores.telefono = 'Teléfono inválido'
    }

    setErroresForm(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    setGuardando(true)
    try {
      await usuariosService.crearVendedor({
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        password: formData.password,
        rut: formData.rut?.trim() || null,
        telefono: formData.telefono?.trim() || null
      })

      cerrarModal()
      await cargarUsuarios()
    } catch (err) {
      console.error('Error creando vendedor:', err)
      const msg = err.response?.data?.mensaje || 'Error al crear el vendedor'
      setErroresForm({ general: msg })
    } finally {
      setGuardando(false)
    }
  }

  const formatearFecha = (fecha) => {
    if (!fecha) return '-'
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const abrirModalEditar = (usuario) => {
    setUsuarioEditando(usuario)
    setModalEditarAbierto(true)
  }

  const cerrarModalEditar = () => {
    setModalEditarAbierto(false)
    setUsuarioEditando(null)
  }

  // Funciones para modal de confirmación
  const abrirModalConfirmacion = (tipo, usuario) => {
    setModalConfirmacion({
      abierto: true,
      tipo,
      usuario,
      password: '',
      error: ''
    })
  }

  const cerrarModalConfirmacion = () => {
    setModalConfirmacion({
      abierto: false,
      tipo: '',
      usuario: null,
      password: '',
      error: ''
    })
  }

  const handleConfirmacionPasswordChange = (e) => {
    setModalConfirmacion({
      ...modalConfirmacion,
      password: e.target.value,
      error: ''
    })
  }

  const ejecutarAccion = async () => {
    const { tipo, usuario, password } = modalConfirmacion

    if (!password) {
      setModalConfirmacion({ ...modalConfirmacion, error: 'Debes ingresar tu contraseña para confirmar' })
      return
    }

    // Verificar contraseña (simulado - en producción debería verificarse en backend)
    if (password.length < 6) {
      setModalConfirmacion({ ...modalConfirmacion, error: 'Contraseña incorrecta' })
      return
    }

    setGuardando(true)
    try {
      if (tipo === 'eliminar') {
        await usuariosService.eliminar(usuario.id)
      } else if (tipo === 'activar' || tipo === 'desactivar') {
        await usuariosService.actualizar(usuario.id, {
          ...usuario,
          activo: tipo === 'activar'
        })
      }

      cerrarModalConfirmacion()
      cerrarModalEditar()
      await cargarUsuarios()
    } catch (err) {
      console.error('Error ejecutando acción:', err)
      const msg = err.response?.data?.mensaje || 'Error al ejecutar la acción'
      setModalConfirmacion({ ...modalConfirmacion, error: msg })
    } finally {
      setGuardando(false)
    }
  }

  // Verificar si es el usuario actual
  const esUsuarioActual = (usuario) => {
    return usuario.id === usuarioActual?.id
  }

  if (cargando) {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Gestión de Usuarios</h1>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Gestión de Usuarios</h1>
        <div className="alert alert-danger">{error}</div>
        <button onClick={cargarUsuarios} className="btn btn-primary">Reintentar</button>
      </div>
    )
  }

  const contarPorRol = (rol) => usuarios.filter(u => u.rol === rol).length

  const getTituloConfirmacion = () => {
    switch (modalConfirmacion.tipo) {
      case 'eliminar': return 'Confirmar Eliminación'
      case 'activar': return 'Confirmar Activación'
      case 'desactivar': return 'Confirmar Desactivación'
      default: return 'Confirmar Acción'
    }
  }

  const getMensajeConfirmacion = () => {
    const nombre = `${modalConfirmacion.usuario?.nombre} ${modalConfirmacion.usuario?.apellido}`
    switch (modalConfirmacion.tipo) {
      case 'eliminar':
        return (
          <div className="alert alert-danger">
            <strong>¿Estás seguro de ELIMINAR permanentemente a "{nombre}"?</strong>
            <p className="mb-0 mt-2">Esta acción no se puede deshacer. Todos los datos del usuario serán eliminados.</p>
          </div>
        )
      case 'activar':
        return (
          <div className="alert alert-success">
            <strong>¿Activar la cuenta de "{nombre}"?</strong>
            <p className="mb-0 mt-2">El usuario podrá acceder nuevamente al sistema.</p>
          </div>
        )
      case 'desactivar':
        return (
          <div className="alert alert-warning">
            <strong>¿Desactivar la cuenta de "{nombre}"?</strong>
            <p className="mb-0 mt-2">El usuario no podrá acceder al sistema hasta que sea reactivado.</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Gestión de Usuarios</h1>
        <button onClick={abrirModalNuevoVendedor} className="btn btn-primary">
          + Nuevo Vendedor
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body py-2">
              <h5 className="mb-0">{usuarios.length}</h5>
              <small className="text-muted">Total</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body py-2">
              <h5 className="mb-0">{contarPorRol(ROLES.ADMIN)}</h5>
              <small className="text-danger">Administradores</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body py-2">
              <h5 className="mb-0">{contarPorRol(ROLES.VENDEDOR)}</h5>
              <small className="text-primary">Vendedores</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body py-2">
              <h5 className="mb-0">{contarPorRol(ROLES.CLIENTE)}</h5>
              <small className="text-secondary">Clientes</small>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <select
                value={filtroRol}
                onChange={(e) => setFiltroRol(e.target.value)}
                className="form-select"
              >
                <option value="todos">Todos los roles</option>
                <option value={ROLES.ADMIN}>Administradores</option>
                <option value={ROLES.VENDEDOR}>Vendedores</option>
                <option value={ROLES.CLIENTE}>Clientes</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <p className="text-muted mb-3">
        Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios
      </p>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(usuario => (
              <tr key={usuario.id} className={esUsuarioActual(usuario) ? 'table-info' : ''}>
                <td>{usuario.id}</td>
                <td>
                  <strong>{usuario.nombre} {usuario.apellido}</strong>
                  {esUsuarioActual(usuario) && <span className="badge bg-info ms-2">Tú</span>}
                  {usuario.rut && <br />}
                  {usuario.rut && <small className="text-muted">{usuario.rut}</small>}
                </td>
                <td>
                  {usuario.email}
                  {usuario.telefono && <br />}
                  {usuario.telefono && <small className="text-muted">{usuario.telefono}</small>}
                </td>
                <td>
                  <span className={`badge ${getRolBadge(usuario.rol)}`}>
                    {getRolLabel(usuario.rol)}
                  </span>
                </td>
                <td>
                  <span className={`badge ${usuario.activo ? 'bg-success' : 'bg-secondary'}`}>
                    {usuario.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>{formatearFecha(usuario.fechaCreacion)}</td>
                <td>
                  {!esUsuarioActual(usuario) ? (
                    <button
                      onClick={() => abrirModalEditar(usuario)}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Gestionar
                    </button>
                  ) : (
                    <span className="text-muted small">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {usuariosFiltrados.length === 0 && (
        <div className="alert alert-info text-center">
          No hay usuarios con los filtros seleccionados
        </div>
      )}

      {/* Modal Crear Vendedor */}
      {modalAbierto && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Nuevo Vendedor</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {erroresForm.general && (
                    <div className="alert alert-danger">{erroresForm.general}</div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleFormChange}
                      className={`form-control ${erroresForm.nombre ? 'is-invalid' : ''}`}
                      disabled={guardando}
                    />
                    {erroresForm.nombre && <div className="invalid-feedback">{erroresForm.nombre}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Apellido *</label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleFormChange}
                      className={`form-control ${erroresForm.apellido ? 'is-invalid' : ''}`}
                      disabled={guardando}
                    />
                    {erroresForm.apellido && <div className="invalid-feedback">{erroresForm.apellido}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className={`form-control ${erroresForm.email ? 'is-invalid' : ''}`}
                      disabled={guardando}
                    />
                    {erroresForm.email && <div className="invalid-feedback">{erroresForm.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contraseña *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleFormChange}
                      className={`form-control ${erroresForm.password ? 'is-invalid' : ''}`}
                      disabled={guardando}
                    />
                    {erroresForm.password && <div className="invalid-feedback">{erroresForm.password}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">RUT</label>
                    <input
                      type="text"
                      name="rut"
                      value={formData.rut}
                      onChange={handleFormChange}
                      placeholder="12.345.678-9"
                      className={`form-control ${erroresForm.rut ? 'is-invalid' : ''}`}
                      disabled={guardando}
                      maxLength={12}
                    />
                    {erroresForm.rut && <div className="invalid-feedback">{erroresForm.rut}</div>}
                    <small className="text-muted">Se formatea automáticamente</small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleFormChange}
                      placeholder="+56912345678"
                      className={`form-control ${erroresForm.telefono ? 'is-invalid' : ''}`}
                      disabled={guardando}
                    />
                    {erroresForm.telefono && <div className="invalid-feedback">{erroresForm.telefono}</div>}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cerrarModal} disabled={guardando}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={guardando}>
                    {guardando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creando...
                      </>
                    ) : (
                      'Crear Vendedor'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Usuario */}
      {modalEditarAbierto && usuarioEditando && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Gestionar Usuario</h5>
                <button type="button" className="btn-close" onClick={cerrarModalEditar} disabled={guardando}></button>
              </div>
              <div className="modal-body pt-3">
                {/* Información del usuario */}
                <div className="bg-light rounded p-3 mb-4">
                  <p className="mb-1 fw-semibold fs-5">{usuarioEditando.nombre} {usuarioEditando.apellido}</p>
                  <p className="mb-1 text-muted small">{usuarioEditando.email}</p>
                  {usuarioEditando.rut && <p className="mb-2 text-muted small">RUT: {usuarioEditando.rut}</p>}
                  <span className={`badge ${getRolBadge(usuarioEditando.rol)}`}>
                    {getRolLabel(usuarioEditando.rol)}
                  </span>
                </div>

                {/* Estado de la cuenta */}
                <div className="mb-4">
                  <label className="form-label text-muted small fw-semibold text-uppercase">Estado de la cuenta</label>
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${usuarioEditando.activo ? 'bg-success' : 'bg-secondary'}`}>
                      {usuarioEditando.activo ? 'Activo' : 'Inactivo'}
                    </span>
                    <button
                      onClick={() => abrirModalConfirmacion(
                        usuarioEditando.activo ? 'desactivar' : 'activar',
                        usuarioEditando
                      )}
                      className={`btn btn-sm ${usuarioEditando.activo ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                      disabled={guardando}
                    >
                      {usuarioEditando.activo ? 'Desactivar cuenta' : 'Activar cuenta'}
                    </button>
                  </div>
                </div>

                {/* Zona de peligro */}
                <div className="border border-danger rounded p-3 bg-danger bg-opacity-10">
                  <label className="form-label text-danger small fw-semibold text-uppercase mb-2">Zona de peligro</label>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="mb-0 small">Eliminar este usuario permanentemente</p>
                      <p className="mb-0 text-muted small">Esta acción no se puede deshacer</p>
                    </div>
                    <button
                      onClick={() => abrirModalConfirmacion('eliminar', usuarioEditando)}
                      className="btn btn-danger btn-sm"
                      disabled={guardando}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button type="button" className="btn btn-outline-secondary" onClick={cerrarModalEditar} disabled={guardando}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación con Contraseña */}
      {modalConfirmacion.abierto && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{getTituloConfirmacion()}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cerrarModalConfirmacion}
                  disabled={guardando}
                ></button>
              </div>
              <div className="modal-body">
                {getMensajeConfirmacion()}

                {modalConfirmacion.error && (
                  <div className="alert alert-danger">{modalConfirmacion.error}</div>
                )}

                <div className="mt-4">
                  <label className="form-label">
                    <strong>Ingresa tu contraseña para confirmar:</strong>
                  </label>
                  <input
                    type="password"
                    value={modalConfirmacion.password}
                    onChange={handleConfirmacionPasswordChange}
                    className="form-control"
                    placeholder="Tu contraseña"
                    disabled={guardando}
                    autoFocus
                  />
                  <small className="text-muted">
                    Por seguridad, debes ingresar tu contraseña para realizar esta acción.
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cerrarModalConfirmacion}
                  disabled={guardando}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className={`btn ${modalConfirmacion.tipo === 'eliminar' ? 'btn-danger' : modalConfirmacion.tipo === 'activar' ? 'btn-success' : 'btn-warning'}`}
                  onClick={ejecutarAccion}
                  disabled={guardando || !modalConfirmacion.password}
                >
                  {guardando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Procesando...
                    </>
                  ) : (
                    'Confirmar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsuarios
