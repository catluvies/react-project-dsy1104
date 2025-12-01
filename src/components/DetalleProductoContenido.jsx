import { useState, useContext, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { formatearPrecio } from '../utils/formateo'
import { CarritoContext } from '../context/CarritoContext'
import { productosService } from '../api/productosService'

function DetalleProductoContenido() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { agregarAlCarrito } = useContext(CarritoContext)

  const [producto, setProducto] = useState(null)
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
      const data = await productosService.obtenerPorId(id)
      setProducto(data)
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
          <Link to="/productos" className="btn btn-primary">
            Volver a Productos
          </Link>
        </div>
      </section>
    )
  }

  const precio = producto.precio || 0
  const imagenUrl = productosService.obtenerUrlImagen(producto.imagenUrl)
  const total = precio * cantidad

  const handleAgregarCarrito = () => {
    agregarAlCarrito(producto, cantidad)
    setMensajeAgregado(true)
    setTimeout(() => setMensajeAgregado(false), 3000)
  }

  const handleCantidadChange = (e) => {
    const valor = parseInt(e.target.value)
    if (valor >= 1 && valor <= producto.stock) {
      setCantidad(valor)
    }
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
                className="img-fluid rounded"
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
            </h2>

            <p className="mb-4">{producto.descripcion}</p>

            <div className="mb-4">
              {producto.ingredientes && (
                <p><strong>Ingredientes:</strong> {producto.ingredientes}</p>
              )}
              {producto.porciones && (
                <p><strong>Porciones:</strong> {producto.porciones}</p>
              )}
              {producto.duracion && (
                <p><strong>Duración:</strong> {producto.duracion}</p>
              )}
              {producto.tiempoPreparacion && (
                <p><strong>Tiempo de preparación:</strong> {producto.tiempoPreparacion}</p>
              )}
              <p>
                <strong>Stock disponible:</strong>{' '}
                <span className={producto.stock === 0 ? 'text-danger' : producto.stock <= 5 ? 'text-warning' : 'text-success'}>
                  {producto.stock} unidades
                </span>
              </p>
            </div>

            {producto.notas && (
              <div className="alert alert-info mb-4">
                <strong>Información:</strong> {producto.notas}
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
                  max={producto.stock}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => cantidad < producto.stock && setCantidad(cantidad + 1)}
                  disabled={cantidad >= producto.stock}
                >
                  +
                </button>
              </div>
            </div>

            <p className="mb-3 fs-5">
              <strong>Total:</strong> <span className="text-primary">${formatearPrecio(total)}</span>
            </p>

            <button
              className="btn btn-primary w-100 mb-3"
              onClick={handleAgregarCarrito}
              disabled={producto.stock === 0}
            >
              {producto.stock === 0 ? 'Sin stock' : 'Agregar al Carrito'}
            </button>

            <button
              className="btn btn-secondary w-100"
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
