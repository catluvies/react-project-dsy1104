function InicioCaracteristicas() {
  const caracteristicas = [
    { titulo: '50 años', descripcion: 'de experiencia', emoji: '🎂', bg: 'rgba(255, 251, 235, 0.85)', border: '#FCD34D' },
    { titulo: 'Hecho con amor', descripcion: 'Recetas tradicionales', emoji: '💕', bg: 'rgba(253, 242, 248, 0.85)', border: '#F9A8D4' },
    { titulo: 'Ingredientes frescos', descripcion: 'Productos del día', emoji: '🌿', bg: 'rgba(240, 253, 244, 0.85)', border: '#86EFAC' },
    { titulo: 'Calidad artesanal', descripcion: 'Elaboración diaria', emoji: '✨', bg: 'rgba(250, 245, 255, 0.85)', border: '#C4B5FD' }
  ]

  return (
    <section className="py-4" style={{ backgroundColor: 'transparent' }}>
      <div className="container">
        <div className="row g-3 g-md-4 justify-content-center">
        {caracteristicas.map((item, index) => (
          <div key={index} className="col-6 col-md-3">
            <div
              className="card h-100 text-center"
              style={{
                backgroundColor: item.bg,
                border: `3px dashed ${item.border}`,
                borderRadius: '20px',
                padding: '24px 16px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
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
              <div className="card-body d-flex flex-column align-items-center justify-content-center p-0">
                <span style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{item.emoji}</span>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                    color: '#6B5B4F',
                    fontWeight: '500',
                    marginBottom: '0.5rem'
                  }}
                >
                  {item.titulo}
                </h3>
                <p className="card-text text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                  {item.descripcion}
                </p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  )
}

export default InicioCaracteristicas
