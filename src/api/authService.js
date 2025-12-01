import api from './axios'

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  async register(datos) {
    const response = await api.post('/auth/register', datos)
    return response.data
  },

  async cambiarPassword(passwordAnterior, passwordNuevo) {
    const response = await api.post('/auth/cambiar-password', {
      passwordAnterior,
      passwordNuevo
    })
    return response.data
  }
}
