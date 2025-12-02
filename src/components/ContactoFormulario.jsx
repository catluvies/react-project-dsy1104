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

    if (!validarNombre(formData.nombre)) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'Email inválido'
    }

    if (formData.telefono && !validarTelefono(formData.telefono)) {
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

        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card border-success shadow-lg">
                  <div className="card-body text-center py-5">
                    <div className="mb-4">
                      <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-success mb-3">¡Mensaje Enviado!</h2>
                    <p className="text-muted mb-4">
                      Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos
                      a la brevedad posible en las próximas 24 horas hábiles.
                    </p>
                    <div className="bg-light rounded p-3 mb-4">
                      <p className="mb-1 small text-muted">Mientras tanto, puedes contactarnos directamente:</p>
                      <p className="mb-0">
                        <strong>WhatsApp:</strong>{' '}
                        <a href="https://wa.me/56912345678" className="text-decoration-none">+56 9 1234 5678</a>
                      </p>
                    </div>
                    <button onClick={() => setEnviado(false)} className="btn btn-primary">
                      Enviar otro mensaje
                    </button>
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

      <section className="py-5">
        <div className="container">
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body py-4">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                  </div>
                  <h5 className="card-title">Visítanos</h5>
                  <p className="card-text text-muted">
                    Av. Providencia 1234, Local 10<br />
                    Santiago, Región Metropolitana
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body py-4">
                  <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                  </div>
                  <h5 className="card-title">WhatsApp</h5>
                  <p className="card-text text-muted mb-2">
                    Respuesta inmediata<br />
                    Lun - Dom: 9:00 - 20:00
                  </p>
                  <a href="https://wa.me/56912345678" className="btn btn-success btn-sm" target="_blank" rel="noopener noreferrer">
                    +56 9 1234 5678
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body py-4">
                  <div className="bg-info bg-opacity-10 text-info rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                    </svg>
                  </div>
                  <h5 className="card-title">Email</h5>
                  <p className="card-text text-muted mb-2">
                    Respuesta en 24 horas
                  </p>
                  <a href="mailto:contacto@milsabores.cl" className="text-decoration-none">
                    contacto@milsabores.cl
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow border-0">
                <div className="card-body p-4 p-md-5">
                  <h4 className="card-title text-center mb-4">Envíanos un Mensaje</h4>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Nombre *</label>
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                          placeholder="Tu nombre"
                          disabled={enviando}
                        />
                        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                          placeholder="tu@email.com"
                          disabled={enviando}
                        />
                        {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                      </div>

                      <div className="col-12">
                        <label className="form-label">Teléfono (opcional)</label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder="+56 9 1234 5678"
                          className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                          disabled={enviando}
                        />
                        {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                      </div>

                      <div className="col-12">
                        <label className="form-label">Asunto *</label>
                        <input
                          type="text"
                          name="asunto"
                          value={formData.asunto}
                          onChange={handleChange}
                          className={`form-control ${errores.asunto ? 'is-invalid' : ''}`}
                          placeholder="¿En qué podemos ayudarte?"
                          disabled={enviando}
                        />
                        {errores.asunto && <div className="invalid-feedback">{errores.asunto}</div>}
                      </div>

                      <div className="col-12">
                        <label className="form-label">Mensaje *</label>
                        <textarea
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleChange}
                          rows={5}
                          className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
                          placeholder="Escribe tu mensaje aquí..."
                          disabled={enviando}
                        />
                        {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
                      </div>

                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100 py-2" disabled={enviando}>
                          {enviando ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Enviando...
                            </>
                          ) : (
                            'Enviar Mensaje'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
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
