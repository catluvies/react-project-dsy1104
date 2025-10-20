import productosData from '../data/productos.json'
import InicioHero from '../components/InicioHero'
import InicioCaracteristicas from '../components/InicioCaracteristicas'
import InicioProductosDestacados from '../components/InicioProductosDestacados'
import InicioCTA from '../components/InicioCTA'

/**
 * Página de Inicio - SOLO ORQUESTA COMPONENTES
 */
function InicioPage() {
  const productosDestacados = productosData.slice(0, 4)

  return (
    <>
      <InicioHero />
      <InicioCaracteristicas />
      <InicioProductosDestacados productos={productosDestacados} />
      <InicioCTA />
    </>
  )
}

export default InicioPage
