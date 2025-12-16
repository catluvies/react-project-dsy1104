import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formateo'
import { productosService } from '../api/productosService'

function InicioProductosDestacados(props) {
  const productos = props.productos || []

  if (productos.length === 0) {
    return (
      <section className="py-5" style={{ backgroundColor: '#FFFEF7' }}>
        <div className="container text-center">
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              color: '#8B7355'
            }}
          >
            Nuestros Mejores Productos
          </h2>
          <p className="text-muted">Cargando productos...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-5" style={{ backgroundColor: '#FFFEF7' }}>
      <div className="container">
        {/* Título */}
        <div className="text-center mb-5">
          <span style={{ fontSize: '2rem' }}>🎂</span>
          <h2
            className="mt-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              color: '#8B7355',
              fontSize: '2.5rem'
            }}
          >
            Nuestros Mejores Productos
          </h2>
          <p className="text-muted">Seleccionados especialmente para ti</p>
        </div>

        {/* Carrusel */}
        <div className="position-relative px-5">
          <div id="productosCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {productos.map((producto, index) => {
                const imagenUrl = productosService.obtenerUrlImagen(producto.imagenUrl)
                return (
                  <div key={producto.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <div className="d-flex justify-content-center">
                      <div style={{ maxWidth: '800px', width: '100%' }}>
                        <Link to={`/producto/${producto.id}`} className="text-decoration-none">
                          <div
                            className="d-flex flex-column flex-md-row align-items-stretch"
                            style={{
                              backgroundColor: '#FFFBF0',
                              border: '3px dashed #F59E0B',
                              borderRadius: '28px',
                              overflow: 'hidden',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                            }}
                          >
                            {/* Imagen */}
                            <div
                              className="flex-shrink-0"
                              style={{
                                width: '100%',
                                maxWidth: '320px',
                                minHeight: '280px',
                                backgroundColor: '#f5f5f5'
                              }}
                            >
                              {imagenUrl ? (
                                <img
                                  src={imagenUrl}
                                  alt={producto.nombre}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    minHeight: '280px',
                                    objectFit: 'cover'
                                  }}
                                  loading="lazy"
                                />
                              ) : (
                                <div
                                  className="d-flex align-items-center justify-content-center h-100"
                                  style={{ fontSize: '4rem' }}
                                >
                                  🍰
                                </div>
                              )}
                            </div>

                            {/* Contenido */}
                            <div
                              className="d-flex flex-column justify-content-center p-4 flex-grow-1"
                              style={{ minHeight: '280px' }}
                            >
                              <div className="text-center text-md-start">
                                <h3
                                  className="mb-3"
                                  style={{
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    fontStyle: 'italic',
                                    color: '#6B5B4F',
                                    fontSize: '1.8rem'
                                  }}
                                >
                                  {producto.nombre}
                                </h3>
                                <p
                                  className="mb-3"
                                  style={{
                                    color: '#8B7355',
                                    fontSize: '1rem',
                                    lineHeight: '1.6'
                                  }}
                                >
                                  {producto.descripcion}
                                </p>
                                <p
                                  className="mb-4"
                                  style={{
                                    color: '#F59E0B',
                                    fontSize: '2rem',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  ${formatearPrecio(producto.precio)}
                                </p>
                                <span
                                  className="btn px-4 py-2"
                                  style={{
                                    backgroundColor: '#F59E0B',
                                    color: 'white',
                                    borderRadius: '9999px',
                                    fontWeight: '500',
                                    fontSize: '1rem',
                                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                                  }}
                                >
                                  🛒 Ver Producto
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Flechas del carrusel */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#productosCarousel"
              data-bs-slide="prev"
              style={{
                left: '-60px',
                width: '50px',
                height: '50px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 1
              }}
            >
              <span
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '50px',
                  height: '50px',
                  border: '3px solid #F59E0B',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: '#F59E0B',
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                ‹
              </span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#productosCarousel"
              data-bs-slide="next"
              style={{
                right: '-60px',
                width: '50px',
                height: '50px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 1
              }}
            >
              <span
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: '50px',
                  height: '50px',
                  border: '3px solid #F59E0B',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  color: '#F59E0B',
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                ›
              </span>
              <span className="visually-hidden">Siguiente</span>
            </button>

            {/* Indicadores */}
            <div className="carousel-indicators position-relative mt-4" style={{ marginBottom: 0 }}>
              {productos.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#productosCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: index === 0 ? '#F59E0B' : '#ddd',
                    border: 'none',
                    margin: '0 5px'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Botón ver todos */}
        <div className="text-center mt-5">
          <Link
            to="/productos"
            className="btn btn-lg px-5 py-3"
            style={{
              backgroundColor: '#8B7355',
              color: 'white',
              borderRadius: '9999px',
              fontWeight: '500',
              fontSize: '1.1rem',
              boxShadow: '0 4px 15px rgba(139, 115, 85, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#6B5B4F'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#8B7355'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            🍰 Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  )
}

export default InicioProductosDestacados
