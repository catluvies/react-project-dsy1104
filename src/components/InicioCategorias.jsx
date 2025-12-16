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

// Emojis por defecto según nombre de categoría
const EMOJIS_DEFAULT = {
  'tortas': '🎂',
  'torta': '🎂',
  'kuchen': '🥧',
  'postres': '🍮',
  'postre': '🍮',
  'galletas': '🍪',
  'galleta': '🍪',
  'cupcakes': '🧁',
  'cupcake': '🧁',
  'alfajores': '🥮',
  'alfajor': '🥮',
  'chocolates': '🍫',
  'chocolate': '🍫',
  'dulces': '🍬',
  'dulce': '🍬',
  'bebidas': '☕',
  'café': '☕',
  'cafe': '☕',
  'panes': '🥐',
  'pan': '🥐',
  'helados': '🍦',
  'helado': '🍦',
  'frutas': '🍓',
  'fruta': '🍓',
  'especiales': '⭐',
  'especial': '⭐',
  'vegano': '🌱',
  'saludable': '🥗',
  'cumpleaños': '🎉',
  'bodas': '💒',
  'eventos': '🎊',
}

const ITEMS_POR_PAGINA = 4

function InicioCategorias() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [paginaActual, setPaginaActual] = useState(0)

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

  const obtenerEmoji = (categoria) => {
    if (categoria.imagenUrl?.startsWith('emoji:')) {
      return categoria.imagenUrl.replace('emoji:', '')
    }
    const nombreLower = categoria.nombre.toLowerCase()
    for (const [key, emoji] of Object.entries(EMOJIS_DEFAULT)) {
      if (nombreLower.includes(key)) return emoji
    }
    return '🍰'
  }

  const obtenerColorClass = (index) => {
    return COLORES_AERO[index % COLORES_AERO.length]
  }

  // Calcular número total de páginas
  const totalPaginas = Math.ceil(categorias.length / ITEMS_POR_PAGINA)

  // Obtener categorías de la página actual
  const categoriasVisibles = categorias.slice(
    paginaActual * ITEMS_POR_PAGINA,
    (paginaActual + 1) * ITEMS_POR_PAGINA
  )

  const irAnterior = () => {
    setPaginaActual(prev => Math.max(0, prev - 1))
  }

  const irSiguiente = () => {
    setPaginaActual(prev => Math.min(totalPaginas - 1, prev + 1))
  }

  const canGoLeft = paginaActual > 0
  const canGoRight = paginaActual < totalPaginas - 1

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
        {/* Título con estilo consistente */}
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

        {/* Grid de categorías con flechas */}
        <div className="position-relative">
          {/* Flecha izquierda */}
          <button
            onClick={irAnterior}
            className="btn btn-aero btn-aero-cafe position-absolute d-none d-md-flex align-items-center justify-content-center"
            style={{
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              padding: '0',
              zIndex: 10,
              opacity: canGoLeft ? 1 : 0.4,
              cursor: canGoLeft ? 'pointer' : 'default',
            }}
            disabled={!canGoLeft}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          {/* Grid de 4 categorías */}
          <div className="row g-3 g-md-4 justify-content-center px-md-4">
            {categoriasVisibles.map((categoria, index) => {
              const colorIndex = paginaActual * ITEMS_POR_PAGINA + index
              const colorClass = obtenerColorClass(colorIndex)
              const emoji = obtenerEmoji(categoria)

              return (
                <div key={categoria.id} className="col-6 col-md-3">
                  <Link
                    to={`/productos?categoria=${categoria.id}`}
                    className="text-decoration-none d-block h-100"
                  >
                    <div
                      className={`card-aero ${colorClass} h-100 text-center`}
                      style={{
                        padding: '28px 16px',
                        minHeight: '200px'
                      }}
                    >
                      <div className="d-flex flex-column align-items-center justify-content-center p-0">
                        <span style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>
                          {emoji}
                        </span>
                        <h6
                          className="mb-2"
                          style={{
                            fontFamily: "'Pacifico', cursive",
                            color: '#6B5B4F',
                            fontWeight: '400',
                            fontSize: '1.1rem'
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
                            {categoria.descripcion.length > 35
                              ? categoria.descripcion.substring(0, 35) + '...'
                              : categoria.descripcion
                            }
                          </small>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Flecha derecha */}
          <button
            onClick={irSiguiente}
            className="btn btn-aero btn-aero-cafe position-absolute d-none d-md-flex align-items-center justify-content-center"
            style={{
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              padding: '0',
              zIndex: 10,
              opacity: canGoRight ? 1 : 0.4,
              cursor: canGoRight ? 'pointer' : 'default',
            }}
            disabled={!canGoRight}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>

        {/* Indicadores de página (solo si hay más de una página) */}
        {totalPaginas > 1 && (
          <div className="d-flex justify-content-center gap-2 mt-4">
            {Array.from({ length: totalPaginas }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPaginaActual(index)}
                className={index === paginaActual ? 'btn-aero btn-aero-cafe' : ''}
                style={{
                  width: index === paginaActual ? '28px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  backgroundColor: index === paginaActual ? '' : 'var(--color-cafe-claro)',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  padding: 0
                }}
              />
            ))}
          </div>
        )}

        {/* Flechas móviles (debajo del grid) */}
        {totalPaginas > 1 && (
          <div className="d-flex d-md-none justify-content-center gap-3 mt-3">
            <button
              onClick={irAnterior}
              className="btn btn-aero btn-aero-cafe d-flex align-items-center justify-content-center"
              style={{
                width: '48px',
                height: '48px',
                padding: '0',
                opacity: canGoLeft ? 1 : 0.4
              }}
              disabled={!canGoLeft}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button
              onClick={irSiguiente}
              className="btn btn-aero btn-aero-cafe d-flex align-items-center justify-content-center"
              style={{
                width: '48px',
                height: '48px',
                padding: '0',
                opacity: canGoRight ? 1 : 0.4
              }}
              disabled={!canGoRight}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
              </svg>
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

export default InicioCategorias
