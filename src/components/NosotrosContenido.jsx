function NosotrosContenido() {
  return (
    <>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Sobre Nosotros</h1>
          <p className="lead">50 años endulzando a Chile</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="mb-4">Nuestra Historia</h2>
              <p>
                Mil Sabores nació en 1975 en el corazón de Santiago, cuando doña Carmen abrió
                las puertas de su pequeña pastelería familiar. Con recetas heredadas de su
                abuela y mucho amor por la repostería, comenzó a endulzar los momentos
                especiales de las familias chilenas.
              </p>
              <p>
                En 1995, participamos en el récord Guinness de la torta más grande de Chile,
                un hito que marcó nuestra pasión por la repostería a gran escala. Hoy,
                50 años después, seguimos usando las mismas recetas tradicionales combinadas
                con técnicas modernas.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="/images/nosotros/guiness_torta_gigante.jpg"
                alt="Historia de Mil Sabores - Pastelería familiar desde 1975"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 order-md-2 mb-4 mb-md-0">
              <h2 className="mb-4">Nuestra Misión</h2>
              <p>
                Crear momentos memorables a través de nuestros productos, manteniendo
                la calidad y el sabor tradicional que nos ha caracterizado por cinco décadas.
              </p>
              <p>
                Nos comprometemos a usar solo ingredientes de primera calidad,
                elaborar cada producto con dedicación y ofrecer un servicio excepcional
                a nuestros clientes.
              </p>
            </div>
            <div className="col-md-6 order-md-1">
              <img
                src="/images/nosotros/historia_pasteleria.jpg"
                alt="Nuestra misión - Calidad y tradición en repostería"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Nuestros Valores</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title">Calidad</h4>
                  <p className="card-text">
                    Usamos solo los mejores ingredientes en todos nuestros productos
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title">Pasión</h4>
                  <p className="card-text">
                    Cada torta es elaborada con amor y dedicación
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title">Tradición</h4>
                  <p className="card-text">
                    Mantenemos recetas familiares de generación en generación
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title">Familia</h4>
                  <p className="card-text">
                    Somos una familia que endulza familias
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Nuestro Equipo</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px', fontSize: '24px', fontWeight: 'bold'}}>
                    OB
                  </div>
                  <h5 className="card-title">Orenji Benz</h5>
                  <p className="text-muted mb-2">Maestro de la decoración</p>
                  <p className="card-text">
                    45 años de experiencia en repostería tradicional
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px', fontSize: '24px', fontWeight: 'bold'}}>
                    KW
                  </div>
                  <h5 className="card-title">Knuckles Wang</h5>
                  <p className="text-muted mb-2">Chef Ejecutivo</p>
                  <p className="card-text">
                    Especialista en repostería francesa y moderna
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px', fontSize: '24px', fontWeight: 'bold'}}>
                    SC
                  </div>
                  <h5 className="card-title">Sonic Carvajal</h5>
                  <p className="text-muted mb-2">Jefe de Producción</p>
                  <p className="card-text">
                    Experto en productos sin azúcar y veganos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default NosotrosContenido
