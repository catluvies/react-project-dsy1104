// funciones para manejar productos

// obtiene categorías sin repetir
export const obtenerCategoriasUnicas = (productos) => {
  // sacar categorías sin repetir
  const categorias = productos.map(producto => producto.categoria)
  const categoriasUnicas = categorias.filter((categoria, index) => {
    return categorias.indexOf(categoria) === index
  })

  return categoriasUnicas
}

// filtra productos por categoría
export const filtrarPorCategoria = (productos, categoria) => {
  if (categoria === 'todas') return productos
  return productos.filter(p => p.categoria === categoria)
}

// busca productos por nombre o descripción
export const filtrarPorBusqueda = (productos, busqueda) => {
  if (!busqueda) return productos
  const terminoBusqueda = busqueda.toLowerCase()
  return productos.filter(p =>
    p.nombre.toLowerCase().includes(terminoBusqueda) ||
    p.descripcion.toLowerCase().includes(terminoBusqueda)
  )
}
