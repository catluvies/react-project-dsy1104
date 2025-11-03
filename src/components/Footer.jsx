import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{backgroundColor: '#654321', color: '#FFFDD0'}} className="py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-3">
            <h3 className="h5" style={{color: '#D2B48C'}}>Mil Sabores</h3>
            <p style={{color: '#F5F5DC'}}>
              50 años endulzando a Chile con las mejores tortas y postres tradicionales.
            </p>
          </div>

          <div className="col-md-3">
            <h4 className="h6" style={{color: '#D2B48C'}}>Navegación</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/productos" style={{color: '#FFFDD0'}} className="text-decoration-none">Productos</Link></li>
              <li className="mb-2"><Link to="/categorias" style={{color: '#FFFDD0'}} className="text-decoration-none">Categorías</Link></li>
              <li className="mb-2"><Link to="/ofertas" style={{color: '#FFFDD0'}} className="text-decoration-none">Ofertas</Link></li>
              <li className="mb-2"><Link to="/nosotros" style={{color: '#FFFDD0'}} className="text-decoration-none">Nosotros</Link></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h4 className="h6" style={{color: '#D2B48C'}}>Ayuda</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/contacto" style={{color: '#FFFDD0'}} className="text-decoration-none">Contacto</Link></li>
              <li className="mb-2"><Link to="/blog" style={{color: '#FFFDD0'}} className="text-decoration-none">Blog</Link></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h4 className="h6" style={{color: '#D2B48C'}}>Contacto</h4>
            <p className="mb-2">📍 Av. Providencia 1234, Santiago</p>
            <p className="mb-2">📞 +56 9 1234 5678</p>
            <p className="mb-2">✉️ contacto@milsabores.cl</p>
          </div>
        </div>

        <hr className="my-4" style={{borderColor: '#8B4513'}} />

        <div className="text-center">
          <p className="mb-0">&copy; {currentYear} Mil Sabores. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
