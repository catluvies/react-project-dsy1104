import { Link } from 'react-router-dom'
import './OfertasContenido.css'

// Componente que muestra las ofertas y promociones
function OfertasContenido() {
  // Datos de la promoción
  const codigoCupon = 'DUOC2025'
  const fechaValidez = '31/12/2025'

  return (
    <>
      {/* Hero */}
      <section className="ofertas-hero">
        <div className="ofertas-hero__contenedor">
          <h1 className="ofertas-hero__titulo">Ofertas y Promociones</h1>
          <p className="ofertas-hero__subtitulo">Conoce nuestras promociones especiales</p>
          <p className="ofertas-hero__nota">¡Próximamente más ofertas exclusivas!</p>
        </div>
      </section>

      {/* Oferta Principal */}
      <section className="ofertas-principal">
        <div className="ofertas-principal__contenedor">
          <div className="ofertas-card">
            {/* Badge */}
            <div className="ofertas-badge">
              <span>🎂 OFERTA EXCLUSIVA</span>
            </div>

            {/* Título */}
            <h2 className="ofertas-card__titulo">Torta Gratis por tu Cumpleaños</h2>

            {/* Descripción */}
            <p className="ofertas-card__descripcion">
              Por ser estudiante de DuocUC, te regalamos una deliciosa torta
              en el mes de tu cumpleaños. ¡Celebra con Mil Sabores!
            </p>

            <div className="ofertas-nota">
              <strong>📢 Nota:</strong> Esta es nuestra primera promoción especial.
              Pronto agregaremos más ofertas exclusivas para nuestros clientes.
              ¡Mantente atento!
            </div>

            {/* Cupón */}
            <div className="ofertas-cupon">
              <p className="ofertas-cupon__label">Código de Cupón</p>
              <h3 className="ofertas-cupon__codigo">{codigoCupon}</h3>
            </div>

            {/* Instrucciones */}
            <div className="ofertas-instrucciones">
              <h5>¿Cómo canjear tu torta?</h5>
              <ol>
                <li>Presenta tu credencial de estudiante DuocUC vigente</li>
                <li>Muestra este cupón en tu cumpleaños o durante todo el mes</li>
                <li>Elige tu torta favorita de nuestro catálogo</li>
                <li>¡Disfruta de tu regalo!</li>
              </ol>
            </div>

            {/* Términos */}
            <div className="alerta alerta--info ofertas-terminos">
              <strong>Términos y condiciones:</strong>
              <ul>
                <li>Válido solo para estudiantes DuocUC con credencial vigente</li>
                <li>Una torta por estudiante durante el mes de cumpleaños</li>
                <li>Tortas disponibles: hasta $15.000</li>
                <li>Válido hasta: {fechaValidez}</li>
                <li>No acumulable con otras promociones</li>
              </ul>
            </div>

            {/* Botón */}
            <Link to="/productos" className="ofertas-boton">
              Ver Tortas Disponibles
            </Link>
          </div>
        </div>

        {/* Información adicional */}
        <div className="ofertas-info">
          <h4 className="ofertas-info__titulo">¿Por qué elegir Mil Sabores?</h4>
          <div className="ofertas-info__grid">
            <div className="ofertas-info-card">
              <div className="ofertas-info-card__icono">🎂</div>
              <h6 className="ofertas-info-card__titulo">Ingredientes Frescos</h6>
              <p className="ofertas-info-card__descripcion">
                Elaboradas con los mejores ingredientes del día
              </p>
            </div>
            <div className="ofertas-info-card">
              <div className="ofertas-info-card__icono">⭐</div>
              <h6 className="ofertas-info-card__titulo">Calidad Garantizada</h6>
              <p className="ofertas-info-card__descripcion">
                Más de 10 años endulzando momentos especiales
              </p>
            </div>
            <div className="ofertas-info-card">
              <div className="ofertas-info-card__icono">🚚</div>
              <h6 className="ofertas-info-card__titulo">Entrega a Domicilio</h6>
              <p className="ofertas-info-card__descripcion">
                Llevamos tu torta donde estés celebrando
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="ofertas-cta">
        <div className="ofertas-cta__contenedor">
          <h3 className="ofertas-cta__titulo">¿Tienes dudas sobre la promoción?</h3>
          <p className="ofertas-cta__descripcion">
            Contáctanos y te ayudaremos a canjear tu torta de cumpleaños
          </p>
          <Link to="/contacto" className="ofertas-cta__boton">
            Contactar
          </Link>
        </div>
      </section>
    </>
  )
}

export default OfertasContenido
