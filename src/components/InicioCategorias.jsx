import { useState, useEffect } from 'react'
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

  // Obtener emoji para la categoría
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

  // Obtener color para la categoría
  const obtenerColor = (index) => {
    return COLORES_PASTEL[index % COLORES_PASTEL.length]
  }

  // Siempre mostrar 4 por página
  const itemsPorPagina = 4
  const totalPaginas = Math.ceil(categorias.length / itemsPorPagina)
  const categoriasVisibles = categorias.slice(
    paginaActual * itemsPorPagina,
    (paginaActual + 1) * itemsPorPagina
  )

  const siguiente = () => {
    setPaginaActual(prev => (prev + 1) % totalPaginas)
  }

  const anterior = () => {
    setPaginaActual(prev => (prev - 1 + totalPaginas) % totalPaginas)
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

        {/* Grid de categorías con flechas */}
        <div className="position-relative">
          {/* Botón anterior - solo si hay más de 4 categorías */}
          {categorias.length > 4 && (
            <button
              onClick={anterior}
              className="btn position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center"
              style={{
                left: '-25px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '3px solid #F59E0B',
                backgroundColor: '#fff',
                color: '#F59E0B',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              ‹
            </button>
          )}

          {/* Grid de 4 columnas */}
          <div className="row g-4 justify-content-center px-4">
            {categoriasVisibles.map((categoria, index) => {
              const color = obtenerColor(paginaActual * itemsPorPagina + index)
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
                        padding: '20px 15px',
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
                            {categoria.descripcion.length > 40
                              ? categoria.descripcion.substring(0, 40) + '...'
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

          {/* Botón siguiente - solo si hay más de 4 categorías */}
          {categorias.length > 4 && (
            <button
              onClick={siguiente}
              className="btn position-absolute top-50 translate-middle-y d-flex align-items-center justify-content-center"
              style={{
                right: '-25px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '3px solid #F59E0B',
                backgroundColor: '#fff',
                color: '#F59E0B',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              ›
            </button>
          )}
        </div>

        {/* Indicadores de página - solo si hay más de 4 categorías */}
        {categorias.length > 4 && (
          <div className="text-center mt-4">
            <div className="d-flex justify-content-center gap-2">
              {Array.from({ length: totalPaginas }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPaginaActual(i)}
                  className="btn p-0"
                  style={{
                    width: paginaActual === i ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    backgroundColor: paginaActual === i ? '#F59E0B' : '#ddd',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Decoración inferior */}
        <div className="text-center mt-4">
          <span style={{ color: '#ddd', fontSize: '1.2rem' }}>❧</span>
        </div>
      </div>
    </section>
  )
}

export default InicioCategorias
