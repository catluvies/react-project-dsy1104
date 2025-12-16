import { useState, useContext, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { formatearPrecio } from '../utils/formateo'
import { CarritoContext } from '../context/CarritoContext'
import { productosService } from '../api/productosService'
import { variantesService } from '../api/variantesService'

// Mapeo de enums a texto legible
const UNIDAD_MEDIDA_LABELS = {
  'G': 'g',
  'KG': 'kg',
  'ML': 'ml',
  'L': 'l',
  'UNIDAD': 'unidad(es)',
  'DOCENA': 'docena(s)',
  'PORCION': 'porción(es)'
}

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
  const precio = varianteSeleccionada ? varianteSeleccionada.precio : producto.precio || 0
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
      varianteNombre: varianteSeleccionada?.nombre || null,
      // Crear ID único si tiene variante
      id: varianteSeleccionada ? `${producto.id}-v${varianteSeleccionada.id}` : producto.id,
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
    setVarianteSeleccionada(variante)
    setCantidad(1) // Resetear cantidad al cambiar variante
  }

  return (
    <section className="py-5">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
            <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
          </ol>
        </nav>

        {mensajeAgregado && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Producto agregado al carrito
            {varianteSeleccionada && <span> - {varianteSeleccionada.nombre}</span>}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMensajeAgregado(false)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="row">
          <div className="col-md-6 mb-4">
            {imagenUrl ? (
              <img
                src={imagenUrl}
                alt={producto.nombre}
                className="img-fluid rounded shadow"
                style={{objectFit: 'cover', width: '100%'}}
              />
            ) : (
              <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{height: '400px'}}>
                <span className="text-muted">Sin imagen</span>
              </div>
            )}
          </div>

          <div className="col-md-6">
            {producto.categoriaNombre && (
              <span className="badge bg-primary mb-3">
                {producto.categoriaNombre}
              </span>
            )}

            <h1 className="mb-3">{producto.nombre}</h1>

            <h2 className="text-primary mb-4">
              ${formatearPrecio(precio)}
              {varianteSeleccionada && (
                <small className="text-muted fs-6 ms-2">
                  ({varianteSeleccionada.nombre})
                </small>
              )}
            </h2>

            <p className="mb-4">{producto.descripcion}</p>

            {/* Selector de Tamaños/Variantes */}
            {tieneVariantes && (
              <div className="mb-4">
                <label className="form-label fw-bold">Seleccione tamaño:</label>
                <div className="d-flex flex-wrap gap-2">
                  {variantes.map(variante => (
                    <button
                      key={variante.id}
                      type="button"
                      className={`btn ${varianteSeleccionada?.id === variante.id ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleSeleccionarVariante(variante)}
                      disabled={variante.stock === 0}
                    >
                      <div className="d-flex flex-column align-items-center">
                        <span>{variante.nombre}</span>
                        <small className="fw-bold">${formatearPrecio(variante.precio)}</small>
                        {variante.porciones && (
                          <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                            {variante.porciones} porciones
                          </small>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {!varianteSeleccionada && (
                  <small className="text-danger">* Debe seleccionar un tamaño</small>
                )}
              </div>
            )}

            <div className="mb-4">
              {producto.ingredientes && (
                <p><strong>Ingredientes:</strong> {producto.ingredientes}</p>
              )}
              {!tieneVariantes && producto.porciones && (
                <p><strong>Porciones:</strong> {producto.porciones}</p>
              )}
              {producto.duracionDias && (
                <p><strong>Duración:</strong> {producto.duracionDias} días</p>
              )}
              {producto.condicionConservacion && (
                <p><strong>Conservación:</strong> {CONSERVACION_LABELS[producto.condicionConservacion] || producto.condicionConservacion}</p>
              )}
              <p>
                <strong>Stock disponible:</strong>{' '}
                <span className={stockDisponible === 0 ? 'text-danger' : stockDisponible <= 5 ? 'text-warning' : 'text-success'}>
                  {stockDisponible} unidades
                </span>
              </p>
            </div>

            {/* Información técnica - peso/medida */}
            {(producto.cantidadMedida && producto.unidadMedida) && (
              <div className="mb-4 p-3 bg-light rounded">
                <small className="text-muted d-block mb-1">Contenido:</small>
                <span className="fw-bold">
                  {producto.cantidadMedida} {UNIDAD_MEDIDA_LABELS[producto.unidadMedida] || producto.unidadMedida}
                </span>
              </div>
            )}

            {producto.alergenos && (
              <div className="alert alert-warning mb-4">
                <strong>Alérgenos:</strong> {producto.alergenos}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label"><strong>Cantidad:</strong></label>
              <div className="input-group" style={{maxWidth: '200px'}}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                  disabled={cantidad <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={cantidad}
                  onChange={handleCantidadChange}
                  min="1"
                  max={stockDisponible}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => cantidad < stockDisponible && setCantidad(cantidad + 1)}
                  disabled={cantidad >= stockDisponible}
                >
                  +
                </button>
              </div>
            </div>

            <p className="mb-3 fs-5">
              <strong>Total:</strong> <span className="text-primary">${formatearPrecio(total)}</span>
            </p>

            <button
              className="btn-aero btn-aero-cafe btn-aero-block mb-3"
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
              className="btn-aero btn-aero-outline btn-aero-block"
              onClick={() => navigate('/productos')}
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetalleProductoContenido
