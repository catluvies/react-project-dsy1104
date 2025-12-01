import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function ProtectedRoute({ children, requiredRoles = [] }) {
  const { usuario, cargando, isAuthenticated, isAdmin, isVendedor } = useContext(AuthContext)

  if (cargando) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  if (requiredRoles.length > 0) {
    const tieneRol = requiredRoles.some(rol => {
      if (rol === 'ADMIN') return isAdmin()
      if (rol === 'VENDEDOR') return isVendedor()
      if (rol === 'ADMIN_OR_VENDEDOR') return isAdmin() || isVendedor()
      return usuario?.rol === rol
    })

    if (!tieneRol) {
      return <Navigate to="/" replace />
    }
  }

  return children
}

export default ProtectedRoute
