function InicioCaracteristicas() {
  const caracteristicas = [
    { titulo: '50 años', descripcion: 'de experiencia' },
    { titulo: 'Hecho con amor', descripcion: 'Recetas tradicionales' },
    { titulo: 'Ingredientes frescos', descripcion: 'Productos del día' },
    { titulo: 'Siempre frescos', descripcion: 'Elaboración diaria' }
  ]

  return (
    <section className="container my-5">
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
