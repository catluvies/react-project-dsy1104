/**
 * UTILIDADES AUXILIARES (HELPERS)
 * Funciones de apoyo generales
 */

/**
 * Obtiene el costo de envío para una comuna específica
 * @param {Array} comunas - Array de comunas con costos de envío
 * @param {string} nombreComuna - Nombre de la comuna
 * @returns {number} Costo de envío en pesos chilenos, o 0 si no se encuentra
 */
export const obtenerCostoEnvioComuna = (comunas, nombreComuna) => {
  const comuna = comunas.find(c => c.nombre === nombreComuna)
  return comuna ? comuna.costoEnvio : 0
}

/**
 * Trunca un texto a un número máximo de caracteres
 * @param {string} texto - El texto a truncar
 * @param {number} maxCaracteres - Número máximo de caracteres (por defecto 80)
 * @returns {string} Texto truncado
 */
export const truncarTexto = (texto, maxCaracteres = 80) => {
  if (!texto) return ''
  return texto.length > maxCaracteres
    ? texto.substring(0, maxCaracteres) + '...'
    : texto
}
