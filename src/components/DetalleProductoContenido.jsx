import { useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import productosData from '../data/productos.json'
import { formatearPrecio, formatearCategoria } from '../utils/formateo'
import { CarritoContext } from '../context/CarritoContext'
import './DetalleProductoContenido.css'

// Componente que muestra el detalle de un producto
function DetalleProductoContenido() {
  // Obtener el ID del producto desde la URL
  const { id } = useParams()
  const navigate = useNavigate()

  // Usar el contexto del carrito
  const { agregarAlCarrito } = useContext(CarritoContext)

  // Estados locales del componente
  const [cantidad, setCantidad] = useState(1)
  const [mensajeAgregado, setMensajeAgregado] = useState(false)

  const producto = productosData.find(p => p.id === id)

  if (!producto) {
    return (
      <section className="detalle-producto-error">
        <div className="detalle-producto-error__contenedor">
          <div className="detalle-producto-error__alerta">
            Producto no encontrado
          </div>
          <Link to="/productos" className="boton boton--primario">
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
    <section className="detalle-producto">
      <div className="detalle-producto__contenedor">
        {/* Breadcrumb */}
        <nav className="detalle-producto__breadcrumb">
          <Link to="/">Inicio</Link>
          <span> / </span>
          <Link to="/productos">Productos</Link>
          <span> / </span>
          <span>{producto.nombre}</span>
        </nav>

        {/* Mensaje de éxito */}
        {mensajeAgregado && (
          <div className="alerta alerta--exito detalle-producto__mensaje">
            Producto agregado al carrito
            <button
              type="button"
              onClick={() => setMensajeAgregado(false)}
              className="detalle-producto__mensaje-cerrar"
            >
              ×
            </button>
          </div>
        )}

        {/* Detalle del producto */}
        <div className="detalle-producto__grid">
          <div className="detalle-producto__imagen">
            {producto.imagen ? (
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
                className="detalle-producto__img"
              />
            ) : (
              <span className="detalle-producto__placeholder">[Imagen del producto]</span>
            )}
            <span className="detalle-producto__id">ID: {producto.id}</span>
          </div>

          <div className="detalle-producto__info">
            <span className="badge badge--primario detalle-producto__categoria">
              {formatearCategoria(producto.categoria)}
            </span>

            <h1 className="detalle-producto__nombre">{producto.nombre}</h1>

            <h2 className="detalle-producto__precio">
              ${formatearPrecio(producto.precio_clp)}
            </h2>

            <p className="detalle-producto__descripcion">{producto.descripcion}</p>

            <div className="detalle-producto__detalles">
              <p><strong>Ingredientes:</strong> {producto.ingredientes.join(', ')}</p>
              <p><strong>Porciones:</strong> {producto.porciones}</p>
              <p><strong>Peso:</strong> {producto.peso}</p>
              <p><strong>Duración:</strong> {producto.duracion}</p>
              <p><strong>Tiempo de preparación:</strong> {producto.tiempo_preparacion}</p>
              <p>
                <strong>Stock disponible:</strong>{' '}
                <span className={`detalle-producto__stock ${producto.stock === 0 ? 'detalle-producto__stock--sin' : producto.stock <= 5 ? 'detalle-producto__stock--poco' : ''}`}>
                  {producto.stock} unidades
                </span>
              </p>
            </div>

            {/* Mostrar opción de personalización si está disponible */}
            {producto.opcion_personalizacion && producto.opcion_personalizacion.disponible && (
              <div className="detalle-producto__personalizacion">
                <strong>✨ Este producto es personalizable</strong>
                <p>Para personalizar tu pedido, contáctanos por WhatsApp:</p>
                <a
                  href="https://wa.me/56912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detalle-producto__whatsapp"
                >
                  📱 +56 9 1234 5678
                </a>
              </div>
            )}

            {/* Selector de cantidad */}
            <div className="detalle-producto__cantidad">
              <label><strong>Cantidad:</strong></label>
              <div className="detalle-producto__cantidad-control">
                <button
                  onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                  disabled={cantidad <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={cantidad}
                  onChange={handleCantidadChange}
                  min="1"
                  max={producto.stock}
                />
                <button
                  onClick={() => cantidad < producto.stock && setCantidad(cantidad + 1)}
                  disabled={cantidad >= producto.stock}
                >
                  +
                </button>
              </div>
            </div>

            <p className="detalle-producto__total">
              <strong>Total:</strong> ${formatearPrecio(total)}
            </p>

            <button
              className="boton boton--primario boton--block"
              onClick={handleAgregarCarrito}
              disabled={producto.stock === 0}
            >
              {producto.stock === 0 ? 'Sin stock' : 'Agregar al Carrito'}
            </button>

            <button
              className="boton boton--secundario boton--block"
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
