import { useState, useContext, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { formatearPrecio } from '../utils/formateo'
import { CarritoContext } from '../context/CarritoContext'
import { productosService } from '../api/productosService'
import { variantesService } from '../api/variantesService'

// Mapeo de condiciones de conservación
const CONSERVACION_LABELS = {
  'REFRIGERADO': 'Mantener refrigerado (0-4°C)',
  'CONGELADO': 'Mantener congelado (-18°C)',
  'AMBIENTE': 'Temperatura ambiente'
}

function DetalleProductoContenido() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { agregarAlCarrito } = useContext(CarritoContext)

  const [producto, setProducto] = useState(null)
  const [variantes, setVariantes] = useState([])
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const [mensajeAgregado, setMensajeAgregado] = useState(false)

  useEffect(() => {
    cargarProducto()
  }, [id])

  const cargarProducto = async () => {
    try {
      setCargando(true)
      const [productoData, variantesData] = await Promise.all([
        productosService.obtenerPorId(id),
        variantesService.obtenerActivasPorProducto(id).catch(() => [])
      ])
      setProducto(productoData)
      setVariantes(variantesData)
    } catch (err) {
      setError('Producto no encontrado')
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  if (cargando) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando producto...</p>
        </div>
      </section>
    )
  }

  if (error || !producto) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <div className="alert alert-danger" role="alert">
            {error || 'Producto no encontrado'}
          </div>
          <Link to="/productos" className="btn-aero btn-aero-cafe">
            Volver a Productos
          </Link>
        </div>
      </section>
    )
  }

  // Si hay variante seleccionada, usar su precio y stock
  const tieneVariantes = variantes.length > 0
  const precioMinimoVariantes = tieneVariantes ? Math.min(...variantes.map(v => v.precio)) : 0
  const precio = varianteSeleccionada
    ? varianteSeleccionada.precio
    : (tieneVariantes ? precioMinimoVariantes : producto.precio || 0)
  const stockDisponible = varianteSeleccionada ? varianteSeleccionada.stock : producto.stock
  const imagenUrl = productosService.obtenerUrlImagen(producto.imagenUrl)
  const total = precio * cantidad

  const handleAgregarCarrito = () => {
    // Crear objeto con información del producto y variante
    const itemCarrito = {
      ...producto,
      precio: precio,
      stock: stockDisponible,
      varianteId: varianteSeleccionada?.id || null,
      varianteNombre: varianteSeleccionada?.nombreDisplay || varianteSeleccionada?.nombre || null,
      id: producto.id,
      productoId: producto.id
    }
    agregarAlCarrito(itemCarrito, cantidad)
    setMensajeAgregado(true)
    setTimeout(() => setMensajeAgregado(false), 3000)
  }

  const handleCantidadChange = (e) => {
    const valor = parseInt(e.target.value)
    if (valor >= 1 && valor <= stockDisponible) {
      setCantidad(valor)
    }
  }

  const handleSeleccionarVariante = (variante) => {
    // Toggle: si hace clic en la misma variante, la deselecciona
    if (varianteSeleccionada?.id === variante.id) {
      setVarianteSeleccionada(null)
    } else {
      setVarianteSeleccionada(variante)
    }
    setCantidad(1) // Resetear cantidad al cambiar variante
  }

  return (
    <section className="producto-detalle-section py-5">
      <div className="container">
        {/* Breadcrumb estilizado */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb producto-breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
            <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
          </ol>
        </nav>

        {/* Mensaje de éxito estilizado */}
        {mensajeAgregado && (
          <div className="producto-alerta-exito mb-4">
            <span className="alerta-icono">✓</span>
            <span>Producto agregado al carrito</span>
            {varianteSeleccionada && <span className="ms-1">- {varianteSeleccionada.nombre}</span>}
            <button
              type="button"
              className="alerta-cerrar"
              onClick={() => setMensajeAgregado(false)}
              aria-label="Close"
            >×</button>
          </div>
        )}

        <div className="row g-4">
          {/* Columna de imagen */}
          <div className="col-lg-6 mb-4">
            <div className="producto-imagen-card">
              <div className="producto-imagen-header">
                <div className="window-buttons">
                  <span className="window-btn red"></span>
                  <span className="window-btn yellow"></span>
                  <span className="window-btn green"></span>
                </div>
                <span className="title-text">{producto.nombre}</span>
              </div>
              <div className="producto-imagen-container">
                {imagenUrl ? (
                  <img
                    src={imagenUrl}
                    alt={producto.nombre}
                    className="producto-imagen-principal"
                  />
                ) : (
                  <div className="producto-sin-imagen">
                    <span>Sin imagen disponible</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna de información */}
          <div className="col-lg-6">
            <div className="producto-info-card">
              <div className="producto-info-header">
                <div className="window-buttons">
                  <span className="window-btn red"></span>
                  <span className="window-btn yellow"></span>
                  <span className="window-btn green"></span>
                </div>
                <span className="title-text">Información del Producto</span>
              </div>

              <div className="producto-info-content">
                {/* Categoría */}
                {producto.categoriaNombre && (
                  <span className="producto-categoria-badge">
                    {producto.categoriaNombre}
                  </span>
                )}

                {/* Nombre y precio */}
                <h1 className="producto-titulo">{producto.nombre}</h1>

                <div className="producto-precio-box">
                  {tieneVariantes && !varianteSeleccionada && (
                    <span className="producto-precio-desde">Desde</span>
                  )}
                  <span className="producto-precio">${formatearPrecio(precio)}</span>
                  {varianteSeleccionada && (
                    <span className="producto-variante-seleccionada">
                      {varianteSeleccionada.nombreDisplay || varianteSeleccionada.nombre}
                    </span>
                  )}
                </div>

                {/* Descripción */}
                <p className="producto-descripcion">{producto.descripcion}</p>

                {/* Selector de Tamaños/Variantes */}
                {tieneVariantes && (
                  <div className="producto-variantes-section">
                    <label className="producto-label">Seleccione tamaño:</label>
                    <div className="producto-variantes-grid">
                      {variantes.map(variante => (
                        <button
                          key={variante.id}
                          type="button"
                          className={`producto-variante-btn ${varianteSeleccionada?.id === variante.id ? 'selected' : ''} ${variante.stock === 0 ? 'agotado' : ''}`}
                          onClick={() => handleSeleccionarVariante(variante)}
                          disabled={variante.stock === 0}
                        >
                          <span className="variante-nombre">{variante.nombreDisplay || variante.nombre}</span>
                          <span className="variante-precio">${formatearPrecio(variante.precio)}</span>
                          {variante.stock === 0 && <span className="variante-agotado">Agotado</span>}
                        </button>
                      ))}
                    </div>
                    {!varianteSeleccionada && (
                      <small className="producto-variante-aviso">* Debe seleccionar un tamaño</small>
                    )}
                  </div>
                )}

                {/* Detalles del producto */}
                <div className="producto-detalles-box">
                  {producto.ingredientes && (
                    <div className="producto-detalle-item">
                      <span className="detalle-label">Ingredientes</span>
                      <span className="detalle-valor">{producto.ingredientes}</span>
                    </div>
                  )}
                  {!tieneVariantes && producto.porciones && (
                    <div className="producto-detalle-item">
                      <span className="detalle-label">Porciones</span>
                      <span className="detalle-valor">{producto.porciones} personas</span>
                    </div>
                  )}
                  {producto.duracionDias && (
                    <div className="producto-detalle-item">
                      <span className="detalle-label">Duración</span>
                      <span className="detalle-valor">{producto.duracionDias} días</span>
                    </div>
                  )}
                  {producto.condicionConservacion && (
                    <div className="producto-detalle-item">
                      <span className="detalle-label">Conservación</span>
                      <span className="detalle-valor">{CONSERVACION_LABELS[producto.condicionConservacion] || producto.condicionConservacion}</span>
                    </div>
                  )}
                  <div className="producto-detalle-item">
                    <span className="detalle-label">Disponibilidad</span>
                    <span className={`detalle-stock ${stockDisponible === 0 ? 'sin-stock' : stockDisponible <= 5 ? 'poco-stock' : 'en-stock'}`}>
                      {stockDisponible === 0
                        ? 'Sin stock'
                        : `${stockDisponible} ${stockDisponible === 1 ? 'unidad disponible' : 'unidades disponibles'}`}
                    </span>
                  </div>
                </div>

                {/* Alérgenos - solo si existen */}
                {producto.alergenos && (
                  <div className="producto-alergenos">
                    <span className="alergenos-icono">⚠</span>
                    <div>
                      <strong>Alérgenos:</strong>
                      <span>{producto.alergenos}</span>
                    </div>
                  </div>
                )}

                {/* Selector de cantidad y total */}
                <div className="producto-compra-section">
                  <div className="producto-cantidad-row">
                    <label className="producto-label">Cantidad:</label>
                    <div className="producto-cantidad-control">
                      <button
                        className="cantidad-btn"
                        type="button"
                        onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                        disabled={cantidad <= 1}
                      >−</button>
                      <input
                        type="number"
                        className="cantidad-input"
                        value={cantidad}
                        onChange={handleCantidadChange}
                        min="1"
                        max={stockDisponible}
                      />
                      <button
                        className="cantidad-btn"
                        type="button"
                        onClick={() => cantidad < stockDisponible && setCantidad(cantidad + 1)}
                        disabled={cantidad >= stockDisponible}
                      >+</button>
                    </div>
                  </div>

                  <div className="producto-total-box">
                    <span className="total-label">Total:</span>
                    <span className="total-precio">${formatearPrecio(total)}</span>
                  </div>

                  <button
                    className="producto-btn-agregar"
                    onClick={handleAgregarCarrito}
                    disabled={stockDisponible === 0 || (tieneVariantes && !varianteSeleccionada)}
                  >
                    {stockDisponible === 0
                      ? 'Sin stock'
                      : tieneVariantes && !varianteSeleccionada
                        ? 'Seleccione un tamaño'
                        : 'Agregar al Carrito'}
                  </button>

                  <button
                    className="producto-btn-seguir"
                    onClick={() => navigate('/productos')}
                  >
                    Seguir Comprando
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetalleProductoContenido
