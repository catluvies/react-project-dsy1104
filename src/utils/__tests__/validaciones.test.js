import { describe, it, expect } from 'vitest'
import { validarRUT, validarEmail, validarNombre } from '../validaciones.js'

describe('validarRUT', () => {
  it('valida un RUT correcto con distintos formatos', () => {
    expect(validarRUT('12.345.678-5')).toBe(true)
    expect(validarRUT('12345678-5')).toBe(true)
  })

  it('rechaza un RUT con DV incorrecto', () => {
    expect(validarRUT('12.345.678-0')).toBe(false)
  })
})

describe('validarEmail', () => {
  it('acepta emails válidos', () => {
    expect(validarEmail('usuario@ejemplo.com')).toBe(true)
  })

  it('rechaza emails sin arroba', () => {
    expect(validarEmail('usuarioejemplo.com')).toBe(false)
  })
})

describe('validarNombre', () => {
  it('acepta nombres válidos', () => {
    expect(validarNombre('Juan')).toBe(true)
  })

  it('rechaza nombres con números', () => {
    expect(validarNombre('Juan123')).toBe(false)
  })
})


