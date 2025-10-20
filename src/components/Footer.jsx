import { Link } from 'react-router-dom'
import './Footer.css'

// footer de la página
function Footer() {
  // sacar el año actual para copyright
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__contenedor">
        <div className="footer__seccion">
          <h3 className="footer__titulo">Mil Sabores</h3>
          <p className="footer__texto">
            50 años endulzando a Chile con las mejores tortas y postres tradicionales.
          </p>
        </div>

        <div className="footer__seccion">
          <h4 className="footer__subtitulo">Navegación</h4>
          <ul className="footer__links">
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/categorias">Categorías</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
          </ul>
        </div>

        <div className="footer__seccion">
          <h4 className="footer__subtitulo">Ayuda</h4>
          <ul className="footer__links">
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer__seccion">
          <h4 className="footer__subtitulo">Contacto</h4>
          <p className="footer__texto">📍 Av. Providencia 1234, Santiago</p>
          <p className="footer__texto">📞 +56 9 1234 5678</p>
          <p className="footer__texto">✉️ contacto@milsabores.cl</p>
        </div>
      </div>

      <div className="footer__copyright">
        <p>&copy; {currentYear} Mil Sabores. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
