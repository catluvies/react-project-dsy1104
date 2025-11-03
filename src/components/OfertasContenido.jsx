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

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <span className="badge bg-success fs-6 px-3 py-2">🎂 OFERTA EXCLUSIVA</span>
                  </div>

                  <h2 className="card-title text-center mb-3">Torta Gratis por tu Cumpleaños</h2>

                  <p className="text-center mb-4">
                    Por ser estudiante de DuocUC, te regalamos una deliciosa torta
                    en el mes de tu cumpleaños. ¡Celebra con Mil Sabores!
                  </p>

                  <div className="alert alert-info">
                    <strong>📢 Nota:</strong> Esta es nuestra primera promoción especial.
                    Pronto agregaremos más ofertas exclusivas para nuestros clientes.
                    ¡Mantente atento!
                  </div>

                  <div className="bg-light p-4 rounded text-center mb-4">
                    <p className="text-muted mb-2">Código de Cupón</p>
                    <h3 className="fw-bold text-primary mb-0">{codigoCupon}</h3>
                  </div>

                  <div className="mb-4">
                    <h5 className="mb-3">¿Cómo canjear tu torta?</h5>
                    <ol>
                      <li>Presenta tu credencial de estudiante DuocUC vigente</li>
                      <li>Muestra este cupón en tu cumpleaños o durante todo el mes</li>
                      <li>Elige tu torta favorita de nuestro catálogo</li>
                      <li>¡Disfruta de tu regalo!</li>
                    </ol>
                  </div>

                  <div className="alert alert-secondary">
                    <strong>Términos y condiciones:</strong>
                    <ul className="mb-0 mt-2">
                      <li>Válido solo para estudiantes DuocUC con credencial vigente</li>
                      <li>Una torta por estudiante durante el mes de cumpleaños</li>
                      <li>Tortas disponibles: hasta $15.000</li>
                      <li>Válido hasta: {fechaValidez}</li>
                      <li>No acumulable con otras promociones</li>
                    </ul>
                  </div>

                  <div className="text-center mt-4">
                    <Link to="/productos" className="btn btn-primary btn-lg">
                      Ver Tortas Disponibles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="text-center mb-4">¿Por qué elegir Mil Sabores?</h4>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <div className="fs-1 mb-3">🎂</div>
                    <h6 className="card-title">Ingredientes Frescos</h6>
                    <p className="card-text">
                      Elaboradas con los mejores ingredientes del día
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <div className="fs-1 mb-3">⭐</div>
                    <h6 className="card-title">Calidad Garantizada</h6>
                    <p className="card-text">
                      Más de 10 años endulzando momentos especiales
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 text-center border-0 shadow-sm">
                  <div className="card-body">
                    <div className="fs-1 mb-3">🚚</div>
                    <h6 className="card-title">Entrega a Domicilio</h6>
                    <p className="card-text">
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
          <h3 className="mb-3">¿Tienes dudas sobre la promoción?</h3>
          <p className="mb-4">
            Contáctanos y te ayudaremos a canjear tu torta de cumpleaños
          </p>
          <Link to="/contacto" className="btn btn-primary btn-lg">
            Contactar
          </Link>
        </div>
      </section>
    </>
  )
}

export default OfertasContenido
