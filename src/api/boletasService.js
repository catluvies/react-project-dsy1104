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

  async crear(usuarioId, boleta, comprobanteFile = null) {
    if (comprobanteFile) {
      // Si hay comprobante, usar FormData
      const formData = new FormData()
      formData.append('boleta', new Blob([JSON.stringify(boleta)], { type: 'application/json' }))
      formData.append('comprobante', comprobanteFile)
      const response = await api.post(`/boletas/usuario/${usuarioId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    }
    // Sin comprobante, enviar JSON normal
    const response = await api.post(`/boletas/usuario/${usuarioId}`, boleta)
    return response.data
  },

  async subirComprobante(boletaId, comprobanteFile) {
    const formData = new FormData()
    formData.append('comprobante', comprobanteFile)
    const response = await api.post(`/boletas/${boletaId}/comprobante`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },

  async cambiarEstado(id, estado) {
    const response = await api.patch(`/boletas/${id}/estado`, { estado })
    return response.data
  },

  async eliminar(id) {
    await api.delete(`/boletas/${id}`)
  },

  obtenerUrlComprobante(comprobanteUrl) {
    if (!comprobanteUrl) return null
    if (comprobanteUrl.startsWith('http')) return comprobanteUrl
    return `https://api.anyararosso.com${comprobanteUrl}`
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
