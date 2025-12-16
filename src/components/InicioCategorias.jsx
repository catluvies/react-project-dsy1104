import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { categoriasService } from '../api/categoriasService'

// Colores pastel para las cards (se asignan cíclicamente)
const COLORES_PASTEL = [
  { bg: '#E8F4EA', border: '#A8D5BA' },  // Verde menta
  { bg: '#FFF3CD', border: '#F5D779' },  // Amarillo
  { bg: '#E8E0F0', border: '#C9B8E0' },  // Lavanda
  { bg: '#FCE4EC', border: '#F8BBD9' },  // Rosa
  { bg: '#FFF8E1', border: '#FFE082' },  // Crema
  { bg: '#E3F2FD', border: '#90CAF9' },  // Azul claro
  { bg: '#F3E5F5', border: '#CE93D8' },  // Púrpura claro
  { bg: '#FFEBEE', border: '#FFCDD2' },  // Rojo claro
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

function InicioCategorias() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef(null)

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

  const obtenerColor = (index) => {
    return COLORES_PASTEL[index % COLORES_PASTEL.length]
  }

  const scrollLeft = () => {
    if (containerRef.current) {
      const newPosition = Math.max(0, scrollPosition - 300)
      containerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth
      const newPosition = Math.min(maxScroll, scrollPosition + 300)
      containerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft)
    }
  }

  if (cargando) {
    return (
      <section className="py-5" style={{ backgroundColor: '#FFFEF7' }}>
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </section>
    )
  }

  if (categorias.length === 0) return null

  const canScrollLeft = scrollPosition > 0
  const canScrollRight = containerRef.current
    ? scrollPosition < containerRef.current.scrollWidth - containerRef.current.clientWidth - 10
    : categorias.length > 4

  return (
    <section className="py-5" style={{ backgroundColor: '#FFFEF7' }}>
      <div className="container">
        {/* Decoración superior */}
        <div className="text-center mb-2">
          <span style={{ color: '#F8BBD9', fontSize: '1.5rem' }}>❀</span>
        </div>
        <div className="text-center mb-1">
          <span style={{ fontSize: '2rem' }}>🧁</span>
        </div>

        {/* Título */}
        <div className="text-center mb-4">
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '2.5rem',
              color: '#8B7355',
              fontWeight: '400'
            }}
          >
            Nuestras Categorías
          </h2>
          <p className="text-muted">Encuentra tu dulce favorito</p>
        </div>

        {/* Carrusel horizontal con flechas */}
        <div className="position-relative">
          {/* Flecha izquierda - siempre visible */}
          <button
            onClick={scrollLeft}
            className="btn position-absolute d-flex align-items-center justify-content-center"
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
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              opacity: canScrollLeft ? 1 : 0.4,
              cursor: canScrollLeft ? 'pointer' : 'default'
            }}
            disabled={!canScrollLeft}
          >
            ‹
          </button>

          {/* Contenedor de categorías con scroll */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="d-flex gap-4 px-3"
            style={{
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style>
              {`
                .categoria-scroll::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {categorias.map((categoria, index) => {
              const color = obtenerColor(index)
              const emoji = obtenerEmoji(categoria)

              return (
                <Link
                  key={categoria.id}
                  to={`/productos?categoria=${categoria.id}`}
                  className="text-decoration-none flex-shrink-0"
                  style={{ width: '220px' }}
                >
                  <div
                    className="card h-100 text-center"
                    style={{
                      backgroundColor: color.bg,
                      border: `3px dashed ${color.border}`,
                      borderRadius: '20px',
                      padding: '24px 16px',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      cursor: 'pointer',
                      minHeight: '200px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div className="card-body d-flex flex-column align-items-center justify-content-center p-0">
                      <span style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>
                        {emoji}
                      </span>
                      <h6
                        className="mb-2"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontStyle: 'italic',
                          color: '#6B5B4F',
                          fontWeight: '600',
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
              )
            })}
          </div>

          {/* Flecha derecha - siempre visible */}
          <button
            onClick={scrollRight}
            className="btn position-absolute d-flex align-items-center justify-content-center"
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
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              opacity: canScrollRight ? 1 : 0.4,
              cursor: canScrollRight ? 'pointer' : 'default'
            }}
            disabled={!canScrollRight}
          >
            ›
          </button>
        </div>

        {/* Indicador de scroll */}
        <div className="text-center mt-4">
          <small className="text-muted">
            ← Desliza para ver más →
          </small>
        </div>

        {/* Decoración inferior */}
        <div className="text-center mt-3">
          <span style={{ color: '#ddd', fontSize: '1.2rem' }}>❧</span>
        </div>
      </div>
    </section>
  )
}

export default InicioCategorias
