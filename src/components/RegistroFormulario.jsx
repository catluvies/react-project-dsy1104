import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validarEmail, validarTelefono, validarNombre, validarRUT, validarContrasena } from '../utils/validaciones'
import { comunasData } from '../data/comunas'

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

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    const type = e.target.type
    const checked = e.target.checked
    const nuevoValor = type === 'checkbox' ? checked : value
    setFormData({ ...formData, [name]: nuevoValor })
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
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Crear Cuenta</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nombre Completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    />
                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">RUT *</label>
                    <input
                      type="text"
                      name="rut"
                      value={formData.rut}
                      onChange={handleChange}
                      placeholder="12345678-9"
                      className={`form-control ${errores.rut ? 'is-invalid' : ''}`}
                    />
                    {errores.rut && <div className="invalid-feedback">{errores.rut}</div>}
                  </div>

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
                    <label className="form-label">Teléfono *</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+56 9 1234 5678"
                      className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                    />
                    {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Comuna (Región Metropolitana) *</label>
                    <select
                      name="comuna"
                      value={formData.comuna}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Selecciona tu comuna</option>
                      {comunasData.map(comuna => (
                        <option key={comuna.nombre} value={comuna.nombre}>
                          {comuna.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contraseña *</label>
                    <input
                      type="password"
                      name="contrasena"
                      value={formData.contrasena}
                      onChange={handleChange}
                      className={`form-control ${errores.contrasena ? 'is-invalid' : ''}`}
                    />
                    {errores.contrasena && <div className="invalid-feedback">{errores.contrasena}</div>}
                    <small className="form-text text-muted">
                      Mínimo 8 caracteres, incluir mayúscula, minúscula y número
                    </small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirmar Contraseña *</label>
                    <input
                      type="password"
                      name="confirmarContrasena"
                      value={formData.confirmarContrasena}
                      onChange={handleChange}
                      className={`form-control ${errores.confirmarContrasena ? 'is-invalid' : ''}`}
                    />
                    {errores.confirmarContrasena && <div className="invalid-feedback">{errores.confirmarContrasena}</div>}
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      name="terminos"
                      id="terminos"
                      checked={formData.terminos}
                      onChange={handleChange}
                      className={`form-check-input ${errores.terminos ? 'is-invalid' : ''}`}
                    />
                    <label htmlFor="terminos" className="form-check-label">
                      Acepto los términos y condiciones *
                    </label>
                    {errores.terminos && <div className="invalid-feedback">{errores.terminos}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Registrarse
                  </button>

                  <div className="text-center">
                    <span>¿Ya tienes cuenta? </span>
                    <Link to="/login" className="text-decoration-none">Inicia sesión aquí</Link>
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

export default RegistroFormulario
