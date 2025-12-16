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

        {/* Carrusel con flechas integradas */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="position-relative">
              {/* Flecha izquierda */}
              <button
                className="btn position-absolute d-flex align-items-center justify-content-center"
                type="button"
                data-bs-target="#productosCarousel"
                data-bs-slide="prev"
                style={{
                  left: '-25px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '3px solid #F59E0B',
                  backgroundColor: 'white',
                  color: '#F59E0B',
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  zIndex: 10,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                ‹
              </button>

              {/* Carrusel */}
              <div id="productosCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {productos.map((producto, index) => {
                    const imagenUrl = productosService.obtenerUrlImagen(producto.imagenUrl)
                    return (
                      <div key={producto.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <Link to={`/producto/${producto.id}`} className="text-decoration-none">
                          <div
                            style={{
                              backgroundColor: '#FFFBF0',
                              border: '3px dashed #F59E0B',
                              borderRadius: '28px',
                              overflow: 'hidden',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                              height: '320px'
                            }}
                          >
                            <div className="row g-0 h-100">
                              {/* Imagen - lado izquierdo */}
                              <div className="col-md-5 h-100">
                                <div
                                  style={{
                                    height: '100%',
                                    minHeight: '320px',
                                    backgroundColor: '#f8f4f0'
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
                              <div className="col-md-7 h-100">
                                <div className="d-flex flex-column justify-content-center h-100 p-4 p-md-5">
                                  {/* Badge decorativo */}
                                  <div className="mb-3">
                                    <span
                                      style={{
                                        backgroundColor: '#FEF3C7',
                                        color: '#92400E',
                                        padding: '6px 16px',
                                        borderRadius: '9999px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600'
                                      }}
                                    >
                                      ⭐ Destacado
                                    </span>
                                  </div>

                                  {/* Nombre */}
                                  <h3
                                    className="mb-2"
                                    style={{
                                      fontFamily: "'Playfair Display', Georgia, serif",
                                      fontStyle: 'italic',
                                      color: '#6B5B4F',
                                      fontSize: '1.6rem'
                                    }}
                                  >
                                    {producto.nombre}
                                  </h3>

                                  {/* Descripción */}
                                  <p
                                    className="mb-3"
                                    style={{
                                      color: '#8B7355',
                                      fontSize: '0.95rem',
                                      lineHeight: '1.5',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    {producto.descripcion}
                                  </p>

                                  {/* Precio y botón */}
                                  <div className="d-flex align-items-center gap-3 flex-wrap">
                                    <span
                                      style={{
                                        color: '#F59E0B',
                                        fontSize: '1.8rem',
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      ${formatearPrecio(producto.precio)}
                                    </span>
                                    <span
                                      className="btn"
                                      style={{
                                        backgroundColor: '#F59E0B',
                                        color: 'white',
                                        borderRadius: '9999px',
                                        padding: '10px 20px',
                                        fontWeight: '500',
                                        fontSize: '0.9rem',
                                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                                      }}
                                    >
                                      Ver más →
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
                className="btn position-absolute d-flex align-items-center justify-content-center"
                type="button"
                data-bs-target="#productosCarousel"
                data-bs-slide="next"
                style={{
                  right: '-25px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '3px solid #F59E0B',
                  backgroundColor: 'white',
                  color: '#F59E0B',
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  zIndex: 10,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                ›
              </button>
            </div>

            {/* Indicadores */}
            <div className="d-flex justify-content-center gap-2 mt-4">
              {productos.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#productosCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  style={{
                    width: index === 0 ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    backgroundColor: index === 0 ? '#F59E0B' : '#ddd',
                    border: 'none',
                    transition: 'all 0.3s ease'
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
