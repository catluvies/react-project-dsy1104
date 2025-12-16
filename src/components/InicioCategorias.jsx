import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoriasService } from '../api/categoriasService'

// Colores aero para las cards (se asignan cíclicamente)
const COLORES_AERO = [
  'card-aero-verde',
  'card-aero-amarillo',
  'card-aero-rosa',
  'card-aero-morado',
]

function InicioCategorias() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      const categoriasData = await categoriasService.obtenerActivas()
      setCategorias(categoriasData)
    } catch (error) {
      console.error('Error cargando categorías:', error)
    } finally {
      setCargando(false)
    }
  }

  const obtenerColorClass = (index) => {
    return COLORES_AERO[index % COLORES_AERO.length]
  }

  if (cargando) {
    return (
      <section className="py-5" style={{ backgroundColor: 'transparent' }}>
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </section>
    )
  }

  if (categorias.length === 0) return null

  return (
    <section className="py-5" style={{ backgroundColor: 'transparent' }}>
      <div className="container">
        {/* Título */}
        <div className="text-center mb-4">
          <h2
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: '2.2rem',
              color: 'var(--color-cafe-oscuro)',
              marginBottom: '0.5rem'
            }}
          >
            Nuestras Categorías
          </h2>
          <p className="text-muted">Encuentra tu dulce favorito</p>
        </div>

        {/* Grid flexible de categorías */}
        <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-4">
          {categorias.map((categoria, index) => {
            const colorClass = obtenerColorClass(index)
            const imagenUrl = categoriasService.obtenerUrlImagen(categoria.imagenUrl)

            return (
              <Link
                key={categoria.id}
                to={`/productos?categoria=${categoria.id}`}
                className="text-decoration-none"
                style={{
                  flex: '0 0 auto',
                  width: 'calc(50% - 12px)',
                  maxWidth: '220px',
                  minWidth: '150px'
                }}
              >
                <div
                  className={`card-aero ${colorClass} h-100 text-center`}
                  style={{
                    padding: '20px 16px',
                    minHeight: imagenUrl ? '220px' : '160px'
                  }}
                >
                  <div className="d-flex flex-column align-items-center justify-content-center h-100">
                    {/* Imagen de la categoría */}
                    {imagenUrl && (
                      <img
                        src={imagenUrl}
                        alt={categoria.nombre}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          marginBottom: '12px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                    )}
                    <h6
                      className="mb-2"
                      style={{
                        fontFamily: "'Pacifico', cursive",
                        color: '#6B5B4F',
                        fontWeight: '400',
                        fontSize: '1.2rem'
                      }}
                    >
                      {categoria.nombre}
                    </h6>
                    {categoria.descripcion && (
                      <small
                        style={{
                          color: '#9E8E7E',
                          fontSize: '0.85rem',
                          lineHeight: '1.3'
                        }}
                      >
                        {categoria.descripcion.length > 50
                          ? categoria.descripcion.substring(0, 50) + '...'
                          : categoria.descripcion
                        }
                      </small>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default InicioCategorias
