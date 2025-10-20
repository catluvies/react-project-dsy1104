import CheckoutFormulario from '../components/CheckoutFormulario'

// Página de checkout (pago)
function CheckoutPage(props) {
  return (
    <CheckoutFormulario
      carrito={props.carrito}
      subtotal={props.subtotal}
      vaciarCarrito={props.vaciarCarrito}
    />
  )
}

export default CheckoutPage
