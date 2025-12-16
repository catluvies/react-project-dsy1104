import { useState } from 'react'
import { validarEmail, validarTelefono, validarNombre, validarTexto } from '../utils/validaciones'

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
  const [enviando, setEnviando] = useState(false)

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

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'Por favor ingresa tu nombre'
    } else if (!validarNombre(formData.nombre)) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres (ej: María García)'
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'Por favor ingresa tu correo electrónico'
    } else if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'Formato de email inválido (ej: nombre@correo.com)'
    }

    if (formData.telefono && !validarTelefono(formData.telefono)) {
      nuevosErrores.telefono = 'Formato: +56 9 1234 5678 o 912345678'
    }

    if (!formData.asunto.trim()) {
      nuevosErrores.asunto = 'Por favor indica el motivo de tu mensaje'
    } else if (!validarTexto(formData.asunto, 5)) {
      nuevosErrores.asunto = 'El asunto debe tener al menos 5 caracteres'
    }

    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = 'Por favor escribe tu mensaje'
    } else if (!validarTexto(formData.mensaje, 10)) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    setEnviando(true)
    setTimeout(() => {
      setEnviando(false)
      setEnviado(true)
      setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })
    }, 1500)
  }

  if (enviado) {
    return (
      <>
        <section className="bg-primary text-white text-center py-5">
          <div className="container">
            <h1>Contacto</h1>
            <p className="lead">Estamos aquí para ayudarte</p>
          </div>
        </section>

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

                  <div className="glass-success-card">
                    {/* Barra de título */}
                    <div className="glass-title-bar">
                      <span className="title-text">Mensaje Enviado</span>
                      <div className="window-buttons">
                        <span className="window-btn window-btn-minimize"></span>
                        <span className="window-btn window-btn-maximize"></span>
                        <span className="window-btn window-btn-close"></span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-4 p-md-5 text-center">
                      <div className="mb-4">
                        <div className="d-inline-flex align-items-center justify-content-center rounded-circle"
                             style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #6bcb77, #4caf50)'}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                          </svg>
                        </div>
                      </div>
                      <h2 className="mb-3" style={{color: '#4caf50'}}>¡Mensaje Enviado!</h2>
                      <p className="text-muted mb-4">
                        Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos
                        a la brevedad posible en las próximas 24 horas hábiles.
                      </p>
                      <div className="rounded-3 p-3 mb-4" style={{background: 'rgba(107, 203, 119, 0.1)'}}>
                        <p className="mb-1 small text-muted">Mientras tanto, puedes contactarnos directamente:</p>
                        <p className="mb-0">
                          <strong>WhatsApp:</strong>{' '}
                          <a href="https://wa.me/56912345678" className="text-decoration-none" style={{color: '#25D366'}}>
                            +56 9 1234 5678
                          </a>
                        </p>
                      </div>
                      <button onClick={() => setEnviado(false)} className="glass-btn">
                        Enviar otro mensaje
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Contacto</h1>
          <p className="lead">Estamos aquí para ayudarte</p>
        </div>
      </section>

      <section className="contacto-bg-decorativo py-5">
        <div className="container">
          {/* Tarjetas de información de contacto - Estilo Glass */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="glass-contact-card h-100">
                <div className="glass-contact-title-bar">
                  <span className="title-text">Ubicación</span>
                  <div className="window-buttons">
                    <span className="window-btn window-btn-minimize"></span>
                    <span className="window-btn window-btn-maximize"></span>
                    <span className="window-btn window-btn-close"></span>
                  </div>
                </div>
                <div className="glass-contact-content">
                  <img
                    src="/images/detalles/direccion-contacto-form.png"
                    alt="Ubicación"
                    className="contact-icon-pixel"
                  />
                  <h5>Visítanos</h5>
                  <p>
                    Av. Providencia 1234, Local 10.<br />
                    Santiago, Región Metropolitana.
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Av.+Providencia+1234,+Santiago,+Chile"
                    className="glass-btn-sm glass-btn-maps"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ir a Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glass-contact-card h-100">
                <div className="glass-contact-title-bar">
                  <span className="title-text">WhatsApp</span>
                  <div className="window-buttons">
                    <span className="window-btn window-btn-minimize"></span>
                    <span className="window-btn window-btn-maximize"></span>
                    <span className="window-btn window-btn-close"></span>
                  </div>
                </div>
                <div className="glass-contact-content">
                  <img
                    src="/images/detalles/wsp-contacto-form.png"
                    alt="WhatsApp"
                    className="contact-icon-pixel"
                  />
                  <h5>WhatsApp</h5>
                  <p>
                    Respuesta inmediata.<br />
                    Lun - Dom: 9:00 - 20:00.
                  </p>
                  <a href="https://wa.me/56912345678" className="glass-btn-sm glass-btn-whatsapp" target="_blank" rel="noopener noreferrer">
                    +56 9 1234 5678
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glass-contact-card h-100">
                <div className="glass-contact-title-bar">
                  <span className="title-text">Email</span>
                  <div className="window-buttons">
                    <span className="window-btn window-btn-minimize"></span>
                    <span className="window-btn window-btn-maximize"></span>
                    <span className="window-btn window-btn-close"></span>
                  </div>
                </div>
                <div className="glass-contact-content">
                  <img
                    src="/images/detalles/email-contacto-form.png"
                    alt="Email"
                    className="contact-icon-pixel"
                  />
                  <h5>Email</h5>
                  <p>
                    Respuesta en 24 horas.
                  </p>
                  <a href="mailto:contacto@milsabores.cl" className="glass-email-link">
                    contacto@milsabores.cl
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario con efecto glass */}
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
                    <span className="title-text">Contacto</span>
                    <div className="window-buttons">
                      <span className="window-btn window-btn-minimize"></span>
                      <span className="window-btn window-btn-maximize"></span>
                      <span className="window-btn window-btn-close"></span>
                    </div>
                  </div>

                  {/* Contenido del formulario */}
                  <div className="p-4 p-md-5">
                    {/* Header con imagen */}
                    <div className="text-center mb-4">
                      <img
                        src="/images/detalles/pastel-formulario-contacto.gif"
                        alt="Pastelería"
                        className="glass-form-image"
                        style={{ width: '80px', height: '80px', imageRendering: 'pixelated' }}
                      />
                      <h4 className="mb-0">Envíanos un Mensaje</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      {/* Nombre y Email en una fila */}
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label className="glass-label">Nombre *</label>
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={`glass-input ${errores.nombre ? 'is-invalid' : ''}`}
                            placeholder="Ej: María García"
                            disabled={enviando}
                          />
                          {errores.nombre && <div className="text-danger small mt-1">{errores.nombre}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="glass-label">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`glass-input ${errores.email ? 'is-invalid' : ''}`}
                            placeholder="Ej: nombre@correo.com"
                            disabled={enviando}
                          />
                          {errores.email && <div className="text-danger small mt-1">{errores.email}</div>}
                        </div>
                      </div>

                      {/* Teléfono */}
                      <div className="mb-3">
                        <label className="glass-label">Teléfono (opcional)</label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder="Ej: +56 9 1234 5678"
                          className={`glass-input ${errores.telefono ? 'is-invalid' : ''}`}
                          disabled={enviando}
                        />
                        {errores.telefono && <div className="text-danger small mt-1">{errores.telefono}</div>}
                      </div>

                      {/* Asunto */}
                      <div className="mb-3">
                        <label className="glass-label">Asunto *</label>
                        <input
                          type="text"
                          name="asunto"
                          value={formData.asunto}
                          onChange={handleChange}
                          className={`glass-input ${errores.asunto ? 'is-invalid' : ''}`}
                          placeholder="Ej: Cotización de torta de cumpleaños"
                          disabled={enviando}
                        />
                        {errores.asunto && <div className="text-danger small mt-1">{errores.asunto}</div>}
                      </div>

                      {/* Mensaje */}
                      <div className="mb-4">
                        <label className="glass-label">Mensaje *</label>
                        <textarea
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleChange}
                          rows={4}
                          className={`glass-input ${errores.mensaje ? 'is-invalid' : ''}`}
                          placeholder="Cuéntanos qué necesitas, fecha del evento, cantidad de personas..."
                          disabled={enviando}
                        />
                        {errores.mensaje && <div className="text-danger small mt-1">{errores.mensaje}</div>}
                      </div>

                      {/* Botón */}
                      <button type="submit" className="glass-btn w-100" disabled={enviando}>
                        {enviando ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Enviando...
                          </>
                        ) : (
                          'Enviar Mensaje'
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactoFormulario
