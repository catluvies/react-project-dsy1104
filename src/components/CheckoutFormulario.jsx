import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { comunasData, RETIRO_TIENDA, obtenerCostoEnvio } from '../data/comunas'
import { formatearPrecio } from '../utils/formateo'
import { validarNombre, validarEmail, validarTelefono } from '../utils/validaciones'
import { CarritoContext } from '../context/CarritoContext'
import { AuthContext } from '../context/AuthContext'
import { boletasService } from '../api/boletasService'

function CheckoutFormulario() {
  const { carrito, subtotal, vaciarCarrito } = useContext(CarritoContext)
  const { usuario, isAuthenticated } = useContext(AuthContext)

  const navigate = useNavigate()
  
  const HORARIOS_ENTREGA = [
    { valor: 'H_09_11', texto: '09:00 - 11:00' },
    { valor: 'H_11_13', texto: '11:00 - 13:00' },
    { valor: 'H_14_16', texto: '14:00 - 16:00' },
    { valor: 'H_16_18', texto: '16:00 - 18:00' },
    { valor: 'H_18_20', texto: '18:00 - 20:00' }
  ]
  const [tipoEntrega, setTipoEntrega] = useState('despacho')
  const [comunaSeleccionada, setComunaSeleccionada] = useState('')
  const [metodoPago, setMetodoPago] = useState('TRANSFERENCIA')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [horarioEntrega, setHorarioEntrega] = useState('')
  const [notas, setNotas] = useState('')
  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || '',
    apellido: '',
    email: usuario?.email || '',
    telefono: '',
    direccion: ''
  })
  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(false)
  const [errorGeneral, setErrorGeneral] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' })
    }
    setErrorGeneral('')
  }

  const obtenerFechaMinima = () => {
    const manana = new Date()
    manana.setDate(manana.getDate() + 1)
    return manana.toISOString().split('T')[0]
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!isAuthenticated()) {
      nuevosErrores.auth = 'Debes iniciar sesión para realizar una compra'
    }

    if (!validarNombre(formData.nombre)) {
      nuevosErrores.nombre = 'Nombre inválido (mínimo 2 caracteres)'
    }

    if (!validarNombre(formData.apellido)) {
      nuevosErrores.apellido = 'Apellido inválido (mínimo 2 caracteres)'
    }

    if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'Email inválido'
    }

    if (formData.telefono && !validarTelefono(formData.telefono)) {
      nuevosErrores.telefono = 'Teléfono inválido'
    }

    if (tipoEntrega === 'despacho') {
      if (!comunaSeleccionada) {
        nuevosErrores.comuna = 'Debes seleccionar una comuna'
      }
      if (!formData.direccion || formData.direccion.trim().length < 5) {
        nuevosErrores.direccion = 'Dirección inválida (mínimo 5 caracteres)'
      }
    }

    if (!fechaEntrega) {
      nuevosErrores.fechaEntrega = 'Debes seleccionar una fecha de entrega'
    }

    if (!horarioEntrega) {
      nuevosErrores.horarioEntrega = 'Debes seleccionar un horario de entrega'
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

  const esRetiroTienda = tipoEntrega === 'retiro'
  const comunaFinal = esRetiroTienda ? RETIRO_TIENDA.nombre : comunaSeleccionada
  const costoEnvio = esRetiroTienda ? 0 : obtenerCostoEnvio(comunaSeleccionada)
  const total = subtotal + (costoEnvio || 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    setCargando(true)
    setErrorGeneral('')

    try {
      const detalles = carrito.map(item => ({
        productoId: item.id,
        cantidad: item.cantidad,
        precioUnitario: item.precio
      }))

      const fechaEntregaISO = new Date(fechaEntrega + 'T12:00:00').toISOString()

      const boletaData = {
        detalles,
        direccionEntrega: esRetiroTienda ? RETIRO_TIENDA.direccion : formData.direccion,
        comuna: comunaFinal,
        costoEnvio: costoEnvio || 0,
        tipoEntrega: esRetiroTienda ? 'RETIRO' : 'DELIVERY',
        metodoPago,
        notasAdicionales: notas || null,
        fechaEntrega: fechaEntregaISO,
        horarioEntrega
      }

      await boletasService.crear(usuario.id, boletaData)
      vaciarCarrito()
      navigate('/exito')
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al procesar la compra. Intenta nuevamente.'
      setErrorGeneral(mensaje)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Finalizar Compra</h1>

      {!isAuthenticated() && (
        <div className="alert alert-warning mb-4">
          <strong>Debes iniciar sesión para completar tu compra.</strong>
          <div className="mt-2">
            <Link to="/login" className="btn btn-primary btn-sm me-2">Iniciar Sesión</Link>
            <Link to="/registro" className="btn btn-outline-primary btn-sm">Registrarse</Link>
          </div>
        </div>
      )}

      {errorGeneral && (
        <div className="alert alert-danger" role="alert">
          {errorGeneral}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
                      disabled={cargando}
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
                      disabled={cargando}
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
                      disabled={cargando}
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
                      placeholder="+56912345678"
                      className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                      disabled={cargando}
                    />
                    {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">RUT</label>
                    <input
                      type="text"
                      value={usuario?.rut || ''}
                      className="form-control"
                      disabled
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Región</label>
                    <input
                      type="text"
                      value="Región Metropolitana"
                      className="form-control"
                      disabled
                    />
                    <small className="text-muted">Solo operamos en la Región Metropolitana</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Tipo de Entrega</h5>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tipoEntrega"
                    id="despacho"
                    value="despacho"
                    checked={tipoEntrega === 'despacho'}
                    onChange={(e) => setTipoEntrega(e.target.value)}
                    disabled={cargando}
                  />
                  <label className="form-check-label" htmlFor="despacho">
                    <strong>Despacho a domicilio</strong>
                  </label>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tipoEntrega"
                    id="retiro"
                    value="retiro"
                    checked={tipoEntrega === 'retiro'}
                    onChange={(e) => setTipoEntrega(e.target.value)}
                    disabled={cargando}
                  />
                  <label className="form-check-label" htmlFor="retiro">
                    <strong>Retiro en tienda</strong> (gratis)
                  </label>
                </div>

                {tipoEntrega === 'retiro' && (
                  <div className="alert alert-info">
                    <strong>Dirección de retiro:</strong><br />
                    {RETIRO_TIENDA.direccion}
                  </div>
                )}

                {tipoEntrega === 'despacho' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Comuna *</label>
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
                        disabled={cargando}
                      >
                        <option value="">Selecciona tu comuna</option>
                        {comunasData.map(comuna => (
                          <option key={comuna.nombre} value={comuna.nombre}>
                            {comuna.nombre} - Envío: ${formatearPrecio(comuna.costoEnvio)}
                          </option>
                        ))}
                      </select>
                      {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                      <small className="text-muted">Solo despachamos en la Región Metropolitana</small>
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
                        disabled={cargando}
                      />
                      {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                    </div>
                  </>
                )}

                <div className="mb-3">
                  <label className="form-label">Fecha de entrega *</label>
                  <input
                    type="date"
                    value={fechaEntrega}
                    onChange={(e) => {
                      setFechaEntrega(e.target.value)
                      if (errores.fechaEntrega) {
                        setErrores({ ...errores, fechaEntrega: '' })
                      }
                    }}
                    min={obtenerFechaMinima()}
                    className={`form-control ${errores.fechaEntrega ? 'is-invalid' : ''}`}
                    disabled={cargando}
                  />
                  {errores.fechaEntrega && <div className="invalid-feedback">{errores.fechaEntrega}</div>}
                  <small className="text-muted">Los pedidos requieren al menos 24 horas de anticipación</small>
                </div>


                <div className="mb-3">
                  <label className="form-label">Horario de entrega *</label>
                  <select
                    value={horarioEntrega}
                    onChange={(e) => {
                      setHorarioEntrega(e.target.value)
                      if (errores.horarioEntrega) {
                        setErrores({ ...errores, horarioEntrega: '' })
                      }
                    }}
                    className={`form-select ${errores.horarioEntrega ? 'is-invalid' : ''}`}
                    disabled={cargando}
                  >
                    <option value="">Selecciona un horario</option>
                    {HORARIOS_ENTREGA.map(h => (
                      <option key={h.valor} value={h.valor}>{h.texto}</option>
                    ))}
                  </select>
                  {errores.horarioEntrega && <div className="invalid-feedback">{errores.horarioEntrega}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Notas adicionales</label>
                  <textarea
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    placeholder="Instrucciones especiales, horario de entrega, etc."
                    className="form-control"
                    rows="3"
                    disabled={cargando}
                  />
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
                    value="TRANSFERENCIA"
                    checked={metodoPago === 'TRANSFERENCIA'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    id="transferencia"
                    disabled={cargando}
                  />
                  <label className="form-check-label" htmlFor="transferencia">
                    <strong>Transferencia Bancaria</strong>
                  </label>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodoPago"
                    value="EFECTIVO"
                    checked={metodoPago === 'EFECTIVO'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    id="efectivo"
                    disabled={cargando}
                  />
                  <label className="form-check-label" htmlFor="efectivo">
                    <strong>Efectivo</strong> (pago contra entrega)
                  </label>
                </div>

                {metodoPago === 'TRANSFERENCIA' && (
                  <div className="alert alert-info mb-0">
                    <small>
                      <strong>Datos para transferencia:</strong><br />
                      Banco: Banco Estado<br />
                      Tipo de cuenta: Cuenta Corriente<br />
                      Número: 123456789<br />
                      RUT: 12.345.678-9<br />
                      Nombre: Pastelería Mil Sabores<br />
                      Email: pagos@milsabores.cl<br /><br />
                      <em>Una vez realizada la transferencia, tu pedido será confirmado por nuestro equipo.</em>
                    </small>
                  </div>
                )}

                {metodoPago === 'EFECTIVO' && (
                  <div className="alert alert-warning mb-0">
                    <small>
                      <strong>Pago en efectivo:</strong><br />
                      Deberás pagar el monto total al momento de recibir tu pedido.
                      {tipoEntrega === 'retiro' && ' Paga directamente en tienda al retirar.'}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card position-sticky" style={{top: '20px'}}>
              <div className="card-body">
                <h5 className="card-title">Resumen de Compra</h5>

                {carrito.map(item => {
                  const precio = item.precio || 0
                  return (
                    <div key={item.id} className="d-flex justify-content-between mb-2 small">
                      <span>{item.nombre} x{item.cantidad}</span>
                      <span>${formatearPrecio(precio * item.cantidad)}</span>
                    </div>
                  )
                })}

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${formatearPrecio(subtotal)}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Envío:</span>
                  <span>
                    {esRetiroTienda ? (
                      <span className="text-success">Gratis (retiro)</span>
                    ) : comunaSeleccionada ? (
                      `$${formatearPrecio(costoEnvio)}`
                    ) : (
                      'Selecciona comuna'
                    )}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong className="text-primary">${formatearPrecio(total)}</strong>
                </div>

                {fechaEntrega && (
                  <p className="small text-muted mb-3">
                    Fecha de entrega: {new Date(fechaEntrega).toLocaleDateString('es-CL')}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={cargando || !isAuthenticated()}
                >
                  {cargando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Procesando...
                    </>
                  ) : (
                    'Confirmar Pedido'
                  )}
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
