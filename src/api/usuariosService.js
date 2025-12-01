import api from './axios'

export const usuariosService = {
  async obtenerTodos() {
    const response = await api.get('/usuarios')
    return response.data
  },

  async obtenerPorId(id) {
    const response = await api.get(`/usuarios/${id}`)
    return response.data
  },

  async actualizarPerfil(id, datos) {
    const response = await api.put(`/usuarios/${id}/perfil`, datos)
    return response.data
  },

  async actualizar(id, datos) {
    const response = await api.put(`/usuarios/${id}`, datos)
    return response.data
  },

  async crearVendedor(datos) {
    const response = await api.post('/usuarios/vendedor', datos)
    return response.data
  },

  async eliminar(id) {
    await api.delete(`/usuarios/${id}`)
  }
}

export const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  VENDEDOR: 'ROLE_VENDEDOR',
  CLIENTE: 'ROLE_CLIENTE'
}

export const getRolLabel = (rol) => {
  const labels = {
    ROLE_ADMIN: 'Administrador',
    ROLE_VENDEDOR: 'Vendedor',
    ROLE_CLIENTE: 'Cliente'
  }
  return labels[rol] || rol
}
