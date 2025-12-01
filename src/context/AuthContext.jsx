import { createContext, useState, useEffect } from 'react'
import { authService } from '../api/authService'
import { ROLES } from '../api/usuariosService'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario')
    const token = localStorage.getItem('token')

    if (usuarioGuardado && token) {
      setUsuario(JSON.parse(usuarioGuardado))
    }
    setCargando(false)
  }, [])

  const login = async (email, password) => {
    const response = await authService.login(email, password)
    const usuarioData = {
      id: response.id,
      nombre: response.nombre,
      email: response.email,
      rol: response.rol
    }

    localStorage.setItem('token', response.token)
    localStorage.setItem('usuario', JSON.stringify(usuarioData))
    setUsuario(usuarioData)

    return usuarioData
  }

  const registro = async (datos) => {
    const response = await authService.register(datos)
    const usuarioData = {
      id: response.id,
      nombre: response.nombre,
      email: response.email,
      rol: response.rol
    }

    localStorage.setItem('token', response.token)
    localStorage.setItem('usuario', JSON.stringify(usuarioData))
    setUsuario(usuarioData)

    return usuarioData
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  const isAdmin = () => usuario?.rol === ROLES.ADMIN
  const isVendedor = () => usuario?.rol === ROLES.VENDEDOR
  const isCliente = () => usuario?.rol === ROLES.CLIENTE
  const isAuthenticated = () => !!usuario

  const value = {
    usuario,
    cargando,
    login,
    registro,
    logout,
    isAdmin,
    isVendedor,
    isCliente,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
