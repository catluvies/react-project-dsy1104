import { describe, it, expect } from 'vitest'
import { filtrarPorCategoria, filtrarPorBusqueda } from '../productos.js'

describe('filtrarPorCategoria', () => {
  const productos = [
    { id: 1, nombre: 'Producto 1', categoria: 'tortas-clasicas' },
    { id: 2, nombre: 'Producto 2', categoria: 'postres' }
  ]

  it('filtra productos por categoría específica', () => {
    const resultado = filtrarPorCategoria(productos, 'postres')
    expect(resultado.length).toBe(1)
  })
})

describe('filtrarPorBusqueda', () => {
  const productos = [
    { id: 1, nombre: 'Torta de chocolate', descripcion: 'Deliciosa' },
    { id: 2, nombre: 'Torta de frutilla', descripcion: 'Fresca' }
  ]

  it('busca productos por nombre', () => {
    const resultado = filtrarPorBusqueda(productos, 'chocolate')
    expect(resultado.length).toBe(1)
  })
})
