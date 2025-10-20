import DetalleProductoContenido from '../components/DetalleProductoContenido'

// Página de detalle de producto
function DetalleProductoPage(props) {
  return <DetalleProductoContenido agregarAlCarrito={props.agregarAlCarrito} />
}

export default DetalleProductoPage
