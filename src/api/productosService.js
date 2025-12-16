import api, { API_BASE_URL } from './axios'

export const productosService = {
  async obtenerTodos() {
    const response = await api.get('/productos')
    return response.data
  },

  async obtenerActivos() {
    const response = await api.get('/productos/activos')
    return response.data
  },

  async obtenerPorId(id) {
    const response = await api.get(`/productos/${id}`)
    return response.data
  },

  async obtenerPorCategoria(categoriaId) {
    const response = await api.get(`/productos/categoria/${categoriaId}`)
    return response.data
  },

  async crear(producto, imagen) {
    const formData = new FormData()
    formData.append('producto', JSON.stringify(producto))
    if (imagen) {
      formData.append('imagen', imagen)
    }
    const response = await api.post('/productos', formData)
    return response.data
  },

  async actualizar(id, producto, imagen) {
    const formData = new FormData()
    formData.append('producto', JSON.stringify(producto))
    if (imagen) {
      formData.append('imagen', imagen)
    }
    const response = await api.put(`/productos/${id}`, formData)
    return response.data
  },

  async eliminar(id) {
    await api.delete(`/productos/${id}`)
  },

  obtenerUrlImagen(imagenUrl) {
    if (!imagenUrl) return null
    if (imagenUrl.startsWith('http')) return imagenUrl
    return `${API_BASE_URL}${imagenUrl}`
  }
}
