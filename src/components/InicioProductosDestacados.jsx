import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formateo'
import { productosService } from '../api/productosService'

function InicioProductosDestacados(props) {
  const productos = props.productos || []

  if (productos.length === 0) {
    return (
      <section className="py-5" style={{ backgroundColor: 'transparent' }}>
        <div className="container text-center">
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: '2.2rem',
              color: 'var(--color-cafe-oscuro)'
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
    <section className="py-5" style={{ backgroundColor: 'transparent' }}>
      <div className="container">
        {/* Título consistente */}
        <div className="text-center mb-4">
          <h2
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: '2.2rem',
              color: 'var(--color-cafe-oscuro)',
              marginBottom: '0.5rem'
            }}
          >
            Nuestros Mejores Productos
          </h2>
          <p className="text-muted">Seleccionados especialmente para ti</p>
        </div>

        {/* Carrusel con estilo glass */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="position-relative">
              {/* Flecha izquierda */}
              <button
                className="btn btn-aero btn-aero-cafe position-absolute d-none d-md-flex align-items-center justify-content-center"
                type="button"
                data-bs-target="#productosCarousel"
                data-bs-slide="prev"
                style={{
                  left: '-20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  padding: '0',
                  zIndex: 10
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>

              {/* Carrusel */}
              <div id="productosCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {productos.map((producto, index) => {
                    const imagenUrl = productosService.obtenerUrlImagen(producto.imagenUrl)
                    const tieneVariantes = producto.variantes && producto.variantes.length > 0
                    const precioMostrar = tieneVariantes
                      ? Math.min(...producto.variantes.map(v => v.precio))
                      : (producto.precio || 0)
                    return (
                      <div key={producto.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <Link to={`/producto/${producto.id}`} className="text-decoration-none">
                          <div className="card-aero card-aero-rosa" style={{ overflow: 'hidden' }}>
                            <div className="row g-0">
                              {/* Imagen - lado izquierdo */}
                              <div className="col-md-5">
                                <div
                                  style={{
                                    height: '300px',
                                    background: 'linear-gradient(135deg, rgba(255,182,193,0.3), rgba(255,253,208,0.3))'
                                  }}
                                >
                                  {imagenUrl ? (
                                    <img
                                      src={imagenUrl}
                                      alt={producto.nombre}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                      }}
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div
                                      className="d-flex align-items-center justify-content-center h-100"
                                      style={{ fontSize: '5rem' }}
                                    >
                                      🍰
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Contenido - lado derecho */}
                              <div className="col-md-7">
                                <div className="d-flex flex-column justify-content-center h-100 p-4">
                                  {/* Categoría con badge glass */}
                                  <span
                                    className="badge-glass badge-glass-cafe mb-2 align-self-start"
                                  >
                                    {producto.categoriaNombre || 'Pastelería'}
                                  </span>

                                  {/* Nombre con fuente Pacifico */}
                                  <h3
                                    className="mb-2"
                                    style={{
                                      fontFamily: "'Pacifico', cursive",
                                      color: 'var(--color-cafe-oscuro)',
                                      fontSize: '1.5rem'
                                    }}
                                  >
                                    {producto.nombre}
                                  </h3>

                                  {/* Descripción */}
                                  <p
                                    className="mb-3"
                                    style={{
                                      color: '#6B5B4F',
                                      fontSize: '0.9rem',
                                      lineHeight: '1.5',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    {producto.descripcion}
                                  </p>

                                  {/* Precio y botón */}
                                  <div className="d-flex align-items-center gap-3 mt-auto">
                                    <div>
                                      {tieneVariantes && (
                                        <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Desde</small>
                                      )}
                                      <span
                                        style={{
                                          color: 'var(--color-cafe-oscuro)',
                                          fontSize: '1.6rem',
                                          fontWeight: 'bold'
                                        }}
                                      >
                                        ${formatearPrecio(precioMostrar)}
                                      </span>
                                    </div>
                                    <span className="btn-aero btn-aero-cafe btn-aero-sm">
                                      Ver producto
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Flecha derecha */}
              <button
                className="btn btn-aero btn-aero-cafe position-absolute d-none d-md-flex align-items-center justify-content-center"
                type="button"
                data-bs-target="#productosCarousel"
                data-bs-slide="next"
                style={{
                  right: '-20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  padding: '0',
                  zIndex: 10
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
            </div>

            {/* Indicadores con estilo aero */}
            <div className="d-flex justify-content-center gap-2 mt-4">
              {productos.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#productosCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : undefined}
                  style={{
                    width: index === 0 ? '28px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    backgroundColor: index === 0 ? 'var(--color-cafe-oscuro)' : 'var(--color-cafe-claro)',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
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
            className="btn-aero btn-aero-cafe"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  )
}

export default InicioProductosDestacados
