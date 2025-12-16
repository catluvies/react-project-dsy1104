import { useState, useEffect } from 'react'
import { variantesService } from '../api/variantesService'
import { formatearPrecio } from '../utils/formateo'

function AdminVariantes({ producto, onClose }) {
  const [variantes, setVariantes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)

  const [modalVariante, setModalVariante] = useState(false)
  const [varianteEditando, setVarianteEditando] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    porciones: '',
    precio: '',
    stock: '',
    activo: true
  })
  const [erroresForm, setErroresForm] = useState({})

  useEffect(() => {
    cargarVariantes()
  }, [producto.id])

  const cargarVariantes = async () => {
    try {
      setCargando(true)
      const data = await variantesService.obtenerPorProducto(producto.id)
      setVariantes(data)
    } catch (err) {
      console.error('Error cargando variantes:', err)
      setError('Error al cargar las variantes')
    } finally {
      setCargando(false)
    }
  }

  const abrirModalNuevo = () => {
    setVarianteEditando(null)
    setFormData({
      nombre: '',
      porciones: '',
      precio: '',
      stock: '',
      activo: true
    })
    setErroresForm({})
    setModalVariante(true)
  }

  const abrirModalEditar = (variante) => {
    setVarianteEditando(variante)
    setFormData({
      nombre: variante.nombre || '',
      porciones: variante.porciones?.toString() || '',
      precio: variante.precio?.toString() || '',
      stock: variante.stock?.toString() || '',
      activo: variante.activo !== false
    })
    setErroresForm({})
    setModalVariante(true)
  }

  const cerrarModalVariante = () => {
    setModalVariante(false)
    setVarianteEditando(null)
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Función para limpiar precio (quitar puntos de miles)
  const limpiarPrecio = (precio) => {
    if (!precio) return ''
    return precio.toString().replace(/\./g, '')
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formData.nombre || formData.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre es requerido'
    }

    if (!formData.porciones || isNaN(formData.porciones) || Number(formData.porciones) <= 0) {
      nuevosErrores.porciones = 'Las porciones deben ser mayor a 0'
    }

    const precioLimpio = limpiarPrecio(formData.precio)
    if (!precioLimpio || isNaN(precioLimpio) || Number(precioLimpio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0'
    }

    if (formData.stock === '' || isNaN(formData.stock) || Number(formData.stock) < 0) {
      nuevosErrores.stock = 'El stock debe ser 0 o mayor'
    }

    setErroresForm(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    setGuardando(true)
    try {
      const varianteData = {
        nombre: formData.nombre.trim(),
        porciones: Number(formData.porciones),
        precio: Number(limpiarPrecio(formData.precio)),
        stock: Number(formData.stock),
        activo: formData.activo
      }

      if (varianteEditando) {
        await variantesService.actualizar(varianteEditando.id, varianteData)
      } else {
        await variantesService.crear(producto.id, varianteData)
      }

      cerrarModalVariante()
      await cargarVariantes()
    } catch (err) {
      console.error('Error guardando variante:', err)
      setErroresForm({ general: err.response?.data?.mensaje || 'Error al guardar' })
    } finally {
      setGuardando(false)
    }
  }

  const handleEliminar = async (variante) => {
    if (!confirm(`¿Eliminar variante "${variante.nombre}"?`)) return

    try {
      await variantesService.eliminar(variante.id)
      await cargarVariantes()
    } catch (err) {
      console.error('Error eliminando variante:', err)
      alert('Error al eliminar la variante')
    }
  }

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Variantes/Tamaños - {producto.nombre}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="alert alert-info">
              <strong>Variantes de tamaño:</strong> Permite vender el mismo producto en diferentes tamaños con diferentes precios.
              <br />
              <small>Ejemplo: "Para 15 personas" - $15.000, "Para 30 personas" - $25.000</small>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">
                {variantes.length} variante{variantes.length !== 1 ? 's' : ''} registrada{variantes.length !== 1 ? 's' : ''}
              </span>
              <button onClick={abrirModalNuevo} className="btn btn-primary btn-sm">
                + Nueva Variante
              </button>
            </div>

            {cargando ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : variantes.length === 0 ? (
              <div className="text-center py-4 text-muted">
                <p>Este producto no tiene variantes de tamaño.</p>
                <p className="small">
                  Si agregas variantes, los clientes deberán seleccionar un tamaño antes de comprar.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead className="table-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Porciones</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variantes.map(variante => (
                      <tr key={variante.id}>
                        <td><strong>{variante.nombre}</strong></td>
                        <td>{variante.porciones}</td>
                        <td>${formatearPrecio(variante.precio)}</td>
                        <td>
                          <span className={`badge ${variante.stock === 0 ? 'bg-danger' : variante.stock < 5 ? 'bg-warning' : 'bg-success'}`}>
                            {variante.stock}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${variante.activo ? 'bg-success' : 'bg-secondary'}`}>
                            {variante.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => abrirModalEditar(variante)}
                            className="btn btn-outline-primary btn-sm me-1"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleEliminar(variante)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {/* Modal para crear/editar variante */}
      {modalVariante && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1060 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {varianteEditando ? 'Editar Variante' : 'Nueva Variante'}
                </h5>
                <button type="button" className="btn-close" onClick={cerrarModalVariante}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {erroresForm.general && (
                    <div className="alert alert-danger">{erroresForm.general}</div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Nombre de la variante *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleFormChange}
                      className={`form-control ${erroresForm.nombre ? 'is-invalid' : ''}`}
                      placeholder="Ej: Para 15 personas"
                      disabled={guardando}
                    />
                    {erroresForm.nombre && <div className="invalid-feedback">{erroresForm.nombre}</div>}
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Porciones *</label>
                      <input
                        type="number"
                        name="porciones"
                        value={formData.porciones}
                        onChange={handleFormChange}
                        className={`form-control ${erroresForm.porciones ? 'is-invalid' : ''}`}
                        placeholder="15"
                        min="1"
                        disabled={guardando}
                      />
                      {erroresForm.porciones && <div className="invalid-feedback">{erroresForm.porciones}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Precio *</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          name="precio"
                          value={formData.precio}
                          onChange={handleFormChange}
                          className={`form-control ${erroresForm.precio ? 'is-invalid' : ''}`}
                          placeholder="15000"
                          disabled={guardando}
                        />
                        {erroresForm.precio && <div className="invalid-feedback">{erroresForm.precio}</div>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Stock *</label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleFormChange}
                        className={`form-control ${erroresForm.stock ? 'is-invalid' : ''}`}
                        placeholder="10"
                        min="0"
                        disabled={guardando}
                      />
                      {erroresForm.stock && <div className="invalid-feedback">{erroresForm.stock}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Estado</label>
                      <div className="form-check mt-2">
                        <input
                          type="checkbox"
                          name="activo"
                          checked={formData.activo}
                          onChange={handleFormChange}
                          className="form-check-input"
                          id="varianteActivo"
                          disabled={guardando}
                        />
                        <label className="form-check-label" htmlFor="varianteActivo">
                          Variante activa
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cerrarModalVariante} disabled={guardando}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={guardando}>
                    {guardando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Guardando...
                      </>
                    ) : (
                      varianteEditando ? 'Guardar Cambios' : 'Crear Variante'
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

export default AdminVariantes
