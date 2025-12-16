import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { productosService } from '../api/productosService'
import InicioHero from '../components/InicioHero'
import InicioCaracteristicas from '../components/InicioCaracteristicas'
import InicioCategorias from '../components/InicioCategorias'
import InicioProductosDestacados from '../components/InicioProductosDestacados'
import InicioCTA from '../components/InicioCTA'

// Configuración de emojis flotantes
const FLOATING_EMOJIS = [
  // Lado izquierdo
  { emoji: '🍰', top: '8%', left: '3%', size: '2rem', opacity: 0.5, duration: 3, delay: 0 },
  { emoji: '🧁', top: '25%', left: '5%', size: '1.8rem', opacity: 0.45, duration: 2.8, delay: 0.5 },
  { emoji: '🍩', top: '42%', left: '2%', size: '1.6rem', opacity: 0.4, duration: 3.2, delay: 0.3 },
  { emoji: '🍪', top: '58%', left: '4%', size: '1.7rem', opacity: 0.45, duration: 2.5, delay: 0.8 },
  { emoji: '🥧', top: '75%', left: '3%', size: '1.8rem', opacity: 0.5, duration: 3.5, delay: 1 },
  { emoji: '🎀', top: '90%', left: '5%', size: '1.5rem', opacity: 0.4, duration: 2.9, delay: 0.6 },

  // Lado derecho
  { emoji: '🍓', top: '10%', right: '4%', size: '1.8rem', opacity: 0.5, duration: 3.3, delay: 0.4 },
  { emoji: '🎂', top: '28%', right: '3%', size: '2rem', opacity: 0.45, duration: 2.7, delay: 0.9 },
  { emoji: '🍬', top: '45%', right: '5%', size: '1.6rem', opacity: 0.4, duration: 3.1, delay: 0.2 },
  { emoji: '🧁', top: '62%', right: '2%', size: '1.7rem', opacity: 0.5, duration: 2.6, delay: 0.7 },
  { emoji: '🍰', top: '78%', right: '4%', size: '1.9rem', opacity: 0.45, duration: 3.4, delay: 1.1 },
  { emoji: '🥮', top: '92%', right: '3%', size: '1.5rem', opacity: 0.4, duration: 2.8, delay: 0.5 },
]

function InicioPage() {
  const [productosDestacados, setProductosDestacados] = useState([])

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productos = await productosService.obtenerActivos()
        setProductosDestacados(productos.slice(0, 8))
      } catch (error) {
        console.error('Error cargando productos:', error)
      }
    }
    cargarProductos()
  }, [])

  return (
    <div className="position-relative" style={{ overflow: 'hidden' }}>
      {/* Emojis kawaii flotantes en toda la página */}
      <div
        className="position-fixed d-none d-lg-block"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        {FLOATING_EMOJIS.map((item, index) => (
          <motion.span
            key={index}
            className="position-absolute"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              fontSize: item.size,
              opacity: item.opacity,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}
            animate={{
              y: [0, -12, 0],
              rotate: index % 2 === 0 ? [0, 5, 0] : [0, -5, 0]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
          >
            {item.emoji}
          </motion.span>
        ))}
      </div>

      {/* Contenido de la página */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <InicioHero />
        <InicioCaracteristicas />
        <InicioCategorias />
        <InicioProductosDestacados productos={productosDestacados} />
        <InicioCTA />
      </div>
    </div>
  )
}

export default InicioPage
