import { Link } from 'react-router-dom'

function OfertasContenido() {
  const codigoCupon = 'DUOC2025'
  const fechaValidez = '31/12/2025'

  return (
    <>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Ofertas y Promociones</h1>
          <p className="lead">Conoce nuestras promociones especiales</p>
          <p className="mb-0">¡Próximamente más ofertas exclusivas!</p>
        </div>
      </section>

      <section className="contacto-bg-decorativo py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="glass-form-container">
                {/* Decoraciones flotantes */}
                <div className="floating-decoration floating-heart" style={{ top: '-16px', left: '-16px', fontSize: '24px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <div className="floating-decoration floating-star" style={{ top: '-8px', right: '-24px', fontSize: '20px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>

                <div className="glass-card">
                  {/* Barra de título */}
                  <div className="glass-title-bar">
                    <span className="title-text">Oferta Especial</span>
                    <div className="window-buttons">
                      <span className="window-btn window-btn-minimize"></span>
                      <span className="window-btn window-btn-maximize"></span>
                      <span className="window-btn window-btn-close"></span>
                    </div>
                  </div>

                  <div className="p-4 p-md-5">
                    <div className="text-center mb-4">
                      <span className="badge fs-6 px-3 py-2" style={{ backgroundColor: '#22C55E', color: 'white' }}>🎂 OFERTA EXCLUSIVA</span>
                    </div>

                    <h2 className="text-center mb-3" style={{ color: '#8B4513' }}>Torta Gratis por tu Cumpleaños</h2>

                    <p className="text-center mb-4 text-muted">
                      Por ser estudiante de DuocUC, te regalamos una deliciosa torta
                      en el mes de tu cumpleaños. ¡Celebra con Mil Sabores!
                    </p>

                    <div className="glass-alert-info mb-4">
                      <strong>📢 Nota:</strong> Esta es nuestra primera promoción especial.
                      Pronto agregaremos más ofertas exclusivas para nuestros clientes.
                      ¡Mantente atento!
                    </div>

                    <div className="glass-cupon-box text-center mb-4">
                      <p className="text-muted mb-2 small">Código de Cupón</p>
                      <h3 className="fw-bold mb-0" style={{ color: '#8B4513' }}>{codigoCupon}</h3>
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-3" style={{ color: '#8B4513' }}>¿Cómo canjear tu torta?</h5>
                      <ol className="text-muted">
                        <li>Presenta tu credencial de estudiante DuocUC vigente</li>
                        <li>Muestra este cupón en tu cumpleaños o durante todo el mes</li>
                        <li>Elige tu torta favorita de nuestro catálogo</li>
                        <li>¡Disfruta de tu regalo!</li>
                      </ol>
                    </div>

                    <div className="glass-terms-box mb-4">
                      <strong>Términos y condiciones:</strong>
                      <ul className="mb-0 mt-2 text-muted small">
                        <li>Válido solo para estudiantes DuocUC con credencial vigente</li>
                        <li>Una torta por estudiante durante el mes de cumpleaños</li>
                        <li>Tortas disponibles: hasta $15.000</li>
                        <li>Válido hasta: {fechaValidez}</li>
                        <li>No acumulable con otras promociones</li>
                      </ul>
                    </div>

                    <div className="text-center">
                      <Link to="/productos" className="glass-btn">
                        Ver Tortas Disponibles
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="text-center mb-4" style={{ color: '#8B4513' }}>¿Por qué elegir Mil Sabores?</h4>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="glass-contact-card h-100 text-center">
                  <div className="glass-contact-content">
                    <div className="fs-1 mb-3">🎂</div>
                    <h6 style={{ color: '#8B4513' }}>Ingredientes Frescos</h6>
                    <p className="text-muted small mb-0">
                      Elaboradas con los mejores ingredientes del día
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-contact-card h-100 text-center">
                  <div className="glass-contact-content">
                    <div className="fs-1 mb-3">⭐</div>
                    <h6 style={{ color: '#8B4513' }}>Calidad Garantizada</h6>
                    <p className="text-muted small mb-0">
                      Más de 10 años endulzando momentos especiales
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-contact-card h-100 text-center">
                  <div className="glass-contact-content">
                    <div className="fs-1 mb-3">🚚</div>
                    <h6 style={{ color: '#8B4513' }}>Entrega a Domicilio</h6>
                    <p className="text-muted small mb-0">
                      Llevamos tu torta donde estés celebrando
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h3 className="mb-3" style={{ color: '#8B4513' }}>¿Tienes dudas sobre la promoción?</h3>
          <p className="mb-4 text-muted">
            Contáctanos y te ayudaremos a canjear tu torta de cumpleaños
          </p>
          <Link to="/contacto" className="glass-btn">
            Contactar
          </Link>
        </div>
      </section>
    </>
  )
}

export default OfertasContenido
