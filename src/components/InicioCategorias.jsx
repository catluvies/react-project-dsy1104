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
            const emoji = obtenerEmoji(categoria)

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
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default InicioCategorias
