import './NosotrosContenido.css'

// Componente que muestra el contenido de la página Sobre Nosotros
function NosotrosContenido() {
  return (
    <>
      {/* Hero */}
      <section className="nosotros-hero">
        <div className="nosotros-hero__contenedor">
          <h1 className="nosotros-hero__titulo">Sobre Nosotros</h1>
          <p className="nosotros-hero__descripcion">50 años endulzando a Chile</p>
        </div>
      </section>

      {/* Historia */}
      <section className="nosotros-seccion">
        <div className="nosotros-contenido">
          <div className="nosotros-texto">
            <h2>Nuestra Historia</h2>
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
          <div className="nosotros-imagen">
            <img 
              src="/src/assets/images/nosotros/historia-pasteleria.jpg"
              alt="Historia de Mil Sabores - Pastelería familiar desde 1975"
              className="nosotros-imagen__img"
            />
          </div>
        </div>
      </section>

      {/* Misión */}
      <section className="nosotros-seccion nosotros-seccion--gris">
        <div className="nosotros-contenido nosotros-contenido--inverso">
          <div className="nosotros-texto">
            <h2>Nuestra Misión</h2>
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
          <div className="nosotros-imagen">
            <img 
              src="/src/assets/images/nosotros/mision-calidad.jpg"
              alt="Nuestra misión - Calidad y tradición en repostería"
              className="nosotros-imagen__img"
            />
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="nosotros-seccion">
        <h2 className="nosotros-titulo-seccion">Nuestros Valores</h2>
        <div className="nosotros-valores">
          <div className="nosotros-valor-card">
            <h4 className="nosotros-valor-card__titulo">Calidad</h4>
            <p className="nosotros-valor-card__descripcion">
              Usamos solo los mejores ingredientes en todos nuestros productos
            </p>
          </div>
          <div className="nosotros-valor-card">
            <h4 className="nosotros-valor-card__titulo">Pasión</h4>
            <p className="nosotros-valor-card__descripcion">
              Cada torta es elaborada con amor y dedicación
            </p>
          </div>
          <div className="nosotros-valor-card">
            <h4 className="nosotros-valor-card__titulo">Tradición</h4>
            <p className="nosotros-valor-card__descripcion">
              Mantenemos recetas familiares de generación en generación
            </p>
          </div>
          <div className="nosotros-valor-card">
            <h4 className="nosotros-valor-card__titulo">Familia</h4>
            <p className="nosotros-valor-card__descripcion">
              Somos una familia que endulza familias
            </p>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="nosotros-seccion nosotros-seccion--gris">
        <h2 className="nosotros-titulo-seccion">Nuestro Equipo</h2>
        <div className="nosotros-equipo">
          <div className="nosotros-miembro-card">
            <div className="nosotros-miembro-card__avatar">OB</div>
            <h5 className="nosotros-miembro-card__nombre">Orenji Benz</h5>
            <p className="nosotros-miembro-card__cargo">Maestro de la decoración</p>
            <p className="nosotros-miembro-card__descripcion">
              45 años de experiencia en repostería tradicional
            </p>
          </div>
          <div className="nosotros-miembro-card">
            <div className="nosotros-miembro-card__avatar">KW</div>
            <h5 className="nosotros-miembro-card__nombre">Knuckles Wang</h5>
            <p className="nosotros-miembro-card__cargo">Chef Ejecutivo</p>
            <p className="nosotros-miembro-card__descripcion">
              Especialista en repostería francesa y moderna
            </p>
          </div>
          <div className="nosotros-miembro-card">
            <div className="nosotros-miembro-card__avatar">SC</div>
            <h5 className="nosotros-miembro-card__nombre">Sonic Carvajal</h5>
            <p className="nosotros-miembro-card__cargo">Jefe de Producción</p>
            <p className="nosotros-miembro-card__descripcion">
              Experto en productos sin azúcar y veganos
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default NosotrosContenido
