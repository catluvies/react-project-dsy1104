/**
 * UTILIDADES DE PRODUCTOS
 * Funciones para trabajar con productos
 */

/**
 * Obtiene un array de categorías únicas desde un array de productos
 * @param {Array} productos - Array de productos
 * @returns {Array} Array de categorías únicas
 */
export const obtenerCategoriasUnicas = (productos) => {
  // Obtener todas las categorías y filtrar las únicas
  const categorias = productos.map(producto => producto.categoria)
  const categoriasUnicas = categorias.filter((categoria, index) => {
    return categorias.indexOf(categoria) === index
  })

  return categoriasUnicas
}

/**
 * Filtra productos por categoría
 * @param {Array} productos - Array de productos
 * @param {string} categoria - La categoría a filtrar (usar 'todas' para no filtrar)
 * @returns {Array} Array de productos filtrados
 */
export const filtrarPorCategoria = (productos, categoria) => {
  if (categoria === 'todas') return productos
  return productos.filter(p => p.categoria === categoria)
}

/**
 * Filtra productos por búsqueda en nombre y descripción
 * @param {Array} productos - Array de productos
 * @param {string} busqueda - El término de búsqueda
 * @returns {Array} Array de productos filtrados
 */
export const filtrarPorBusqueda = (productos, busqueda) => {
  if (!busqueda) return productos
  const terminoBusqueda = busqueda.toLowerCase()
  return productos.filter(p =>
    p.nombre.toLowerCase().includes(terminoBusqueda) ||
    p.descripcion.toLowerCase().includes(terminoBusqueda)
  )
}
