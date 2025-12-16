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
  const [indiceActual, setIndiceActual] = useState(0)
  const carruselRef = useRef(null)

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
    // Si imagenUrl empieza con "emoji:", extraer el emoji
    if (categoria.imagenUrl?.startsWith('emoji:')) {
      return categoria.imagenUrl.replace('emoji:', '')
    }
    // Buscar emoji por nombre
    const nombreLower = categoria.nombre.toLowerCase()
    for (const [key, emoji] of Object.entries(EMOJIS_DEFAULT)) {
      if (nombreLower.includes(key)) return emoji
    }
    return '🍰' // Emoji por defecto
  }

  // Obtener color para la categoría
  const obtenerColor = (index) => {
    return COLORES_PASTEL[index % COLORES_PASTEL.length]
  }

  // Navegación del carrusel
  const itemsVisibles = 5
  const maxIndice = Math.max(0, categorias.length - itemsVisibles)

  const siguiente = () => {
    setIndiceActual(prev => Math.min(prev + 1, maxIndice))
  }

  const anterior = () => {
    setIndiceActual(prev => Math.max(prev - 1, 0))
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

        {/* Carrusel */}
        <div className="position-relative px-5">
          {/* Botón anterior */}
          <button
            onClick={anterior}
            disabled={indiceActual === 0}
            className="btn position-absolute start-0 top-50 translate-middle-y"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              zIndex: 10,
              opacity: indiceActual === 0 ? 0.5 : 1,
              cursor: indiceActual === 0 ? 'default' : 'pointer'
            }}
          >
            ‹
          </button>

          {/* Cards */}
          <div className="overflow-hidden" ref={carruselRef}>
            <div
              className="d-flex gap-3 transition-transform"
              style={{
                transform: `translateX(-${indiceActual * (100 / itemsVisibles)}%)`,
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              {categorias.map((categoria, index) => {
                const color = obtenerColor(index)
                const emoji = obtenerEmoji(categoria)

                return (
                  <Link
                    key={categoria.id}
                    to={`/productos?categoria=${categoria.id}`}
                    className="text-decoration-none flex-shrink-0"
                    style={{ width: `calc(${100 / itemsVisibles}% - 12px)` }}
                  >
                    <div
                      className="card h-100 text-center p-3"
                      style={{
                        backgroundColor: color.bg,
                        border: `2px dashed ${color.border}`,
                        borderRadius: '16px',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer',
                        minHeight: '180px'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)'
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <div className="card-body d-flex flex-column align-items-center justify-content-center">
                        <span style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                          {emoji}
                        </span>
                        <h6
                          className="mb-1"
                          style={{
                            color: '#6B5B4F',
                            fontWeight: '600',
                            fontSize: '1rem'
                          }}
                        >
                          {categoria.nombre}
                        </h6>
                        {categoria.descripcion && (
                          <small
                            style={{
                              color: '#9E8E7E',
                              fontSize: '0.8rem'
                            }}
                          >
                            {categoria.descripcion.length > 30
                              ? categoria.descripcion.substring(0, 30) + '...'
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

          {/* Botón siguiente */}
          <button
            onClick={siguiente}
            disabled={indiceActual >= maxIndice}
            className="btn position-absolute end-0 top-50 translate-middle-y"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              zIndex: 10,
              opacity: indiceActual >= maxIndice ? 0.5 : 1,
              cursor: indiceActual >= maxIndice ? 'default' : 'pointer'
            }}
          >
            ›
          </button>
        </div>

        {/* Indicadores */}
        <div className="text-center mt-4">
          <div className="d-flex justify-content-center gap-2">
            {Array.from({ length: Math.ceil(categorias.length / itemsVisibles) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndiceActual(i * itemsVisibles > maxIndice ? maxIndice : i * itemsVisibles)}
                className="btn p-0"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: Math.floor(indiceActual / itemsVisibles) === i ? '#8B7355' : '#ddd',
                  border: 'none',
                  transition: 'background-color 0.2s'
                }}
              />
            ))}
          </div>
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
