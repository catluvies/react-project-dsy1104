import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { comunasData } from '../data/comunas'
import { obtenerCostoEnvioComuna } from '../utils/helpers'
import { formatearPrecio } from '../utils/formateo'
import { validarNombre, validarEmail, validarTelefono } from '../utils/validaciones'
import { CarritoContext } from '../context/CarritoContext'
import './CheckoutFormulario.css'

// Componente de formulario de checkout (pago)
function CheckoutFormulario() {
  // Usar el contexto del carrito
  const { carrito, subtotal } = useContext(CarritoContext)

  const navigate = useNavigate()

  // Estado local para la comuna seleccionada
  const [comunaSeleccionada, setComunaSeleccionada] = useState('')

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: ''
  })

  // Estado para los errores de validación
  const [errores, setErrores] = useState({})

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Limpiar error del campo si había uno
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' })
    }
  }

  // Función para validar el formulario
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
      <section className="checkout-vacio">
        <div className="checkout-vacio__contenedor">
          <h2 className="checkout-vacio__titulo">No hay productos en tu carrito</h2>
          <p className="checkout-vacio__descripcion">Agrega productos antes de proceder al checkout</p>
          <Link to="/productos" className="boton boton--primario">
            Ver Productos
          </Link>
        </div>
      </section>
    )
  }

  const costoEnvio = comunaSeleccionada ? obtenerCostoEnvioComuna(comunasData, comunaSeleccionada) : 0
  const total = subtotal + costoEnvio

  return (
    <section className="checkout">
      <div className="checkout__contenedor">
        <h1 className="checkout__titulo">Finalizar Compra</h1>

        <form onSubmit={(e) => {
          e.preventDefault()
          if (!validarFormulario()) {
            alert('Por favor, corrige los errores en el formulario')
            return
          }
          navigate('/exito')
        }}>
          <div className="checkout__grid">
            {/* Formulario */}
            <div className="checkout__formulario">
              {/* Información Personal */}
              <div className="card checkout__card">
                <h5 className="checkout__card-titulo">Información Personal</h5>
                <div className="checkout__card-contenido">
                  <div className="checkout__fila">
                    <div className="checkout__campo">
                      <label className="checkout__label">Nombre *</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={errores.nombre ? 'checkout__input--error' : ''}
                      />
                      {errores.nombre && <span className="checkout__error">{errores.nombre}</span>}
                    </div>

                    <div className="checkout__campo">
                      <label className="checkout__label">Apellido *</label>
                      <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        className={errores.apellido ? 'checkout__input--error' : ''}
                      />
                      {errores.apellido && <span className="checkout__error">{errores.apellido}</span>}
                    </div>
                  </div>

                  <div className="checkout__fila">
                    <div className="checkout__campo">
                      <label className="checkout__label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errores.email ? 'checkout__input--error' : ''}
                      />
                      {errores.email && <span className="checkout__error">{errores.email}</span>}
                    </div>

                    <div className="checkout__campo">
                      <label className="checkout__label">Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+56 9 1234 5678"
                        className={errores.telefono ? 'checkout__input--error' : ''}
                      />
                      {errores.telefono && <span className="checkout__error">{errores.telefono}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Entrega */}
              <div className="card checkout__card">
                <h5 className="checkout__card-titulo">Información de Entrega</h5>
                <div className="checkout__card-contenido">
                  <div className="checkout__campo">
                    <label className="checkout__label">Comuna (Región Metropolitana) *</label>
                    <select
                      name="comuna"
                      value={comunaSeleccionada}
                      onChange={(e) => {
                        setComunaSeleccionada(e.target.value)
                        if (errores.comuna) {
                          setErrores({ ...errores, comuna: '' })
                        }
                      }}
                      className={errores.comuna ? 'checkout__input--error' : ''}
                    >
                      <option value="">Selecciona tu comuna</option>
                      {comunasData.map(comuna => (
                        <option key={comuna.nombre} value={comuna.nombre}>
                          {comuna.nombre} - Envío: ${formatearPrecio(comuna.costoEnvio)}
                        </option>
                      ))}
                    </select>
                    {errores.comuna && <span className="checkout__error">{errores.comuna}</span>}
                    <small className="checkout__ayuda">El costo de envío se agregará según tu comuna</small>
                  </div>

                  <div className="checkout__campo">
                    <label className="checkout__label">Dirección *</label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      placeholder="Calle, número, departamento"
                      className={errores.direccion ? 'checkout__input--error' : ''}
                    />
                    {errores.direccion && <span className="checkout__error">{errores.direccion}</span>}
                  </div>
                </div>
              </div>

              {/* Método de Pago */}
              <div className="card checkout__card">
                <h5 className="checkout__card-titulo">Método de Pago</h5>
                <div className="checkout__card-contenido">
                  <div className="checkout__radio">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="tarjeta"
                      defaultChecked
                      id="tarjeta"
                    />
                    <label htmlFor="tarjeta">Tarjeta de Crédito/Débito</label>
                  </div>

                  <div className="checkout__radio">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="transferencia"
                      id="transferencia"
                    />
                    <label htmlFor="transferencia">Transferencia Bancaria</label>
                  </div>

                  <div className="checkout__radio">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="efectivo"
                      id="efectivo"
                    />
                    <label htmlFor="efectivo">Efectivo (Pago contra entrega)</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumen */}
            <div className="checkout__resumen">
              <div className="card checkout__resumen-card">
                <h5 className="checkout__resumen-titulo">Resumen de Compra</h5>

                {/* Lista de productos del carrito */}
                {carrito.map(item => (
                  <div key={item.id} className="checkout__producto">
                    <span>{item.nombre} x{item.cantidad}</span>
                    <span>${formatearPrecio(item.precio_clp * item.cantidad)}</span>
                  </div>
                ))}

                <div className="checkout__resumen-divider"></div>

                <div className="checkout__resumen-item">
                  <span>Subtotal:</span>
                  <span>${formatearPrecio(subtotal)}</span>
                </div>

                <div className="checkout__resumen-item">
                  <span>Envío:</span>
                  <span>
                    {comunaSeleccionada ? `$${formatearPrecio(costoEnvio)}` : 'Selecciona comuna'}
                  </span>
                </div>

                <div className="checkout__resumen-divider"></div>

                <div className="checkout__resumen-total">
                  <strong>Total:</strong>
                  <strong>${formatearPrecio(total)}</strong>
                </div>

                {!comunaSeleccionada && (
                  <p className="checkout__resumen-nota">
                    * Selecciona tu comuna para calcular el envío
                  </p>
                )}

                <button type="submit" className="boton boton--primario boton--block">
                  Confirmar Compra
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CheckoutFormulario
