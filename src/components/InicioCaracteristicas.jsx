import './InicioCaracteristicas.css'

// Componente que muestra las características principales del negocio
function InicioCaracteristicas() {
  // Array con las características a mostrar
  const caracteristicas = [
    { titulo: '50 años', descripcion: 'de experiencia' },
    { titulo: 'Hecho con amor', descripcion: 'Recetas tradicionales' },
    { titulo: 'Ingredientes frescos', descripcion: 'Productos del día' },
    { titulo: 'Siempre frescos', descripcion: 'Elaboración diaria' }
  ]

  return (
    <section className="inicio-caracteristicas">
      <div className="inicio-caracteristicas__contenedor">
        {caracteristicas.map((item, index) => (
          <div key={index} className="inicio-caracteristica">
            <h3 className="inicio-caracteristica__titulo">{item.titulo}</h3>
            <p className="inicio-caracteristica__descripcion">{item.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default InicioCaracteristicas
