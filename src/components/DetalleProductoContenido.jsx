import { useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import productosData from '../data/productos.json'
import { formatearPrecio, formatearCategoria } from '../utils/formateo'
import { CarritoContext } from '../context/CarritoContext'

function DetalleProductoContenido() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { agregarAlCarrito } = useContext(CarritoContext)

  const [cantidad, setCantidad] = useState(1)
  const [mensajeAgregado, setMensajeAgregado] = useState(false)

  const producto = productosData.find(p => p.id === id)

  if (!producto) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <div className="alert alert-danger" role="alert">
            Producto no encontrado
          </div>
          <Link to="/productos" className="btn btn-primary">
            Volver a Productos
          </Link>
        </div>
      </section>
    )
  }

  const handleAgregarCarrito = () => {
    agregarAlCarrito(producto, cantidad)
    setMensajeAgregado(true)
    setTimeout(() => setMensajeAgregado(false), 3000)
  }

  const total = producto.precio_clp * cantidad

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
            {producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid rounded"
                style={{objectFit: 'cover', width: '100%'}}
              />
            ) : (
              <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{height: '400px'}}>
                <span className="text-muted">[Imagen del producto]</span>
              </div>
            )}
            <p className="text-muted small mt-2">ID: {producto.id}</p>
          </div>

          <div className="col-md-6">
            <span className="badge bg-primary mb-3">
              {formatearCategoria(producto.categoria)}
            </span>

            <h1 className="mb-3">{producto.nombre}</h1>

            <h2 className="text-primary mb-4">
              ${formatearPrecio(producto.precio_clp)}
            </h2>

            <p className="mb-4">{producto.descripcion}</p>

            <div className="mb-4">
              <p><strong>Ingredientes:</strong> {producto.ingredientes.join(', ')}</p>
              <p><strong>Porciones:</strong> {producto.porciones}</p>
              <p><strong>Peso:</strong> {producto.peso}</p>
              <p><strong>Duración:</strong> {producto.duracion}</p>
              <p><strong>Tiempo de preparación:</strong> {producto.tiempo_preparacion}</p>
              <p>
                <strong>Stock disponible:</strong>{' '}
                <span className={producto.stock === 0 ? 'text-danger' : producto.stock <= 5 ? 'text-warning' : 'text-success'}>
                  {producto.stock} unidades
                </span>
              </p>
            </div>

            {producto.opcion_personalizacion && producto.opcion_personalizacion.disponible && (
              <div className="alert alert-info mb-4">
                <strong>Este producto es personalizable</strong>
                <p className="mb-0">Para personalizar tu pedido, contáctanos por WhatsApp:</p>
                <a
                  href="https://wa.me/56912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-sm mt-2"
                >
                  +56 9 1234 5678
                </a>
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
