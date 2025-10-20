import CarritoContenido from '../components/CarritoContenido'

// Página del carrito de compras
function CarritoPage(props) {
  return (
    <CarritoContenido
      carrito={props.carrito}
      subtotal={props.subtotal}
      eliminarDelCarrito={props.eliminarDelCarrito}
      actualizarCantidad={props.actualizarCantidad}
    />
  )
}

export default CarritoPage
