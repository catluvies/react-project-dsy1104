import { useState } from 'react'
import { validarEmail, validarTelefono, validarNombre, validarTexto } from '../utils/validaciones'
import './ContactoFormulario.css'

function ContactoFormulario() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  })
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

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

    if (!validarNombre(formData.nombre)) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'Email inválido'
    }

    if (!validarTelefono(formData.telefono)) {
      nuevosErrores.telefono = 'Teléfono inválido (ej: +56 9 1234 5678)'
    }

    if (!validarTexto(formData.asunto, 5)) {
      nuevosErrores.asunto = 'El asunto debe tener al menos 5 caracteres'
    }

    if (!validarTexto(formData.mensaje, 10)) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    setEnviado(true)
    setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })
    setTimeout(() => setEnviado(false), 5000)
  }

  return (
    <>
      {/* Hero */}
      <section className="contacto-hero">
        <div className="contacto-hero__contenedor">
          <h1 className="contacto-hero__titulo">Contacto</h1>
          <p className="contacto-hero__descripcion">Estamos aquí para ayudarte</p>
        </div>
      </section>

      {/* Contenido */}
      <section className="contacto-contenido">
        <div className="contacto-contenido__contenedor">
          {enviado && (
            <div className="alerta alerta--exito" style={{ position: 'relative' }}>
              ¡Mensaje enviado correctamente! Te contactaremos pronto.
              <button
                type="button"
                className="contacto-alerta__cerrar"
                onClick={() => setEnviado(false)}
              >
                ×
              </button>
            </div>
          )}

          {/* info cards */}
          <div className="contacto-info">
            <div className="card contacto-info-card">
              <h5 className="contacto-info-card__titulo">Dirección</h5>
              <p className="contacto-info-card__texto">
                Av. Providencia 1234<br />
                Santiago, Chile
              </p>
            </div>

            <div className="card contacto-info-card">
              <h5 className="contacto-info-card__titulo">Teléfono</h5>
              <p className="contacto-info-card__texto">
                +56 9 1234 5678<br />
                Lunes a Domingo<br />
                9:00 - 20:00
              </p>
            </div>

            <div className="card contacto-info-card">
              <h5 className="contacto-info-card__titulo">Email</h5>
              <p className="contacto-info-card__texto">
                contacto@milsabores.cl<br />
                Respuesta en 24 horas
              </p>
            </div>
          </div>

          {/* formulario */}
          <div className="card contacto-form-card">
            <h5 className="contacto-form-card__titulo">Envíanos un Mensaje</h5>

            <form onSubmit={handleSubmit}>
              <div className="contacto-campo">
                <label className="contacto-label">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={errores.nombre ? 'contacto-input--error' : ''}
                />
                {errores.nombre && <span className="contacto-error">{errores.nombre}</span>}
              </div>

              <div className="contacto-campo">
                <label className="contacto-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errores.email ? 'contacto-input--error' : ''}
                />
                {errores.email && <span className="contacto-error">{errores.email}</span>}
              </div>

              <div className="contacto-campo">
                <label className="contacto-label">Teléfono *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+56 9 1234 5678"
                  className={errores.telefono ? 'contacto-input--error' : ''}
                />
                {errores.telefono && <span className="contacto-error">{errores.telefono}</span>}
              </div>

              <div className="contacto-campo">
                <label className="contacto-label">Asunto *</label>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  className={errores.asunto ? 'contacto-input--error' : ''}
                />
                {errores.asunto && <span className="contacto-error">{errores.asunto}</span>}
              </div>

              <div className="contacto-campo">
                <label className="contacto-label">Mensaje *</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={5}
                  className={errores.mensaje ? 'contacto-textarea--error' : ''}
                />
                {errores.mensaje && <span className="contacto-error">{errores.mensaje}</span>}
              </div>

              <button type="submit" className="boton boton--primario boton--block">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactoFormulario
