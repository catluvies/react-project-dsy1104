import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validarEmail, validarTelefono, validarNombre, validarRUT, validarContrasena } from '../utils/validaciones'
import { comunasData } from '../data/comunas'
import './RegistroFormulario.css'

function RegistroFormulario() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    telefono: '',
    comuna: '',
    contrasena: '',
    confirmarContrasena: '',
    terminos: false
  })
  const [errores, setErrores] = useState({})

  // manejar cambios en inputs
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    const type = e.target.type
    const checked = e.target.checked

    // actualizar datos del formulario si es checkbox usar checked sino value
    const nuevoValor = type === 'checkbox' ? checked : value
    setFormData({ ...formData, [name]: nuevoValor })

    // limpiar error si había
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' })
    }
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!validarNombre(formData.nombre)) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!validarRUT(formData.rut)) {
      nuevosErrores.rut = 'RUT inválido'
    }

    if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'Email inválido'
    }

    if (!validarTelefono(formData.telefono)) {
      nuevosErrores.telefono = 'Teléfono inválido (ej: +56 9 1234 5678)'
    }

    if (!validarContrasena(formData.contrasena)) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula y número'
    }

    if (formData.contrasena !== formData.confirmarContrasena) {
      nuevosErrores.confirmarContrasena = 'Las contraseñas no coinciden'
    }

    if (!formData.terminos) {
      nuevosErrores.terminos = 'Debes aceptar los términos y condiciones'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validarFormulario()) return
    alert('Registro exitoso (simulado)')
    navigate('/login')
  }

  return (
    <section className="registro">
      <div className="registro__contenedor">
        <div className="registro__card">
          <h2 className="registro__titulo">Crear Cuenta</h2>

          <form onSubmit={handleSubmit}>
            <div className="registro__campo">
              <label className="registro__label">Nombre Completo *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errores.nombre ? 'registro__input--error' : ''}
              />
              {errores.nombre && <span className="registro__error">{errores.nombre}</span>}
            </div>

            <div className="registro__campo">
              <label className="registro__label">RUT *</label>
              <input
                type="text"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                placeholder="12345678-9"
                className={errores.rut ? 'registro__input--error' : ''}
              />
              {errores.rut && <span className="registro__error">{errores.rut}</span>}
            </div>

            <div className="registro__campo">
              <label className="registro__label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errores.email ? 'registro__input--error' : ''}
              />
              {errores.email && <span className="registro__error">{errores.email}</span>}
            </div>

            <div className="registro__campo">
              <label className="registro__label">Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
                className={errores.telefono ? 'registro__input--error' : ''}
              />
              {errores.telefono && <span className="registro__error">{errores.telefono}</span>}
            </div>

            <div className="registro__campo">
              <label className="registro__label">Comuna (Región Metropolitana) *</label>
              <select
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                className="registro__select"
              >
                <option value="">Selecciona tu comuna</option>
                {comunasData.map(comuna => (
                  <option key={comuna.nombre} value={comuna.nombre}>
                    {comuna.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="registro__campo">
              <label className="registro__label">Contraseña *</label>
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                className={errores.contrasena ? 'registro__input--error' : ''}
              />
              {errores.contrasena && <span className="registro__error">{errores.contrasena}</span>}
              <p className="registro__ayuda">
                Mínimo 8 caracteres, incluir mayúscula, minúscula y número
              </p>
            </div>

            <div className="registro__campo">
              <label className="registro__label">Confirmar Contraseña *</label>
              <input
                type="password"
                name="confirmarContrasena"
                value={formData.confirmarContrasena}
                onChange={handleChange}
                className={errores.confirmarContrasena ? 'registro__input--error' : ''}
              />
              {errores.confirmarContrasena && <span className="registro__error">{errores.confirmarContrasena}</span>}
            </div>

            <div className={`registro__checkbox ${errores.terminos ? 'registro__checkbox--error' : ''}`}>
              <input
                type="checkbox"
                name="terminos"
                id="terminos"
                checked={formData.terminos}
                onChange={handleChange}
              />
              <label htmlFor="terminos">
                Acepto los términos y condiciones *
              </label>
            </div>
            {errores.terminos && <span className="registro__error">{errores.terminos}</span>}

            <button type="submit" className="boton boton--primario boton--block">
              Registrarse
            </button>

            <div className="registro__login">
              <span>¿Ya tienes cuenta? </span>
              <Link to="/login">Inicia sesión aquí</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default RegistroFormulario
