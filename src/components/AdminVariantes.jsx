import { useState, useEffect } from 'react'
import { variantesService } from '../api/variantesService'
import { formatearPrecio } from '../utils/formateo'

// Opciones de unidad de medida
const UNIDADES_MEDIDA = [
  { value: 'PORCION', label: 'Porciones (personas)', placeholder: '12', ejemplo: 'Para 12 personas' },
  { value: 'ML', label: 'Mililitros (ml)', placeholder: '750', ejemplo: '750ml' },
  { value: 'L', label: 'Litros (L)', placeholder: '1', ejemplo: '1L' },
  { value: 'G', label: 'Gramos (g)', placeholder: '250', ejemplo: '250g' },
  { value: 'KG', label: 'Kilogramos (kg)', placeholder: '1', ejemplo: '1kg' },
  { value: 'UNIDAD', label: 'Unidades', placeholder: '6', ejemplo: '6 unidades' }
]

function AdminVariantes({ producto, onClose }) {
  const [variantes, setVariantes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)

  const [modalVariante, setModalVariante] = useState(false)
  const [varianteEditando, setVarianteEditando] = useState(null)
  const [formData, setFormData] = useState({
    cantidad: '',
    unidadMedida: 'PORCION',
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
      cantidad: '',
      unidadMedida: 'PORCION',
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
      cantidad: variante.cantidad?.toString() || '',
      unidadMedida: variante.unidadMedida || 'PORCION',
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

  // Generar preview del nombre basado en cantidad y unidad
  const generarPreviewNombre = () => {
    const cantidad = Number(formData.cantidad)
    if (!cantidad || cantidad <= 0) return ''

    switch (formData.unidadMedida) {
      case 'PORCION':
        return `Para ${cantidad} personas`
      case 'ML':
        return `${cantidad}ml`
      case 'L':
        return `${cantidad}L`
      case 'G':
        return `${cantidad}g`
      case 'KG':
        return `${cantidad}kg`
      case 'UNIDAD':
        return `${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'}`
      default:
        return `${cantidad}`
    }
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formData.cantidad || isNaN(formData.cantidad) || Number(formData.cantidad) <= 0) {
      nuevosErrores.cantidad = 'La cantidad debe ser mayor a 0'
    }

    if (!formData.unidadMedida) {
      nuevosErrores.unidadMedida = 'Debe seleccionar una unidad de medida'
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
        cantidad: Number(formData.cantidad),
        unidadMedida: formData.unidadMedida,
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
    const nombreMostrar = variante.nombreDisplay || `${variante.cantidad} ${variante.unidadMedida}`
    if (!confirm(`¿Eliminar variante "${nombreMostrar}"?`)) return

    try {
      await variantesService.eliminar(variante.id)
      await cargarVariantes()
    } catch (err) {
      console.error('Error eliminando variante:', err)
      alert('Error al eliminar la variante')
    }
  }

  const unidadSeleccionada = UNIDADES_MEDIDA.find(u => u.value === formData.unidadMedida)

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Tamaños - {producto.nombre}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="alert alert-info">
              <strong>Tamaños del producto:</strong> Define las variantes de tamaño con su precio.
              <br />
              <small>El nombre se genera automáticamente según la cantidad y unidad de medida.</small>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">
                {variantes.length} tamaño{variantes.length !== 1 ? 's' : ''} registrado{variantes.length !== 1 ? 's' : ''}
              </span>
              <button onClick={abrirModalNuevo} className="btn btn-primary btn-sm">
                + Nuevo Tamaño
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
                      <th>Tamaño</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variantes.map(variante => (
                      <tr key={variante.id}>
                        <td><strong>{variante.nombreDisplay || variante.nombre}</strong></td>
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
                  {varianteEditando ? 'Editar Tamaño' : 'Nuevo Tamaño'}
                </h5>
                <button type="button" className="btn-close" onClick={cerrarModalVariante}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {erroresForm.general && (
                    <div className="alert alert-danger">{erroresForm.general}</div>
                  )}

                  {/* Preview del nombre generado */}
                  {formData.cantidad && Number(formData.cantidad) > 0 && (
                    <div className="alert alert-light border mb-3">
                      <small className="text-muted">Se mostrará como:</small>
                      <div className="fw-bold text-primary fs-5">{generarPreviewNombre()}</div>
                    </div>
                  )}

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Unidad de medida *</label>
                      <select
                        name="unidadMedida"
                        value={formData.unidadMedida}
                        onChange={handleFormChange}
                        className={`form-select ${erroresForm.unidadMedida ? 'is-invalid' : ''}`}
                        disabled={guardando}
                      >
                        {UNIDADES_MEDIDA.map(unidad => (
                          <option key={unidad.value} value={unidad.value}>
                            {unidad.label}
                          </option>
                        ))}
                      </select>
                      {erroresForm.unidadMedida && <div className="invalid-feedback">{erroresForm.unidadMedida}</div>}
                      {unidadSeleccionada && (
                        <small className="text-muted">Ejemplo: {unidadSeleccionada.ejemplo}</small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Cantidad *</label>
                      <input
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleFormChange}
                        className={`form-control ${erroresForm.cantidad ? 'is-invalid' : ''}`}
                        placeholder={unidadSeleccionada?.placeholder || '12'}
                        min="1"
                        disabled={guardando}
                      />
                      {erroresForm.cantidad && <div className="invalid-feedback">{erroresForm.cantidad}</div>}
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

                    <div className="col-12">
                      <div className="form-check">
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
                      varianteEditando ? 'Guardar Cambios' : 'Crear Tamaño'
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
