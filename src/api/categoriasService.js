import api, { API_BASE_URL } from './axios'

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

  async crear(categoria, imagen) {
    const formData = new FormData()
    formData.append('categoria', JSON.stringify(categoria))
    if (imagen) {
      formData.append('imagen', imagen)
    }
    const response = await api.post('/categorias', formData)
    return response.data
  },

  async actualizar(id, categoria, imagen) {
    const formData = new FormData()
    formData.append('categoria', JSON.stringify(categoria))
    if (imagen) {
      formData.append('imagen', imagen)
    }
    const response = await api.put(`/categorias/${id}`, formData)
    return response.data
  },

  async eliminar(id) {
    await api.delete(`/categorias/${id}`)
  },

  obtenerUrlImagen(imagenUrl) {
    if (!imagenUrl) return null
    if (imagenUrl.startsWith('http')) return imagenUrl
    return `${API_BASE_URL}${imagenUrl}`
  }
}
