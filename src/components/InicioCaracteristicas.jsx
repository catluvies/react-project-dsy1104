function InicioCaracteristicas() {
  const caracteristicas = [
    {
      titulo: '50 años',
      descripcion: 'de experiencia',
      imagen: '/images/detalles/excelencia-index.png',
      cardClass: 'card-aero card-aero-amarillo'
    },
    {
      titulo: 'Hecho con amor',
      descripcion: 'Recetas tradicionales',
      imagen: '/images/detalles/hecho-amor-index.png',
      cardClass: 'card-aero card-aero-rosa'
    },
    {
      titulo: 'Ingredientes frescos',
      descripcion: 'Productos del día',
      imagen: '/images/detalles/ingredientes-index.png',
      cardClass: 'card-aero card-aero-verde'
    },
    {
      titulo: 'Calidad artesanal',
      descripcion: 'Elaboración diaria',
      imagen: '/images/detalles/artesanal-index.png',
      cardClass: 'card-aero card-aero-morado'
    }
  ]

  return (
    <section className="py-4" style={{ backgroundColor: 'transparent' }}>
      <div className="container">
        <div className="row g-3 g-md-4 justify-content-center">
        {caracteristicas.map((item, index) => (
          <div key={index} className="col-6 col-md-3">
            <div
              className={`${item.cardClass} h-100 text-center`}
              style={{ padding: '24px 16px' }}
            >
              <div className="d-flex flex-column align-items-center justify-content-center p-0">
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="card-aero-icon"
                />
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
                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
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
