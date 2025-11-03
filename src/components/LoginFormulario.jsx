import { useState } from 'react'
import { Link } from 'react-router-dom'
import { validarEmail } from '../utils/validaciones'

function LoginFormulario() {
  const [formData, setFormData] = useState({ email: '', contrasena: '' })
  const [errores, setErrores] = useState({})
  const [mostrarContrasena, setMostrarContrasena] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({ ...formData, [name]: value })
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' })
    }
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validarFormulario()) return
    alert('Login exitoso (simulado)')
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errores.email ? 'is-invalid' : ''}`}
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
                      />
                      <button
                        type="button"
                        onClick={() => setMostrarContrasena(!mostrarContrasena)}
                        className="btn btn-outline-secondary"
                      >
                        👁️
                      </button>
                      {errores.contrasena && <div className="invalid-feedback">{errores.contrasena}</div>}
                    </div>
                  </div>

                  <div className="mb-3 text-end">
                    <a href="#" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Iniciar Sesión
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
