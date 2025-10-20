// validaciones para formularios, las encontré en internet

// valida si el email tiene formato correcto
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// valida teléfono chileno
export const validarTelefono = (telefono) => {
  const regex = /^(\+?56)?[ ]?9[ ]?\d{4}[ ]?\d{4}$/
  return regex.test(telefono)
}

// valida nombre, mínimo 2 letras
export const validarNombre = (nombre) => {
  return nombre.trim().length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)
}

// valida que el texto tenga mínimo de caracteres
export const validarTexto = (texto, minCaracteres = 10) => {
  return texto.trim().length >= minCaracteres
}

// valida RUT chileno, esta fue complicada de hacer
export const validarRUT = (rut) => {
  if (typeof rut !== 'string') return false
  // limpiar el formato del rut
  const limpio = rut.trim().toUpperCase().replace(/\./g, '').replace(/-/g, '')

  if (limpio.length < 2) return false

  const cuerpo = limpio.slice(0, -1)
  const dv = limpio.slice(-1)

  // verificar formato del rut
  if (!/^\d{7,8}$/.test(cuerpo)) return false
  if (!/^[0-9K]$/.test(dv)) return false

  // calcular el dígito verificador
  let suma = 0
  let multiplo = 2

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo.charAt(i)) * multiplo
    multiplo = multiplo === 7 ? 2 : multiplo + 1
  }

  const dvCalculado = 11 - (suma % 11)
  const dvEsperado = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'K' : dvCalculado.toString()

  return dv === dvEsperado
}

// valida contraseña con mayúscula, minúscula y número
export const validarContrasena = (contrasena) => {
  if (contrasena.length < 8) return false

  const tieneMayuscula = /[A-Z]/.test(contrasena)
  const tieneMinuscula = /[a-z]/.test(contrasena)
  const tieneNumero = /[0-9]/.test(contrasena)

  return tieneMayuscula && tieneMinuscula && tieneNumero
}
