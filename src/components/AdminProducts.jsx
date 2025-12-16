import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { productosService } from '../api/productosService'
import { categoriasService } from '../api/categoriasService'
import { formatearPrecio } from '../utils/formateo'
import AdminVariantes from './AdminVariantes'

function AdminProducts() {
  const { isAdmin, isVendedor, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [filtroStock, setFiltroStock] = useState('todos')
  const [busqueda, setBusqueda] = useState('')

  const [modalAbierto, setModalAbierto] = useState(false)
  const [productoEditando, setProductoEditando] = useState(null)
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null)
  const [previewImagen, setPreviewImagen] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [erroresForm, setErroresForm] = useState({})

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoriaId: '',
    activo: true,
    sku: '',
    ingredientes: '',
    cantidadMedida: '',
    unidadMedida: '',
    porciones: '',
    duracionDias: '',
    condicionConservacion: '',
    alergenos: ''
  })

  const [productoVariantes, setProductoVariantes] = useState(null)

  useEffect(() => {
    if (!isAuthenticated() || (!isAdmin() && !isVendedor())) {
      navigate('/')
      return
    }
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const [productosData, categoriasData] = await Promise.all([
        productosService.obtenerTodos(),
        categoriasService.obtenerTodas()
      ])
      setProductos(productosData)
      setCategorias(categoriasData)
    } catch (err) {
      console.error('Error cargando datos:', err)
      setError('Error al cargar los productos')
    } finally {
      setCargando(false)
    }
  }

  const productosFiltrados = productos.filter(producto => {
    const categoriaMatch = filtroCategoria === 'todas' ||
      producto.categoriaId?.toString() === filtroCategoria

    const stockMatch = filtroStock === 'todos' ||
      (filtroStock === 'con-stock' && producto.stock > 0) ||
      (filtroStock === 'sin-stock' && producto.stock === 0) ||
      (filtroStock === 'stock-bajo' && producto.stock > 0 && producto.stock < 5)

    const busquedaMatch = !busqueda.trim() ||
      producto.nombre?.toLowerCase().includes(busqueda.toLowerCase())

    return categoriaMatch && stockMatch && busquedaMatch
  })

  const productosOrdenados = [...productosFiltrados].sort((a, b) =>
    (a.nombre || '').localeCompare(b.nombre || '')
  )

  const getStockBadge = (stock) => {
    if (stock === 0) return { badge: 'bg-danger', text: 'Sin stock' }
    if (stock < 5) return { badge: 'bg-warning', text: 'Stock bajo' }
    if (stock < 15) return { badge: 'bg-info', text: 'Stock medio' }
    return { badge: 'bg-success', text: 'Stock alto' }
  }

  const abrirModalNuevo = () => {
    setProductoEditando(null)
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      categoriaId: categorias.length > 0 ? categorias[0].id.toString() : '',
      activo: true,
      sku: '',
      ingredientes: '',
      cantidadMedida: '',
      unidadMedida: '',
      porciones: '',
      duracionDias: '',
      condicionConservacion: '',
      alergenos: ''
    })
    setImagenSeleccionada(null)
    setPreviewImagen(null)
    setErroresForm({})
    setModalAbierto(true)
  }

  const abrirModalEditar = (producto) => {
    setProductoEditando(producto)
    setFormData({
      nombre: producto.nombre || '',
      descripcion: producto.descripcion || '',
      precio: producto.precio?.toString() || '',
      stock: producto.stock?.toString() || '',
      categoriaId: producto.categoriaId?.toString() || '',
      activo: producto.activo !== false,
      sku: producto.sku || '',
      ingredientes: producto.ingredientes || '',
      cantidadMedida: producto.cantidadMedida?.toString() || '',
      unidadMedida: producto.unidadMedida || '',
      porciones: producto.porciones?.toString() || '',
      duracionDias: producto.duracionDias?.toString() || '',
      condicionConservacion: producto.condicionConservacion || '',
      alergenos: producto.alergenos || ''
    })
    setImagenSeleccionada(null)
    setPreviewImagen(producto.imagenUrl ? productosService.obtenerUrlImagen(producto.imagenUrl) : null)
    setErroresForm({})
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setProductoEditando(null)
    setImagenSeleccionada(null)
    setPreviewImagen(null)
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

  const handleImagenChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErroresForm({ ...erroresForm, imagen: 'Solo se permiten archivos de imagen' })
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setErroresForm({ ...erroresForm, imagen: 'La imagen no puede superar 5MB' })
        return
      }
      setImagenSeleccionada(file)
      setPreviewImagen(URL.createObjectURL(file))
      setErroresForm({ ...erroresForm, imagen: '' })
    }
  }

  // Función para limpiar precio (quitar puntos de miles)
  const limpiarPrecio = (precio) => {
    if (!precio) return ''
    return precio.toString().replace(/\./g, '')
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formData.nombre || formData.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre es requerido (mínimo 2 caracteres)'
    }

    const precioLimpio = limpiarPrecio(formData.precio)
    if (!precioLimpio || isNaN(precioLimpio) || Number(precioLimpio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser un número mayor a 0'
    }

    if (formData.stock === '' || isNaN(formData.stock) || Number(formData.stock) < 0) {
      nuevosErrores.stock = 'El stock debe ser un número igual o mayor a 0'
    }

    if (!formData.categoriaId) {
      nuevosErrores.categoriaId = 'Debes seleccionar una categoría'
    }

    setErroresForm(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    setGuardando(true)
    try {
      const productoData = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion?.trim() || null,
        precio: Number(limpiarPrecio(formData.precio)),
        stock: Number(formData.stock),
        categoriaId: Number(formData.categoriaId),
        activo: formData.activo,
        sku: formData.sku?.trim() || null,
        ingredientes: formData.ingredientes?.trim() || null,
        cantidadMedida: formData.cantidadMedida ? Number(formData.cantidadMedida) : null,
        unidadMedida: formData.unidadMedida?.trim() || null,
        porciones: formData.porciones ? Number(formData.porciones) : null,
        duracionDias: formData.duracionDias ? Number(formData.duracionDias) : null,
        condicionConservacion: formData.condicionConservacion?.trim() || null,
        alergenos: formData.alergenos?.trim() || null
      }

      if (productoEditando) {
        // Si no se seleccionó nueva imagen, mantener la existente
        if (!imagenSeleccionada && productoEditando.imagenUrl) {
          productoData.imagenUrl = productoEditando.imagenUrl
        }
        await productosService.actualizar(productoEditando.id, productoData, imagenSeleccionada)
      } else {
        await productosService.crear(productoData, imagenSeleccionada)
      }

      cerrarModal()
      await cargarDatos()
    } catch (err) {
      console.error('Error guardando producto:', err)
      const msg = err.response?.data?.mensaje || 'Error al guardar el producto'
      setErroresForm({ general: msg })
    } finally {
      setGuardando(false)
    }
  }

  const handleEliminar = async (producto) => {
    if (!confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`)) return

    try {
      await productosService.eliminar(producto.id)
      await cargarDatos()
    } catch (err) {
      console.error('Error eliminando producto:', err)
      alert('Error al eliminar el producto')
    }
  }

  if (cargando) {
    return (
      <div className="container py-4">
        <h1 className="mb-4">Gestión de Productos</h1>
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
        <h1 className="mb-4">Gestión de Productos</h1>
        <div className="alert alert-danger">{error}</div>
        <button onClick={cargarDatos} className="btn btn-primary">Reintentar</button>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Gestión de Productos</h1>
        {isAdmin() && (
          <button onClick={abrirModalNuevo} className="btn btn-primary">
            + Nuevo Producto
          </button>
        )}
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="form-select"
              >
                <option value="todas">Todas las categorías</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id.toString()}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                value={filtroStock}
                onChange={(e) => setFiltroStock(e.target.value)}
                className="form-select"
              >
                <option value="todos">Todos los productos</option>
                <option value="con-stock">Con stock</option>
                <option value="sin-stock">Sin stock</option>
                <option value="stock-bajo">Stock bajo (menos de 5)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <p className="text-muted mb-3">
        Mostrando {productosOrdenados.length} de {productos.length} productos
      </p>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              {isAdmin() && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {productosOrdenados.map(producto => {
              const stockInfo = getStockBadge(producto.stock)
              const imagenUrl = producto.imagenUrl ? productosService.obtenerUrlImagen(producto.imagenUrl) : null

              return (
                <tr key={producto.id}>
                  <td>
                    {imagenUrl ? (
                      <img
                        src={imagenUrl}
                        alt={producto.nombre}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    ) : (
                      <div
                        className="bg-light d-flex align-items-center justify-content-center"
                        style={{ width: '50px', height: '50px', borderRadius: '4px' }}
                      >
                        <span className="text-muted small">N/A</span>
                      </div>
                    )}
                  </td>
                  <td>
                    <strong>{producto.nombre}</strong>
                    <br />
                    <small className="text-muted">ID: {producto.id}</small>
                  </td>
                  <td>{producto.categoriaNombre || 'Sin categoría'}</td>
                  <td>${formatearPrecio(producto.precio)}</td>
                  <td>
                    <span className={`badge ${stockInfo.badge}`}>
                      {producto.stock} - {stockInfo.text}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${producto.activo ? 'bg-success' : 'bg-secondary'}`}>
                      {producto.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  {isAdmin() && (
                    <td>
                      <button
                        onClick={() => abrirModalEditar(producto)}
                        className="btn btn-outline-primary btn-sm me-1"
                        title="Editar producto"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setProductoVariantes(producto)}
                        className="btn btn-outline-info btn-sm me-1"
                        title="Gestionar tamaños/variantes"
                      >
                        Tamaños
                      </button>
                      <button
                        onClick={() => handleEliminar(producto)}
                        className="btn btn-outline-danger btn-sm"
                        title="Eliminar producto"
                      >
                        Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {productosOrdenados.length === 0 && (
        <div className="alert alert-info text-center">
          No hay productos con los filtros seleccionados
        </div>
      )}

      {productoVariantes && (
        <AdminVariantes
          producto={productoVariantes}
          onClose={() => setProductoVariantes(null)}
        />
      )}

      {modalAbierto && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {productoEditando ? 'Editar Producto' : 'Nuevo Producto'}
                </h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {erroresForm.general && (
                    <div className="alert alert-danger">{erroresForm.general}</div>
                  )}

                  <div className="row g-3">
                    <div className="col-md-8">
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

                    <div className="col-md-4">
                      <label className="form-label">Categoría *</label>
                      <select
                        name="categoriaId"
                        value={formData.categoriaId}
                        onChange={handleFormChange}
                        className={`form-select ${erroresForm.categoriaId ? 'is-invalid' : ''}`}
                        disabled={guardando}
                      >
                        <option value="">Seleccionar...</option>
                        {categorias.map(cat => (
                          <option key={cat.id} value={cat.id.toString()}>
                            {cat.nombre}
                          </option>
                        ))}
                      </select>
                      {erroresForm.categoriaId && <div className="invalid-feedback">{erroresForm.categoriaId}</div>}
                    </div>

                    <div className="col-12">
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

                    <div className="col-md-6">
                      <label className="form-label">SKU</label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Código único del producto"
                        disabled={guardando}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Ingredientes</label>
                      <input
                        type="text"
                        name="ingredientes"
                        value={formData.ingredientes}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Harina, azúcar, huevos..."
                        disabled={guardando}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Cantidad</label>
                      <input
                        type="number"
                        name="cantidadMedida"
                        value={formData.cantidadMedida}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="350"
                        min="0"
                        disabled={guardando}
                      />
                      <small className="text-muted">Peso o volumen del producto</small>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Unidad</label>
                      <select
                        name="unidadMedida"
                        value={formData.unidadMedida}
                        onChange={handleFormChange}
                        className="form-select"
                        disabled={guardando}
                      >
                        <option value="">Seleccionar</option>
                        <option value="G">Gramos (g)</option>
                        <option value="KG">Kilogramos (kg)</option>
                        <option value="ML">Mililitros (ml)</option>
                        <option value="L">Litros (l)</option>
                        <option value="UNIDAD">Unidad</option>
                        <option value="DOCENA">Docena</option>
                        <option value="PORCION">Porción</option>
                      </select>
                      <small className="text-muted">Ej: 500 gr para un pastel</small>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Porciones</label>
                      <input
                        type="number"
                        name="porciones"
                        value={formData.porciones}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="8"
                        min="1"
                        disabled={guardando}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Duración (días)</label>
                      <input
                        type="number"
                        name="duracionDias"
                        value={formData.duracionDias}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="3"
                        min="1"
                        disabled={guardando}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Conservación</label>
                      <input
                        type="text"
                        name="condicionConservacion"
                        value={formData.condicionConservacion}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Mantener refrigerado"
                        disabled={guardando}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Alérgenos</label>
                      <input
                        type="text"
                        name="alergenos"
                        value={formData.alergenos}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="Gluten, lácteos, huevo..."
                        disabled={guardando}
                      />
                    </div>

                    <div className="col-md-4">
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
                          placeholder="29990"
                          disabled={guardando}
                        />
                        {erroresForm.precio && <div className="invalid-feedback">{erroresForm.precio}</div>}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Stock *</label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleFormChange}
                        className={`form-control ${erroresForm.stock ? 'is-invalid' : ''}`}
                        min="0"
                        disabled={guardando}
                      />
                      {erroresForm.stock && <div className="invalid-feedback">{erroresForm.stock}</div>}
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Estado</label>
                      <div className="form-check mt-2">
                        <input
                          type="checkbox"
                          name="activo"
                          checked={formData.activo}
                          onChange={handleFormChange}
                          className="form-check-input"
                          id="activoCheck"
                          disabled={guardando}
                        />
                        <label className="form-check-label" htmlFor="activoCheck">
                          Producto activo
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Imagen del producto</label>
                      <div className="d-flex gap-3 align-items-start">
                        {previewImagen && (
                          <img
                            src={previewImagen}
                            alt="Preview"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                        )}
                        <div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImagenChange}
                            accept="image/*"
                            className="d-none"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="btn btn-outline-secondary"
                            disabled={guardando}
                          >
                            {previewImagen ? 'Cambiar imagen' : 'Seleccionar imagen'}
                          </button>
                          {erroresForm.imagen && (
                            <div className="text-danger small mt-1">{erroresForm.imagen}</div>
                          )}
                          <div className="text-muted small mt-1">
                            JPG, PNG. Máximo 5MB.
                          </div>
                        </div>
                      </div>
                    </div>
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
                      productoEditando ? 'Guardar Cambios' : 'Crear Producto'
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

export default AdminProducts
