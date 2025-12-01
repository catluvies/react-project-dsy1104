import { useState, useEffect } from 'react'
import { productosService } from '../api/productosService'
import InicioHero from '../components/InicioHero'
import InicioCaracteristicas from '../components/InicioCaracteristicas'
import InicioProductosDestacados from '../components/InicioProductosDestacados'
import InicioCTA from '../components/InicioCTA'

function InicioPage() {
  const [productosDestacados, setProductosDestacados] = useState([])

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productos = await productosService.obtenerActivos()
        setProductosDestacados(productos.slice(0, 4))
      } catch (error) {
        console.error('Error cargando productos:', error)
      }
    }
    cargarProductos()
  }, [])

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
