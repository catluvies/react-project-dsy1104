import { formatearCategoria } from '../utils/formateo'
import './ProductosFiltros.css'

// filtros de productos
function ProductosFiltros(props) {
  // recibir props de filtros
  const busqueda = props.busqueda
  const onBusquedaChange = props.onBusquedaChange
  const categoriaFiltro = props.categoriaFiltro
  const onCategoriaChange = props.onCategoriaChange
  const categorias = props.categorias

  return (
    <div className="productos-filtros">
      <div className="productos-filtros__busqueda">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
        />
      </div>

      <div className="productos-filtros__categoria">
        <select
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
