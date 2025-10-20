import { useState } from 'react'
import { Link } from 'react-router-dom'
import { validarEmail } from '../utils/validaciones'
import './LoginFormulario.css'

function LoginFormulario() {
  const [formData, setFormData] = useState({ email: '', contrasena: '' })
  const [errores, setErrores] = useState({})
  const [mostrarContrasena, setMostrarContrasena] = useState(false)

  // manejar cambios en inputs
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    // actualizar datos del formulario
    setFormData({ ...formData, [name]: value })

    // limpiar error si había
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
    // solo valida, no hace login real
    alert('Login exitoso (simulado)')
  }

  return (
    <section className="login">
      <div className="login__contenedor">
        <div className="login__card">
          <h2 className="login__titulo">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit}>
            <div className="login__campo">
              <label className="login__label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errores.email ? 'login__input--error' : ''}
              />
              {errores.email && <span className="login__error">{errores.email}</span>}
            </div>

            <div className="login__campo">
              <label className="login__label">Contraseña *</label>
              <div className="login__password">
                <input
                  type={mostrarContrasena ? 'text' : 'password'}
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  className={errores.contrasena ? 'login__input--error' : ''}
                />
                <button
                  type="button"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                  className="login__toggle"
                >
                  {mostrarContrasena ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errores.contrasena && <span className="login__error">{errores.contrasena}</span>}
            </div>

            <div className="login__olvidar">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="boton boton--primario boton--block">
              Iniciar Sesión
            </button>

            <div className="login__registro">
              <span>¿No tienes cuenta? </span>
              <Link to="/registro">Regístrate aquí</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginFormulario
