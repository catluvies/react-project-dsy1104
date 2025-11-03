import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { comunasData } from '../data/comunas'
import { obtenerCostoEnvioComuna } from '../utils/helpers'
import { formatearPrecio } from '../utils/formateo'
import { validarNombre, validarEmail, validarTelefono } from '../utils/validaciones'
import { CarritoContext } from '../context/CarritoContext'

function CheckoutFormulario() {
  const { carrito, subtotal } = useContext(CarritoContext)

  const navigate = useNavigate()
  const [comunaSeleccionada, setComunaSeleccionada] = useState('')
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: ''
  })
  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' })
    }
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!validarNombre(formData.nombre)) {
      nuevosErrores.nombre = 'Nombre inválido (mínimo 2 caracteres, solo letras)'
    }

    if (!validarNombre(formData.apellido)) {
      nuevosErrores.apellido = 'Apellido inválido (mínimo 2 caracteres, solo letras)'
    }

    if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'Email inválido'
    }

    if (formData.telefono && !validarTelefono(formData.telefono)) {
      nuevosErrores.telefono = 'Teléfono inválido (formato: +56 9 1234 5678)'
    }

    if (!comunaSeleccionada) {
      nuevosErrores.comuna = 'Debes seleccionar una comuna'
    }

    if (!formData.direccion || formData.direccion.trim().length < 5) {
      nuevosErrores.direccion = 'Dirección inválida (mínimo 5 caracteres)'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  if (carrito.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>No hay productos en tu carrito</h2>
          <p className="text-muted">Agrega productos antes de proceder al checkout</p>
          <Link to="/productos" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      </div>
    )
  }

  const costoEnvio = comunaSeleccionada ? obtenerCostoEnvioComuna(comunasData, comunaSeleccionada) : 0
  const total = subtotal + costoEnvio

  return (
    <div className="container py-4">
      <h1 className="mb-4">Finalizar Compra</h1>

      <form onSubmit={(e) => {
        e.preventDefault()
        if (!validarFormulario()) {
          alert('Por favor, corrige los errores en el formulario')
          return
        }
        navigate('/exito')
      }}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Información Personal</h5>
                <div className="row g-3">
                  <div className="col-md-6">
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

                  <div className="col-md-6">
                    <label className="form-label">Apellido *</label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                    />
                    {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
                  </div>

                  <div className="col-md-6">
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

                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
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
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Información de Entrega</h5>
                <div className="mb-3">
                  <label className="form-label">Comuna (Región Metropolitana) *</label>
                  <select
                    name="comuna"
                    value={comunaSeleccionada}
                    onChange={(e) => {
                      setComunaSeleccionada(e.target.value)
                      if (errores.comuna) {
                        setErrores({ ...errores, comuna: '' })
                      }
                    }}
                    className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
                  >
                    <option value="">Selecciona tu comuna</option>
                    {comunasData.map(comuna => (
                      <option key={comuna.nombre} value={comuna.nombre}>
                        {comuna.nombre} - Envío: ${formatearPrecio(comuna.costoEnvio)}
                      </option>
                    ))}
                  </select>
                  {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                  <small className="form-text text-muted">El costo de envío se agregará según tu comuna</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección *</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Calle, número, departamento"
                    className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                  />
                  {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Método de Pago</h5>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodoPago"
                    value="tarjeta"
                    defaultChecked
                    id="tarjeta"
                  />
                  <label className="form-check-label" htmlFor="tarjeta">
                    Tarjeta de Crédito/Débito
                  </label>
                </div>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodoPago"
                    value="transferencia"
                    id="transferencia"
                  />
                  <label className="form-check-label" htmlFor="transferencia">
                    Transferencia Bancaria
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodoPago"
                    value="efectivo"
                    id="efectivo"
                  />
                  <label className="form-check-label" htmlFor="efectivo">
                    Efectivo (Pago contra entrega)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card position-sticky" style={{top: '20px'}}>
              <div className="card-body">
                <h5 className="card-title">Resumen de Compra</h5>

                {carrito.map(item => (
                  <div key={item.id} className="d-flex justify-content-between mb-2 small">
                    <span>{item.nombre} x{item.cantidad}</span>
                    <span>${formatearPrecio(item.precio_clp * item.cantidad)}</span>
                  </div>
                ))}

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${formatearPrecio(subtotal)}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Envío:</span>
                  <span>
                    {comunaSeleccionada ? `$${formatearPrecio(costoEnvio)}` : 'Selecciona comuna'}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong>${formatearPrecio(total)}</strong>
                </div>

                {!comunaSeleccionada && (
                  <p className="text-muted small">
                    * Selecciona tu comuna para calcular el envío
                  </p>
                )}

                <button type="submit" className="btn btn-primary w-100">
                  Confirmar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutFormulario
