import api from './axios'

export const configuracionService = {
  async obtenerComunas() {
    const response = await api.get('/configuracion/comunas')
    return response.data
  },

  async obtenerTiposEntrega() {
    const response = await api.get('/configuracion/tipos-entrega')
    return response.data
  },

  async obtenerHorariosEntrega() {
    const response = await api.get('/configuracion/horarios-entrega')
    return response.data
  },

  async obtenerMetodosPago() {
    const response = await api.get('/configuracion/metodos-pago')
    return response.data
  },

  async obtenerEstadosBoleta() {
    const response = await api.get('/configuracion/estados-boleta')
    return response.data
  }
}
