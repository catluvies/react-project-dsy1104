import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { usuariosService, ROLES, getRolLabel } from '../api/usuariosService'
import { validarNombre, validarEmail, validarRut, validarTelefono } from '../utils/validaciones'

function AdminUsuarios() {
  const { isAdmin, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const [filtroRol, setFiltroRol] = useState('todos')
  const [busqueda, setBusqueda] = useState('')

  const [modalAbierto, setModalAbierto] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [erroresForm, setErroresForm] = useState({})

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
    setFormData({ ...formData, [name]: value })
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
      nuevosErrores.rut = 'RUT inválido'
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
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>
                  <strong>{usuario.nombre} {usuario.apellido}</strong>
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
                    />
                    {erroresForm.rut && <div className="invalid-feedback">{erroresForm.rut}</div>}
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
    </div>
  )
}

export default AdminUsuarios
