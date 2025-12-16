import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoriasService } from '../api/categoriasService'

// Colores pastel para las cards (se asignan cíclicamente) - con transparencia
const COLORES_PASTEL = [
  { bg: 'rgba(232, 244, 234, 0.9)', border: '#A8D5BA' },  // Verde menta
  { bg: 'rgba(255, 243, 205, 0.9)', border: '#F5D779' },  // Amarillo
  { bg: 'rgba(232, 224, 240, 0.9)', border: '#C9B8E0' },  // Lavanda
  { bg: 'rgba(252, 228, 236, 0.9)', border: '#F8BBD9' },  // Rosa
  { bg: 'rgba(255, 248, 225, 0.9)', border: '#FFE082' },  // Crema
  { bg: 'rgba(227, 242, 253, 0.9)', border: '#90CAF9' },  // Azul claro
  { bg: 'rgba(243, 229, 245, 0.9)', border: '#CE93D8' },  // Púrpura claro
  { bg: 'rgba(255, 235, 238, 0.9)', border: '#FFCDD2' },  // Rojo claro
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

  const obtenerColor = (index) => {
    return COLORES_PASTEL[index % COLORES_PASTEL.length]
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

        {/* Grid de categorías con flechas */}
        <div className="position-relative">
          {/* Flecha izquierda */}
          <button
            onClick={irAnterior}
            className="btn position-absolute d-none d-md-flex align-items-center justify-content-center"
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
              opacity: canGoLeft ? 1 : 0.4,
              cursor: canGoLeft ? 'pointer' : 'default'
            }}
            disabled={!canGoLeft}
          >
            ‹
          </button>

          {/* Grid de 4 categorías */}
          <div className="row g-3 g-md-4 justify-content-center px-md-4">
            {categoriasVisibles.map((categoria, index) => {
              const colorIndex = paginaActual * ITEMS_POR_PAGINA + index
              const color = obtenerColor(colorIndex)
              const emoji = obtenerEmoji(categoria)

              return (
                <div key={categoria.id} className="col-6 col-md-3">
                  <Link
                    to={`/productos?categoria=${categoria.id}`}
                    className="text-decoration-none d-block h-100"
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
                </div>
              )
            })}
          </div>

          {/* Flecha derecha */}
          <button
            onClick={irSiguiente}
            className="btn position-absolute d-none d-md-flex align-items-center justify-content-center"
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
              opacity: canGoRight ? 1 : 0.4,
              cursor: canGoRight ? 'pointer' : 'default'
            }}
            disabled={!canGoRight}
          >
            ›
          </button>
        </div>

        {/* Indicadores de página (solo si hay más de una página) */}
        {totalPaginas > 1 && (
          <div className="d-flex justify-content-center gap-2 mt-4">
            {Array.from({ length: totalPaginas }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPaginaActual(index)}
                style={{
                  width: index === paginaActual ? '24px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: index === paginaActual ? '#F59E0B' : '#ddd',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
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
              className="btn d-flex align-items-center justify-content-center"
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                border: '3px solid #F59E0B',
                backgroundColor: 'white',
                color: '#F59E0B',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                opacity: canGoLeft ? 1 : 0.4
              }}
              disabled={!canGoLeft}
            >
              ‹
            </button>
            <button
              onClick={irSiguiente}
              className="btn d-flex align-items-center justify-content-center"
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                border: '3px solid #F59E0B',
                backgroundColor: 'white',
                color: '#F59E0B',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                opacity: canGoRight ? 1 : 0.4
              }}
              disabled={!canGoRight}
            >
              ›
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

export default InicioCategorias
