import { motion } from 'framer-motion'

function InicioCaracteristicas() {
  const caracteristicas = [
    { titulo: '50 años', descripcion: 'de experiencia' },
    { titulo: 'Hecho con amor', descripcion: 'Recetas tradicionales' },
    { titulo: 'Ingredientes frescos', descripcion: 'Productos del día' },
    { titulo: 'Calidad artesanal', descripcion: 'Elaboración diaria' }
  ]

  return (
    <section className="container my-5 position-relative overflow-hidden">
      {/* Emojis kawaii flotantes */}
      <motion.span
        className="position-absolute"
        style={{ top: '1rem', left: '1rem', fontSize: '1.5rem', opacity: 0.5 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        🍰
      </motion.span>

      <motion.span
        className="position-absolute"
        style={{ top: '2rem', right: '2rem', fontSize: '1.3rem', opacity: 0.45 }}
        animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🍓
      </motion.span>

      <motion.span
        className="position-absolute"
        style={{ bottom: '1rem', left: '3rem', fontSize: '1.4rem', opacity: 0.4 }}
        animate={{ y: [0, -6, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        🧁
      </motion.span>

      <motion.span
        className="position-absolute"
        style={{ top: '50%', left: '0', fontSize: '1.2rem', opacity: 0.35 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        🍩
      </motion.span>

      <motion.span
        className="position-absolute"
        style={{ bottom: '2rem', right: '1.5rem', fontSize: '1.5rem', opacity: 0.5 }}
        animate={{ y: [0, -7, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        🍪
      </motion.span>

      <motion.span
        className="position-absolute"
        style={{ top: '1.5rem', left: '50%', fontSize: '1.3rem', opacity: 0.4 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        🎀
      </motion.span>

      <motion.span
        className="position-absolute"
        style={{ bottom: '0.5rem', right: '50%', fontSize: '1.2rem', opacity: 0.45 }}
        animate={{ y: [0, -9, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        🥧
      </motion.span>

      <div className="row g-4">
        {caracteristicas.map((item, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <div className="card h-100 text-center p-4 border-2">
              <div className="card-body">
                <h3 className="card-title h5 text-cafe">{item.titulo}</h3>
                <p className="card-text text-muted">{item.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default InicioCaracteristicas
