import { formatearCategoria } from '../utils/formateo'

function ProductosFiltros(props) {
  const busqueda = props.busqueda
  const onBusquedaChange = props.onBusquedaChange
  const categoriaFiltro = props.categoriaFiltro
  const onCategoriaChange = props.onCategoriaChange
  const categorias = props.categorias

  return (
    <div className="row mb-4">
      <div className="col-md-6 mb-3 mb-md-0">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <select
          className="form-select"
          value={categoriaFiltro}
          onChange={(e) => onCategoriaChange(e.target.value)}
        >
          <option value="todas">Todas las categorías</option>
          {categorias.map(categoria => (
            <option key={categoria} value={categoria}>
              {formatearCategoria(categoria)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductosFiltros
