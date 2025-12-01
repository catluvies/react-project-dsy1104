import api from './axios'

export const boletasService = {
  async obtenerTodas() {
    const response = await api.get('/boletas')
    return response.data
  },

  async obtenerPorId(id) {
    const response = await api.get(`/boletas/${id}`)
    return response.data
  },

  async obtenerPorUsuario(usuarioId) {
    const response = await api.get(`/boletas/usuario/${usuarioId}`)
    return response.data
  },

  async crear(usuarioId, boleta) {
    const response = await api.post(`/boletas/usuario/${usuarioId}`, boleta)
    return response.data
  },

  async cambiarEstado(id, estado) {
    const response = await api.patch(`/boletas/${id}/estado`, { estado })
    return response.data
  },

  async eliminar(id) {
    await api.delete(`/boletas/${id}`)
  }
}

export const ESTADOS_BOLETA = {
  PENDIENTE: 'PENDIENTE',
  CONFIRMADA: 'CONFIRMADA',
  PREPARANDO: 'PREPARANDO',
  LISTA: 'LISTA',
  ENTREGADA: 'ENTREGADA',
  CANCELADA: 'CANCELADA'
}

export const getEstadoColor = (estado) => {
  const colores = {
    PENDIENTE: 'warning',
    CONFIRMADA: 'info',
    PREPARANDO: 'primary',
    LISTA: 'success',
    ENTREGADA: 'secondary',
    CANCELADA: 'danger'
  }
  return colores[estado] || 'secondary'
}
