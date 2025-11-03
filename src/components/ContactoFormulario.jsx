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
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Contacto</h1>
          <p className="lead">Estamos aquí para ayudarte</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {enviado && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              ¡Mensaje enviado correctamente! Te contactaremos pronto.
              <button
                type="button"
                className="btn-close"
                onClick={() => setEnviado(false)}
                aria-label="Close"
              ></button>
            </div>
          )}

          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Dirección</h5>
                  <p className="card-text">
                    Av. Providencia 1234<br />
                    Santiago, Chile
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Teléfono</h5>
                  <p className="card-text">
                    +56 9 1234 5678<br />
                    Lunes a Domingo<br />
                    9:00 - 20:00
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Email</h5>
                  <p className="card-text">
                    contacto@milsabores.cl<br />
                    Respuesta en 24 horas
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow">
                <div className="card-body p-4">
                  <h5 className="card-title text-center mb-4">Envíanos un Mensaje</h5>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Nombre *</label>
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
                      <label className="form-label">Asunto *</label>
                      <input
                        type="text"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        className={`form-control ${errores.asunto ? 'is-invalid' : ''}`}
                      />
                      {errores.asunto && <div className="invalid-feedback">{errores.asunto}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Mensaje *</label>
                      <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows={5}
                        className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
                      />
                      {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                      Enviar Mensaje
                    </button>
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
