import { Link } from 'react-router-dom'
import './Header.css'

// Componente Header - Barra de navegación
function Header(props) {
  // Recibir el total de items del carrito como prop
  const totalItems = props.totalItems

  return (
    <header className="header">
      <div className="header__contenedor">
        <Link to="/" className="header__logo">
          <h1>Mil Sabores</h1>
        </Link>

        <nav className="header__nav">
          <Link to="/" className="header__link">Inicio</Link>
          <Link to="/productos" className="header__link">Productos</Link>
          <Link to="/categorias" className="header__link">Categorías</Link>
          <Link to="/ofertas" className="header__link">Ofertas</Link>
          <Link to="/blog" className="header__link">Blog</Link>
          <Link to="/nosotros" className="header__link">Nosotros</Link>
          <Link to="/contacto" className="header__link">Contacto</Link>
        </nav>

        <div className="header__acciones">
          <Link to="/carrito" className="header__carrito">
            🛒 Carrito
            {totalItems > 0 && <span className="header__badge">{totalItems}</span>}
          </Link>
          <Link to="/login" className="header__login">
            Ingresar
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
