import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { categoriasService } from '../api/categoriasService'
import { productosService } from '../api/productosService'

function AdminCategorias() {
  const { isAdmin, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const [modalAbierto, setModalAbierto] = useState(false)
  const [categoriaEditando, setCategoriaEditando] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [erroresForm, setErroresForm] = useState({})

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    activa: true
  })
  const [imagenArchivo, setImagenArchivo] = useState(null)
  const [imagenPreview, setImagenPreview] = useState(null)

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      navigate('/')
      return
    }
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const [categoriasData, productosData] = await Promise.all([
        categoriasService.obtenerTodas(),
        productosService.obtenerTodos()
      ])
      setCategorias(categoriasData)
      setProductos(productosData)
    } catch (err) {
      console.error('Error cargando datos:', err)
      setError('Error al cargar las categorías')
    } finally {
      setCargando(false)
    }
  }

  const contarProductos = (categoriaId) => {
    return productos.filter(p => p.categoriaId === categoriaId).length
  }

  const abrirModalNuevo = () => {
    setCategoriaEditando(null)
    setFormData({
      nombre: '',
      descripcion: '',
      activa: true
    })
    setImagenArchivo(null)
    setImagenPreview(null)
    setErroresForm({})
    setModalAbierto(true)
  }

  const abrirModalEditar = (categoria) => {
    setCategoriaEditando(categoria)
    setFormData({
      nombre: categoria.nombre || '',
      descripcion: categoria.descripcion || '',
      activa: categoria.activa !== false
    })
    setImagenArchivo(null)
    setImagenPreview(categoria.imagenUrl ? categoriasService.obtenerUrlImagen(categoria.imagenUrl) : null)
    setErroresForm({})
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setCategoriaEditando(null)
    setImagenArchivo(null)
    setImagenPreview(null)
    setErroresForm({})
  }

  const handleImagenChange = (e) => {
    const archivo = e.target.files[0]
    if (archivo) {
      setImagenArchivo(archivo)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagenPreview(reader.result)
      }
      reader.readAsDataURL(archivo)
    }
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    if (erroresForm[name]) {
      setErroresForm({ ...erroresForm, [name]: '' })
    }
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formData.nombre || formData.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre es requerido (mínimo 2 caracteres)'
    }

    setErroresForm(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    setGuardando(true)
    try {
      const categoriaData = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion?.trim() || null,
        activa: formData.activa
      }

      if (categoriaEditando) {
        await categoriasService.actualizar(categoriaEditando.id, categoriaData, imagenArchivo)
      } else {
        await categoriasService.crear(categoriaData, imagenArchivo)
      }

      cerrarModal()
      await cargarDatos()
    } catch (err) {
      console.error('Error guardando categoría:', err)
      const msg = err.response?.data?.mensaje || 'Error al guardar la categoría'
      setErroresForm({ general: msg })
    } finally {
      setGuardando(false)
    }
  }

  const handleEliminar = async (categoria) => {
    const cantidadProductos = contarProductos(categoria.id)

    if (cantidadProductos > 0) {
      alert(`No se puede eliminar la categoría "${categoria.nombre}" porque tiene ${cantidadProductos} productos asociados.`)
      return
    }

    if (!confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`)) return

    try {
      await categoriasService.eliminar(categoria.id)
      await cargarDatos()
    } catch (err) {
      console.error('Error eliminando categoría:', err)
      alert('Error al eliminar la categoría')
    }
  }

  if (cargando) {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Gestión de Categorías</h1>
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
        <h1 className="mb-4">Gestión de Categorías</h1>
        <div className="alert alert-danger">{error}</div>
        <button onClick={cargarDatos} className="btn btn-primary">Reintentar</button>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Gestión de Categorías</h1>
        <button onClick={abrirModalNuevo} className="btn btn-primary">
          + Nueva Categoría
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body py-2">
              <h5 className="mb-0">{categorias.length}</h5>
              <small className="text-muted">Total Categorías</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body py-2">
              <h5 className="mb-0">{categorias.filter(c => c.activa).length}</h5>
              <small className="text-success">Activas</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body py-2">
              <h5 className="mb-0">{categorias.filter(c => !c.activa).length}</h5>
              <small className="text-secondary">Inactivas</small>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Productos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(categoria => {
              const cantidadProductos = contarProductos(categoria.id)

              return (
                <tr key={categoria.id}>
                  <td><strong>{categoria.nombre}</strong></td>
                  <td className="text-muted">{categoria.descripcion || '-'}</td>
                  <td>
                    <span className="badge bg-primary">{cantidadProductos}</span>
                  </td>
                  <td>
                    <span className={`badge ${categoria.activa ? 'bg-success' : 'bg-secondary'}`}>
                      {categoria.activa ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => abrirModalEditar(categoria)}
                      className="btn btn-outline-primary btn-sm me-1"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(categoria)}
                      className="btn btn-outline-danger btn-sm"
                      disabled={cantidadProductos > 0}
                      title={cantidadProductos > 0 ? 'No se puede eliminar una categoría con productos' : ''}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {categorias.length === 0 && (
        <div className="alert alert-info text-center">
          No hay categorías registradas
        </div>
      )}

      {modalAbierto && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}
                </h5>
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
                    <label className="form-label">Descripción</label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleFormChange}
                      className="form-control"
                      rows="3"
                      disabled={guardando}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Imagen (opcional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImagenChange}
                      className="form-control"
                      disabled={guardando}
                    />
                    {imagenPreview && (
                      <div className="mt-2">
                        <img
                          src={imagenPreview}
                          alt="Preview"
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                        {categoriaEditando && !imagenArchivo && (
                          <small className="d-block text-muted mt-1">Imagen actual (selecciona otra para cambiarla)</small>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="activa"
                      checked={formData.activa}
                      onChange={handleFormChange}
                      className="form-check-input"
                      id="activaCheck"
                      disabled={guardando}
                    />
                    <label className="form-check-label" htmlFor="activaCheck">
                      Categoría activa
                    </label>
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
                        Guardando...
                      </>
                    ) : (
                      categoriaEditando ? 'Guardar Cambios' : 'Crear Categoría'
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

export default AdminCategorias
