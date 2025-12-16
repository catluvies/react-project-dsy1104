import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formateo'
import { productosService } from '../api/productosService'

function InicioProductosDestacados(props) {
  const productos = props.productos || []

  if (productos.length === 0) {
    return (
      <section className="container my-5">
        <h2 className="text-center mb-5">Nuestros Mejores Productos</h2>
        <p className="text-center text-muted">Cargando productos...</p>
      </section>
    )
  }

  return (
    <section className="container my-5">
      <h2
        className="text-center mb-5"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          color: '#8B7355'
        }}
      >
        Nuestros Mejores Productos
      </h2>

      <div id="productosCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {productos.map((producto, index) => {
            const imagenUrl = productosService.obtenerUrlImagen(producto.imagenUrl)
            return (
            <div key={producto.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                  <Link to={`/producto/${producto.id}`} className="text-decoration-none">
                    <div
                      className="d-flex flex-column flex-md-row"
                      style={{
                        backgroundColor: '#FFFBF0',
                        border: '3px dashed #F59E0B',
                        borderRadius: '28px',
                        overflow: 'hidden'
                      }}
                    >
                      {imagenUrl ? (
                        <img
                          src={imagenUrl}
                          alt={producto.nombre}
                          style={{
                            width: '100%',
                            maxWidth: '350px',
                            height: '300px',
                            objectFit: 'cover'
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="bg-light d-flex align-items-center justify-content-center"
                          style={{ width: '350px', height: '300px' }}
                        >
                          <span className="text-muted">🍰</span>
                        </div>
                      )}
                      <div className="d-flex flex-column justify-content-center p-4 flex-grow-1 text-center text-md-start">
                        <h3
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontStyle: 'italic',
                            color: '#6B5B4F',
                            fontSize: '1.5rem'
                          }}
                        >
                          {producto.nombre}
                        </h3>
                        <p className="text-muted mb-3">{producto.descripcion}</p>
                        <p
                          className="fw-bold fs-4 mb-3"
                          style={{ color: '#8B7355' }}
                        >
                          ${formatearPrecio(producto.precio)}
                        </p>
                        <div>
                          <span
                            className="btn"
                            style={{
                              backgroundColor: '#F59E0B',
                              color: 'white',
                              borderRadius: '9999px',
                              padding: '10px 24px',
                              fontWeight: '500'
                            }}
                          >
                            Ver Producto
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

        <button
          className="carousel-control-prev d-none d-md-flex"
          type="button"
          data-bs-target="#productosCarousel"
          data-bs-slide="prev"
          style={{ width: '60px', left: '-30px' }}
        >
          <span
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '44px',
              height: '44px',
              border: '2px solid #F59E0B',
              borderRadius: '50%',
              backgroundColor: 'white',
              color: '#F59E0B',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            ‹
          </span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next d-none d-md-flex"
          type="button"
          data-bs-target="#productosCarousel"
          data-bs-slide="next"
          style={{ width: '60px', right: '-30px' }}
        >
          <span
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '44px',
              height: '44px',
              border: '2px solid #F59E0B',
              borderRadius: '50%',
              backgroundColor: 'white',
              color: '#F59E0B',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            ›
          </span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="text-center mt-4">
        <Link
          to="/productos"
          className="btn btn-lg"
          style={{
            backgroundColor: '#F59E0B',
            color: 'white',
            borderRadius: '9999px',
            padding: '12px 32px',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#D97706'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#F59E0B'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Ver Todos los Productos
        </Link>
      </div>
    </section>
  )
}

export default InicioProductosDestacados
