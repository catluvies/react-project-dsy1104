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
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>

                {errorGeneral && (
                  <div className="alert alert-danger" role="alert">
                    {errorGeneral}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                      disabled={cargando}
                    />
                    {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contraseña *</label>
                    <div className="input-group">
                      <input
                        type={mostrarContrasena ? 'text' : 'password'}
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        className={`form-control ${errores.contrasena ? 'is-invalid' : ''}`}
                        disabled={cargando}
                      />
                      <button
                        type="button"
                        onClick={() => setMostrarContrasena(!mostrarContrasena)}
                        className="btn btn-outline-secondary"
                        disabled={cargando}
                      >
                        {mostrarContrasena ? '🙈' : '👁️'}
                      </button>
                      {errores.contrasena && <div className="invalid-feedback">{errores.contrasena}</div>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
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
                    <Link to="/registro" className="text-decoration-none">Regístrate aquí</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginFormulario
