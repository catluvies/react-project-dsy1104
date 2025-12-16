import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validarEmail, validarTelefono, validarNombre, validarRUT, formatearRut } from '../utils/validaciones'
import { obtenerComunas } from '../data/comunas'
import { AuthContext } from '../context/AuthContext'

function RegistroFormulario() {
  const navigate = useNavigate()
  const { registro } = useContext(AuthContext)

  const [comunas, setComunas] = useState([])

  useEffect(() => {
    const cargarComunas = async () => {
      const data = await obtenerComunas()
      setComunas(data)
    }
    cargarComunas()
  }, [])

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
      nuevosErrores.rut = 'RUT inválido (formato: 12.345.678-9)'
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
    <section className="contacto-bg-decorativo py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
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
              <div className="floating-decoration floating-sparkle" style={{ bottom: '-12px', left: '-24px', fontSize: '20px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"/>
                </svg>
              </div>
              <div className="floating-decoration floating-heart" style={{ bottom: '-16px', right: '-16px', fontSize: '16px', animationDuration: '2.5s' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>

              <div className="glass-card">
                {/* Barra de título estilo ventana */}
                <div className="glass-title-bar">
                  <span className="title-text">Crear Cuenta</span>
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
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="glass-label">Nombre *</label>
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className={`glass-input ${errores.nombre ? 'is-invalid' : ''}`}
                          disabled={cargando}
                        />
                        {errores.nombre && <div className="text-danger small mt-1">{errores.nombre}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="glass-label">Apellido *</label>
                        <input
                          type="text"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleChange}
                          className={`glass-input ${errores.apellido ? 'is-invalid' : ''}`}
                          disabled={cargando}
                        />
                        {errores.apellido && <div className="text-danger small mt-1">{errores.apellido}</div>}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="glass-label">RUT *</label>
                      <input
                        type="text"
                        name="rut"
                        value={formData.rut}
                        onChange={handleChange}
                        placeholder="12.345.678-9"
                        className={`glass-input ${errores.rut ? 'is-invalid' : ''}`}
                        disabled={cargando}
                      />
                      {errores.rut && <div className="text-danger small mt-1">{errores.rut}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="glass-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`glass-input ${errores.email ? 'is-invalid' : ''}`}
                        disabled={cargando}
                      />
                      {errores.email && <div className="text-danger small mt-1">{errores.email}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="glass-label">Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+56912345678"
                        className={`glass-input ${errores.telefono ? 'is-invalid' : ''}`}
                        disabled={cargando}
                      />
                      {errores.telefono && <div className="text-danger small mt-1">{errores.telefono}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="glass-label">Dirección</label>
                      <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        placeholder="Calle, número, depto"
                        className="glass-input"
                        disabled={cargando}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="glass-label">Comuna (Región Metropolitana)</label>
                      <select
                        name="comuna"
                        value={formData.comuna}
                        onChange={handleChange}
                        className="glass-input"
                        disabled={cargando}
                      >
                        <option value="">Selecciona tu comuna</option>
                        {comunas.map(comuna => (
                          <option key={comuna.nombre} value={comuna.nombre}>
                            {comuna.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="glass-label">Contraseña *</label>
                        <input
                          type="password"
                          name="contrasena"
                          value={formData.contrasena}
                          onChange={handleChange}
                          className={`glass-input ${errores.contrasena ? 'is-invalid' : ''}`}
                          disabled={cargando}
                        />
                        {errores.contrasena && <div className="text-danger small mt-1">{errores.contrasena}</div>}
                        <small className="text-muted">Mínimo 6 caracteres</small>
                      </div>

                      <div className="col-md-6">
                        <label className="glass-label">Confirmar Contraseña *</label>
                        <input
                          type="password"
                          name="confirmarContrasena"
                          value={formData.confirmarContrasena}
                          onChange={handleChange}
                          className={`glass-input ${errores.confirmarContrasena ? 'is-invalid' : ''}`}
                          disabled={cargando}
                        />
                        {errores.confirmarContrasena && <div className="text-danger small mt-1">{errores.confirmarContrasena}</div>}
                      </div>
                    </div>

                    <div className="mb-4 form-check">
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
                      {errores.terminos && <div className="text-danger small mt-1">{errores.terminos}</div>}
                    </div>

                    <button
                      type="submit"
                      className="glass-btn w-100 mb-3"
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
                      <Link to="/login" className="text-decoration-none" style={{ color: '#8B4513' }}>Inicia sesión aquí</Link>
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

export default RegistroFormulario
