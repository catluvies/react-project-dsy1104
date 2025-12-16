import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validarEmail } from '../utils/validaciones'
import { AuthContext } from '../context/AuthContext'
import { ROLES } from '../api/usuariosService'

function LoginFormulario() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({ email: '', contrasena: '' })
  const [errores, setErrores] = useState({})
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [errorGeneral, setErrorGeneral] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' })
    }
    setErrorGeneral('')
  }

  const validarFormulario = () => {
    const nuevosErrores = {}
    if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'Email inválido'
    }
    if (formData.contrasena.length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres'
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    setCargando(true)
    setErrorGeneral('')

    try {
      const usuario = await login(formData.email, formData.contrasena)

      if (usuario.rol === ROLES.ADMIN) {
        navigate('/admin/dashboard')
      } else if (usuario.rol === ROLES.VENDEDOR) {
        navigate('/admin/ordenes')
      } else {
        navigate('/')
      }
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al iniciar sesión. Verifica tus credenciales.'
      setErrorGeneral(mensaje)
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="contacto-bg-decorativo py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="glass-form-container">
              {/* Decoraciones flotantes */}
              <div className="floating-decoration floating-heart" style={{ top: '-16px', left: '-16px', fontSize: '24px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="floating-decoration floating-star" style={{ top: '-8px', right: '-24px', fontSize: '20px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="floating-decoration floating-sparkle" style={{ bottom: '-12px', right: '-16px', fontSize: '18px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"/>
                </svg>
              </div>

              <div className="glass-card">
                {/* Barra de título estilo ventana */}
                <div className="glass-title-bar">
                  <span className="title-text">Iniciar Sesión</span>
                  <div className="window-buttons">
                    <span className="window-btn window-btn-minimize"></span>
                    <span className="window-btn window-btn-maximize"></span>
                    <span className="window-btn window-btn-close"></span>
                  </div>
                </div>

                {/* Contenido del formulario */}
                <div className="p-4 p-md-5">
                  {errorGeneral && (
                    <div className="alert alert-danger" role="alert">
                      {errorGeneral}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="glass-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`glass-input ${errores.email ? 'is-invalid' : ''}`}
                        placeholder="nombre@correo.com"
                        disabled={cargando}
                      />
                      {errores.email && <div className="text-danger small mt-1">{errores.email}</div>}
                    </div>

                    <div className="mb-4">
                      <label className="glass-label">Contraseña *</label>
                      <div className="position-relative">
                        <input
                          type={mostrarContrasena ? 'text' : 'password'}
                          name="contrasena"
                          value={formData.contrasena}
                          onChange={handleChange}
                          className={`glass-input ${errores.contrasena ? 'is-invalid' : ''}`}
                          disabled={cargando}
                        />
                        <button
                          type="button"
                          onClick={() => setMostrarContrasena(!mostrarContrasena)}
                          className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
                          style={{ textDecoration: 'none', zIndex: 10 }}
                          disabled={cargando}
                        >
                          {mostrarContrasena ? '🙈' : '👁️'}
                        </button>
                      </div>
                      {errores.contrasena && <div className="text-danger small mt-1">{errores.contrasena}</div>}
                    </div>

                    <button
                      type="submit"
                      className="glass-btn w-100 mb-3"
                      disabled={cargando}
                    >
                      {cargando ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Iniciando sesión...
                        </>
                      ) : (
                        'Iniciar Sesión'
                      )}
                    </button>

                    <div className="text-center">
                      <span>¿No tienes cuenta? </span>
                      <Link to="/registro" className="text-decoration-none" style={{ color: '#8B4513' }}>Regístrate aquí</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginFormulario
