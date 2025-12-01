import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formateo'

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
      <h2 className="text-center mb-5">Nuestros Mejores Productos</h2>

      <div id="productosCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {productos.map((producto, index) => (
            <div key={producto.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <Link to={`/producto/${producto.id}`} className="text-decoration-none">
                    <div className="card border-2">
                      {producto.imagen ? (
                        <img src={producto.imagen} alt={producto.nombre} className="card-img-top" loading="lazy" style={{height: '300px', objectFit: 'cover'}} />
                      ) : (
                        <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{height: '300px'}}>
                          <span className="text-muted">[Imagen]</span>
                        </div>
                      )}
                      <div className="card-body text-center">
                        <h3 className="card-title h5 text-cafe">{producto.nombre}</h3>
                        <p className="card-text text-muted">{producto.descripcion}</p>
                        <p className="fw-bold fs-4 text-cafe">${formatearPrecio(producto.precio)}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#productosCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#productosCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="text-center mt-4">
        <Link to="/productos" className="btn btn-primary btn-lg">
          Ver Todos los Productos
        </Link>
      </div>
    </section>
  )
}

export default InicioProductosDestacados
