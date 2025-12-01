import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validarEmail, validarTelefono, validarNombre, validarRUT, formatearRut } from '../utils/validaciones'
import { comunasData } from '../data/comunas'
import { AuthContext } from '../context/AuthContext'

function RegistroFormulario() {
  const navigate = useNavigate()
  const { registro } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    email: '',
    telefono: '',
    direccion: '',
    comuna: '',
    contrasena: '',
    confirmarContrasena: '',
    terminos: false
  })
  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(false)
  const [errorGeneral, setErrorGeneral] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const nuevoValor = type === 'checkbox' ? checked : value
    setFormData({ ...formData, [name]: nuevoValor })
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' })
    }
    setErrorGeneral('')
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!validarNombre(formData.nombre)) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!validarNombre(formData.apellido)) {
      nuevosErrores.apellido = 'El apellido debe tener al menos 2 caracteres'
    }

    if (!validarRUT(formData.rut)) {
      nuevosErrores.rut = 'RUT inválido (formato: 12345678-9)'
    }

    if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'Email inválido'
    }

    if (formData.telefono && !validarTelefono(formData.telefono)) {
      nuevosErrores.telefono = 'Teléfono inválido (ej: +56912345678)'
    }

    if (formData.contrasena.length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres'
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    setCargando(true)
    setErrorGeneral('')

    try {
      const datos = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        password: formData.contrasena,
        rut: formatearRut(formData.rut),
        telefono: formData.telefono || null,
        direccion: formData.direccion || null,
        comuna: formData.comuna || null
      }

      await registro(datos)
      navigate('/')
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al registrar. Intenta nuevamente.'
      setErrorGeneral(mensaje)
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Crear Cuenta</h2>

                {errorGeneral && (
                  <div className="alert alert-danger" role="alert">
                    {errorGeneral}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nombre *</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                        disabled={cargando}
                      />
                      {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Apellido *</label>
                      <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                        disabled={cargando}
                      />
                      {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
                    </div>
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
                      disabled={cargando}
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
                      disabled={cargando}
                    />
                    {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+56912345678"
                      className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                      disabled={cargando}
                    />
                    {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      placeholder="Calle, número, depto"
                      className="form-control"
                      disabled={cargando}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Comuna (Región Metropolitana)</label>
                    <select
                      name="comuna"
                      value={formData.comuna}
                      onChange={handleChange}
                      className="form-select"
                      disabled={cargando}
                    >
                      <option value="">Selecciona tu comuna</option>
                      {comunasData.map(comuna => (
                        <option key={comuna.nombre} value={comuna.nombre}>
                          {comuna.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Contraseña *</label>
                      <input
                        type="password"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        className={`form-control ${errores.contrasena ? 'is-invalid' : ''}`}
                        disabled={cargando}
                      />
                      {errores.contrasena && <div className="invalid-feedback">{errores.contrasena}</div>}
                      <small className="form-text text-muted">Mínimo 6 caracteres</small>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Confirmar Contraseña *</label>
                      <input
                        type="password"
                        name="confirmarContrasena"
                        value={formData.confirmarContrasena}
                        onChange={handleChange}
                        className={`form-control ${errores.confirmarContrasena ? 'is-invalid' : ''}`}
                        disabled={cargando}
                      />
                      {errores.confirmarContrasena && <div className="invalid-feedback">{errores.confirmarContrasena}</div>}
                    </div>
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      name="terminos"
                      id="terminos"
                      checked={formData.terminos}
                      onChange={handleChange}
                      className={`form-check-input ${errores.terminos ? 'is-invalid' : ''}`}
                      disabled={cargando}
                    />
                    <label htmlFor="terminos" className="form-check-label">
                      Acepto los términos y condiciones *
                    </label>
                    {errores.terminos && <div className="invalid-feedback">{errores.terminos}</div>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={cargando}
                  >
                    {cargando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Registrando...
                      </>
                    ) : (
                      'Registrarse'
                    )}
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
