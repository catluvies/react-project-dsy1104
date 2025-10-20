/**
 * UTILIDADES DE FORMATEO
 * Funciones para formatear datos para visualización
 */

/**
 * Formatea un precio en pesos chilenos (CLP)
 * @param {number} precio - El precio a formatear
 * @returns {string} El precio formateado (ej: "12.000")
 */
export const formatearPrecio = (precio) => {
  return precio.toLocaleString('es-CL')
}

/**
 * Formatea el nombre de una categoría para mostrar
 * Convierte "tortas-tradicionales" en "Tortas Tradicionales"
 * @param {string} categoria - La categoría a formatear
 * @returns {string} La categoría formateada
 */
export const formatearCategoria = (categoria) => {
  // Reemplazar guiones por espacios y dividir en palabras
  const palabras = categoria.replace(/-/g, ' ').split(' ')

  // Capitalizar primera letra de cada palabra usando map
  const palabrasCapitalizadas = palabras.map(palabra => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1)
  })

  // Unir las palabras con espacios
  return palabrasCapitalizadas.join(' ')
}

/**
 * Formatea el estado de un pedido/orden
 * Convierte "en_preparacion" en "en preparacion"
 * @param {string} estado - El estado a formatear
 * @returns {string} El estado formateado
 */
export const formatearEstado = (estado) => {
  return estado.replace(/_/g, ' ')
}
