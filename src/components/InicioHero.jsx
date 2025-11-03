import { Link } from 'react-router-dom'

function InicioHero() {
  return (
    <section className="bg-primary text-white py-5 mb-5">
      <div className="container text-center py-5">
        <h1 className="display-2 mb-4">Mil Sabores</h1>
        <p className="lead fs-4 mb-4">
          50 años endulzando a Chile con las mejores tortas y postres tradicionales
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <Link to="/productos" className="btn btn-light btn-lg">
            Ver Productos
          </Link>
          <Link to="/nosotros" className="btn btn-secondary btn-lg">
            Nuestra Historia
          </Link>
        </div>
      </div>
    </section>
  )
}

export default InicioHero
