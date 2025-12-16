import { useState, useEffect } from 'react'

function CalendarioEntrega({ value, onChange, disabled, error }) {
  const [mesActual, setMesActual] = useState(new Date())
  const [diasDisponibles, setDiasDisponibles] = useState([])

  const DIAS_SEMANA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const MESES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  // Límite máximo: 30 días hacia adelante
  const DIAS_LIMITE = 30

  useEffect(() => {
    generarDias()
  }, [mesActual])

  const obtenerFechaMinima = () => {
    const manana = new Date()
    manana.setDate(manana.getDate() + 1)
    manana.setHours(0, 0, 0, 0)
    return manana
  }

  const obtenerFechaMaxima = () => {
    const maxima = new Date()
    maxima.setDate(maxima.getDate() + DIAS_LIMITE)
    maxima.setHours(23, 59, 59, 999)
    return maxima
  }

  const esDomingo = (fecha) => {
    return fecha.getDay() === 0
  }

  const esFechaValida = (fecha) => {
    const minima = obtenerFechaMinima()
    const maxima = obtenerFechaMaxima()
    return fecha >= minima && fecha <= maxima && !esDomingo(fecha)
  }

  const generarDias = () => {
    const primerDia = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1)
    const ultimoDia = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0)

    const dias = []

    // Días vacíos al inicio
    for (let i = 0; i < primerDia.getDay(); i++) {
      dias.push(null)
    }

    // Días del mes
    for (let d = 1; d <= ultimoDia.getDate(); d++) {
      const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), d)
      dias.push({
        fecha,
        dia: d,
        valido: esFechaValida(fecha),
        domingo: esDomingo(fecha)
      })
    }

    setDiasDisponibles(dias)
  }

  const cambiarMes = (direccion) => {
    const nuevo = new Date(mesActual)
    nuevo.setMonth(nuevo.getMonth() + direccion)

    // No permitir ir más atrás del mes actual
    const hoy = new Date()
    if (nuevo.getFullYear() < hoy.getFullYear() ||
        (nuevo.getFullYear() === hoy.getFullYear() && nuevo.getMonth() < hoy.getMonth())) {
      return
    }

    // No permitir ir más de 2 meses adelante
    const limite = new Date()
    limite.setMonth(limite.getMonth() + 2)
    if (nuevo > limite) {
      return
    }

    setMesActual(nuevo)
  }

  const seleccionarFecha = (diaInfo) => {
    if (!diaInfo || !diaInfo.valido || disabled) return

    const fechaStr = diaInfo.fecha.toISOString().split('T')[0]
    onChange(fechaStr)
  }

  const estaSeleccionado = (diaInfo) => {
    if (!diaInfo || !value) return false
    const fechaStr = diaInfo.fecha.toISOString().split('T')[0]
    return fechaStr === value
  }

  return (
    <div className={`calendario-entrega ${error ? 'is-invalid' : ''}`}>
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-light"
            onClick={() => cambiarMes(-1)}
            disabled={disabled}
          >
            &lt;
          </button>
          <span className="fw-bold">
            {MESES[mesActual.getMonth()]} {mesActual.getFullYear()}
          </span>
          <button
            type="button"
            className="btn btn-sm btn-outline-light"
            onClick={() => cambiarMes(1)}
            disabled={disabled}
          >
            &gt;
          </button>
        </div>

        <div className="card-body p-2">
          <div className="row g-0 text-center mb-2">
            {DIAS_SEMANA.map((dia, i) => (
              <div
                key={dia}
                className={`col fw-bold small ${i === 0 ? 'text-danger' : ''}`}
              >
                {dia}
              </div>
            ))}
          </div>

          <div className="row g-0">
            {diasDisponibles.map((diaInfo, index) => (
              <div key={index} className="col text-center" style={{ height: '36px' }}>
                {diaInfo && (
                  <button
                    type="button"
                    onClick={() => seleccionarFecha(diaInfo)}
                    disabled={!diaInfo.valido || disabled}
                    className={`btn btn-sm w-100 h-100 p-0
                      ${estaSeleccionado(diaInfo) ? 'btn-primary' : ''}
                      ${!diaInfo.valido ? 'text-muted' : ''}
                      ${diaInfo.domingo ? 'text-danger' : ''}
                      ${diaInfo.valido && !estaSeleccionado(diaInfo) ? 'btn-outline-secondary border-0 hover-bg-light' : ''}
                    `}
                    style={{
                      fontSize: '0.85rem',
                      textDecoration: diaInfo.domingo ? 'line-through' : 'none'
                    }}
                  >
                    {diaInfo.dia}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card-footer bg-light py-2">
          <small className="text-muted d-flex align-items-center gap-2">
            <span className="text-danger">✕</span> Domingos no disponibles
            <span className="ms-2">|</span>
            <span>Máximo {DIAS_LIMITE} días de anticipación</span>
          </small>
        </div>
      </div>

      {error && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </div>
  )
}

export default CalendarioEntrega
