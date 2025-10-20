// funciones auxiliares que me ayudan en otras partes

// busca el costo de envío de una comuna específica
export const obtenerCostoEnvioComuna = (comunas, nombreComuna) => {
  const comuna = comunas.find(c => c.nombre === nombreComuna)
  return comuna ? comuna.costoEnvio : 0
}

// corta el texto si es muy largo y le pone puntos suspensivos
export const truncarTexto = (texto, maxCaracteres = 80) => {
  if (!texto) return ''
  return texto.length > maxCaracteres
    ? texto.substring(0, maxCaracteres) + '...'
    : texto
}
