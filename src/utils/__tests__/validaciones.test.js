import { describe, it, expect } from 'vitest'
import { validarRUT } from '../validaciones.js'

describe('validarRUT', () => {
  it('valida un RUT correcto (12.345.678-5) con distintos formatos', () => {
    expect(validarRUT('12.345.678-5')).toBe(true)
    expect(validarRUT('12345678-5')).toBe(true)
    expect(validarRUT('123456785')).toBe(true)
  })

  it('rechaza un RUT con DV incorrecto', () => {
    expect(validarRUT('12.345.678-0')).toBe(false)
  })

  it('rechaza formatos no válidos (caracteres no numéricos en el cuerpo)', () => {
    expect(validarRUT('12abc678-5')).toBe(false)
  })
})


