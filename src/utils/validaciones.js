/**
 * UTILIDADES DE VALIDACIÓN
 * Funciones para validar datos de formularios
 */

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 */
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Validar teléfono chileno
 * Formato: +56 9 XXXX XXXX o 9 XXXX XXXX
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} true si es válido
 */
export const validarTelefono = (telefono) => {
  const regex = /^(\+?56)?[ ]?9[ ]?\d{4}[ ]?\d{4}$/
  return regex.test(telefono)
}

/**
 * Validar nombre (mínimo 2 caracteres, solo letras)
 * @param {string} nombre - Nombre a validar
 * @returns {boolean} true si es válido
 */
export const validarNombre = (nombre) => {
  return nombre.trim().length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)
}

/**
 * Validar mensaje/texto (mínimo especificado de caracteres)
 * @param {string} texto - Texto a validar
 * @param {number} minCaracteres - Mínimo de caracteres (por defecto 10)
 * @returns {boolean} true si es válido
 */
export const validarTexto = (texto, minCaracteres = 10) => {
  return texto.trim().length >= minCaracteres
}

/**
 * Validar RUT chileno
 * @param {string} rut - RUT a validar
 * @returns {boolean} true si es válido
 */
export const validarRUT = (rut) => {
  // Remover puntos y guión
  rut = rut.replace(/\./g, '').replace(/-/g, '')

  if (rut.length < 2) return false

  const cuerpo = rut.slice(0, -1)
  const dv = rut.slice(-1).toUpperCase()

  // Calcular dígito verificador
  let suma = 0
  let multiplo = 2

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo
    multiplo = multiplo === 7 ? 2 : multiplo + 1
  }

  const dvCalculado = 11 - (suma % 11)
  const dvEsperado = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'K' : dvCalculado.toString()

  return dv === dvEsperado
}

/**
 * Validar contraseña (mínimo 8 caracteres, debe incluir mayúscula, minúscula y número)
 * @param {string} contrasena - Contraseña a validar
 * @returns {boolean} true si es válida
 */
export const validarContrasena = (contrasena) => {
  if (contrasena.length < 8) return false

  const tieneMayuscula = /[A-Z]/.test(contrasena)
  const tieneMinuscula = /[a-z]/.test(contrasena)
  const tieneNumero = /[0-9]/.test(contrasena)

  return tieneMayuscula && tieneMinuscula && tieneNumero
}
