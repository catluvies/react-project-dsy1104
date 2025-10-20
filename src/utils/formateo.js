// funciones para formatear números y textos

// formatea precio con puntos para miles
export const formatearPrecio = (precio) => {
  return precio.toLocaleString('es-CL')
}

// convierte categorías con guiones a formato bonito
export const formatearCategoria = (categoria) => {
  // cambiar guiones por espacios
  const palabras = categoria.replace(/-/g, ' ').split(' ')

  // poner mayúsculas
  const palabrasCapitalizadas = palabras.map(palabra => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1)
  })

  // juntar todo
  return palabrasCapitalizadas.join(' ')
}

// quita los guiones bajos del estado
export const formatearEstado = (estado) => {
  return estado.replace(/_/g, ' ')
}
