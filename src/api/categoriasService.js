import api from './axios'

export const categoriasService = {
  async obtenerTodas() {
    const response = await api.get('/categorias')
    return response.data
  },

  async obtenerActivas() {
    const response = await api.get('/categorias/activas')
    return response.data
  },

  async obtenerPorId(id) {
    const response = await api.get(`/categorias/${id}`)
    return response.data
  },

  async crear(categoria) {
    const response = await api.post('/categorias', categoria)
    return response.data
  },

  async actualizar(id, categoria) {
    const response = await api.put(`/categorias/${id}`, categoria)
    return response.data
  },

  async eliminar(id) {
    await api.delete(`/categorias/${id}`)
  }
}
