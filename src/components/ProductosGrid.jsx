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
        // Si tiene variantes activas, usar el precio mínimo de las variantes activas
        const variantesActivas = producto.variantes?.filter(v => v.activo) || []
        const tieneVariantes = variantesActivas.length > 0
        const precioBase = tieneVariantes
          ? Math.min(...variantesActivas.map(v => v.precio))
          : (producto.precio || 0)
        const imagenUrl = productosService.obtenerUrlImagen(producto.imagenUrl)

        return (
          <div key={producto.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <Link
              to={`/producto/${producto.id}`}
              className="card-glass h-100 text-decoration-none d-block"
              style={{transition: 'all 0.3s ease'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(139, 69, 19, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 69, 19, 0.1)'
              }}
            >
              {imagenUrl ? (
                <img
                  src={imagenUrl}
                  alt={producto.nombre}
                  className="img-fluid"
                  style={{height: '200px', objectFit: 'cover', width: '100%', borderRadius: '20px 20px 0 0'}}
                  loading="lazy"
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center" style={{height: '200px', backgroundColor: 'rgba(255,182,193,0.2)', borderRadius: '20px 20px 0 0'}}>
                  <span style={{fontSize: '4rem'}}>🍰</span>
                </div>
              )}

              <div className="p-3 d-flex flex-column" style={{minHeight: '160px'}}>
                {/* Categoría y stock en la misma línea */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  {producto.categoriaNombre && (
                    <span className="badge-glass badge-glass-cafe" style={{fontSize: '0.7rem'}}>
                      {producto.categoriaNombre}
                    </span>
                  )}
                  {producto.stock === 0 && (
                    <span className="badge-glass badge-glass-rojo" style={{fontSize: '0.65rem'}}>
                      Sin stock
                    </span>
                  )}
                  {producto.stock > 0 && producto.stock <= 5 && (
                    <span className="badge-glass badge-glass-rojo" style={{fontSize: '0.65rem'}}>
                      ¡Últimas!
                    </span>
                  )}
                </div>

                <h5 className="mb-1" style={{color: '#5a4035', fontWeight: '600', fontSize: '1rem', lineHeight: '1.3'}}>{producto.nombre}</h5>

                <p className="text-muted small flex-grow-1 mb-2" style={{lineHeight: '1.4', fontSize: '0.8rem'}}>
                  {truncarTexto(producto.descripcion, 60)}
                </p>

                <div className="mt-auto">
                  {tieneVariantes && (
                    <small className="text-muted d-block" style={{fontSize: '0.7rem'}}>Desde</small>
                  )}
                  <span style={{fontWeight: 'bold', color: '#D97706', fontSize: '1.25rem'}}>
                    ${formatearPrecio(precioBase)}
                  </span>
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
