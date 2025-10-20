import { Link } from 'react-router-dom'
import './InicioHero.css'

// Componente Hero principal de la página de inicio
function InicioHero() {
  return (
    <section className="inicio-hero">
      <div className="inicio-hero__contenedor">
        <h1 className="inicio-hero__titulo">Mil Sabores</h1>
        <p className="inicio-hero__subtitulo">
          50 años endulzando a Chile con las mejores tortas y postres tradicionales
        </p>
        <div className="inicio-hero__botones">
          <Link to="/productos" className="boton boton--primario">
            Ver Productos
          </Link>
          <Link to="/nosotros" className="boton boton--secundario">
            Nuestra Historia
          </Link>
        </div>
      </div>
    </section>
  )
}

export default InicioHero
