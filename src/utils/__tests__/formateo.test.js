import { describe, it, expect } from 'vitest'
import { formatearPrecio, formatearCategoria } from '../formateo.js'

describe('formatearPrecio', () => {
  it('formatea precios con puntos de miles', () => {
    expect(formatearPrecio(15000)).toBe('15.000')
  })
})

describe('formatearCategoria', () => {
  it('convierte categorías con guiones a formato legible', () => {
    expect(formatearCategoria('tortas-clasicas')).toBe('Tortas Clasicas')
  })
})
