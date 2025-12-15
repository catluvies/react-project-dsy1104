import { configuracionService } from '../api/configuracionService'

// Datos de fallback en caso de error de conexión con el backend
const comunasFallback = [
  { nombre: 'Santiago', costoEnvio: 3000 },
  { nombre: 'Providencia', costoEnvio: 3000 },
  { nombre: 'Ñuñoa', costoEnvio: 3000 },
  { nombre: 'San Miguel', costoEnvio: 3000 },
  { nombre: 'Las Condes', costoEnvio: 4000 },
  { nombre: 'Vitacura', costoEnvio: 4000 },
  { nombre: 'La Reina', costoEnvio: 4000 },
  { nombre: 'Peñalolén', costoEnvio: 4000 },
  { nombre: 'Estación Central', costoEnvio: 3500 },
  { nombre: 'Maipú', costoEnvio: 3500 },
  { nombre: 'Pudahuel', costoEnvio: 3500 },
  { nombre: 'La Florida', costoEnvio: 5000 },
  { nombre: 'Macul', costoEnvio: 5000 },
  { nombre: 'Recoleta', costoEnvio: 5000 },
  { nombre: 'Independencia', costoEnvio: 5000 }
]

// Cache para evitar múltiples llamadas al backend
let comunasCache = null

// Función para obtener comunas del backend (con cache y fallback)
export const obtenerComunas = async () => {
  if (comunasCache) return comunasCache

  try {
    const data = await configuracionService.obtenerComunas()
    comunasCache = data
    return data
  } catch (error) {
    console.warn('Error obteniendo comunas del backend, usando datos locales:', error)
    return comunasFallback
  }
}

// Datos estáticos para compatibilidad (se recomienda usar obtenerComunas() en su lugar)
export const comunasData = comunasFallback

export const RETIRO_TIENDA = {
  nombre: 'RETIRO EN TIENDA',
  costoEnvio: 0,
  direccion: 'Av. Providencia 1234, Local 10 (Pastelería Mil Sabores)'
}

export const obtenerCostoEnvio = (comuna, listaComunas = comunasFallback) => {
  if (comuna === RETIRO_TIENDA.nombre) return 0
  const comunaData = listaComunas.find(c => c.nombre === comuna)
  return comunaData ? comunaData.costoEnvio : null
}
