import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formateo'
import { truncarTexto } from '../utils/helpers'
import { productosService } from '../api/productosService'

function ProductosGrid({ productos }) {
  if (productos.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">No se encontraron productos con los filtros aplicados.</p>
      </div>
    )
  }

  return (
    <div className="row">
      {productos.map(producto => {
        const precio = producto.precio || 0
        const imagenUrl = productosService.obtenerUrlImagen(producto.imagenUrl)

        return (
          <div key={producto.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <Link
              to={`/producto/${producto.id}`}
              className="card h-100 text-decoration-none"
              style={{transition: 'transform 0.2s'}}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {imagenUrl ? (
                <img
                  src={imagenUrl}
                  alt={producto.nombre}
                  className="card-img-top img-fluid"
                  style={{height: '200px', objectFit: 'cover'}}
                  loading="lazy"
                />
              ) : (
                <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{height: '200px'}}>
                  <span className="text-muted">Sin imagen</span>
                </div>
              )}

              <div className="card-body d-flex flex-column">
                {producto.categoriaNombre && (
                  <span className="badge bg-primary mb-2 align-self-start">
                    {producto.categoriaNombre}
                  </span>
                )}

                <h5 className="card-title">{producto.nombre}</h5>

                <p className="card-text text-muted small flex-grow-1">
                  {truncarTexto(producto.descripcion, 80)}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="fw-bold text-primary">
                    ${formatearPrecio(precio)}
                  </span>
                  {producto.stock === 0 && (
                    <span className="badge bg-danger">Sin stock</span>
                  )}
                  {producto.stock > 0 && producto.stock <= 5 && (
                    <span className="badge bg-warning text-dark">Pocas unidades</span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default ProductosGrid
