import api from './axios'

export const variantesService = {
  async obtenerPorProducto(productoId) {
    const response = await api.get(`/productos/${productoId}/variantes`)
    return response.data
  },

  async obtenerActivasPorProducto(productoId) {
    const response = await api.get(`/productos/${productoId}/variantes/activas`)
    return response.data
  },

  async obtenerPorId(id) {
    const response = await api.get(`/variantes/${id}`)
    return response.data
  },

  async crear(productoId, variante) {
    const response = await api.post(`/productos/${productoId}/variantes`, variante)
    return response.data
  },

  async actualizar(id, variante) {
    const response = await api.put(`/variantes/${id}`, variante)
    return response.data
  },

  async eliminar(id) {
    await api.delete(`/variantes/${id}`)
  }
}
