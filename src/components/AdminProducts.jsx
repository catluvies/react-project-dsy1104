import { useState } from 'react'
import productosData from '../data/productos.json'

function AdminProducts() {
  const [productos] = useState(productosData)
  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [filtroStock, setFiltroStock] = useState('todos')

  const categorias = ['todas', ...Array.from(new Set(productos.map(p => p.categoria)))]

  const formatCategoria = (categoria) => {
    return categoria.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const productosFiltrados = productos.filter(producto => {
    const categoriaMatch = filtroCategoria === 'todas' || producto.categoria === filtroCategoria
    const stockMatch = filtroStock === 'todos' ||
      (filtroStock === 'con-stock' && producto.stock > 0) ||
      (filtroStock === 'sin-stock' && producto.stock === 0) ||
      (filtroStock === 'stock-bajo' && producto.stock > 0 && producto.stock < 5)

    return categoriaMatch && stockMatch
  })

  const productosOrdenados = [...productosFiltrados].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  )

  const getStockBadge = (stock) => {
    if (stock === 0) return { badge: 'bg-danger', text: 'Sin stock' }
    if (stock < 5) return { badge: 'bg-warning', text: 'Stock bajo' }
    if (stock < 15) return { badge: 'bg-info', text: 'Stock medio' }
    return { badge: 'bg-success', text: 'Stock alto' }
  }

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="mb-3">Gestión de Productos</h1>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <button className="btn btn-primary">
            ✏️ Editar Productos
          </button>
          <button className="btn btn-primary">
            📋 Ver Historial de Cambios
          </button>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="form-select"
            style={{width: 'auto'}}
          >
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria === 'todas' ? 'Todas las categorías' : formatCategoria(categoria)}
              </option>
            ))}
          </select>

          <select
            value={filtroStock}
            onChange={(e) => setFiltroStock(e.target.value)}
            className="form-select"
            style={{width: 'auto'}}
          >
            <option value="todos">Todos los productos</option>
            <option value="con-stock">Con stock</option>
            <option value="sin-stock">Sin stock</option>
            <option value="stock-bajo">Stock bajo</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-muted">
          Mostrando {productosOrdenados.length} de {productos.length} productos
        </p>
      </div>

      <div className="row g-3">
        {productosOrdenados.map((producto) => {
          const stockInfo = getStockBadge(producto.stock)

          return (
            <div key={producto.id} className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h3 className="h5 mb-1">{producto.nombre}</h3>
                      <span className="text-muted small">ID: {producto.id}</span>
                    </div>
                    <span className={`badge ${stockInfo.badge}`}>
                      {stockInfo.text}
                    </span>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="fs-4 fw-bold mb-2">
                        ${producto.precio_clp.toLocaleString('es-CL')}
                      </div>
                      <div className="mb-2 text-muted">
                        {formatCategoria(producto.categoria)}
                      </div>
                      <div className="mb-1">
                        <strong>Stock:</strong> {producto.stock} unidades
                      </div>
                      <div className="mb-2">
                        <strong>Porciones:</strong> {producto.porciones}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <p className="text-muted">{producto.descripcion}</p>
                    </div>
                  </div>

                  {producto.metadatos && (
                    <div className="mt-3 pt-3 border-top">
                      <h4 className="h6 mb-2">📋 Metadatos del Producto</h4>
                      <div className="row g-2">
                        <div className="col-md-6">
                          <div className="small">
                            <strong>Creado por:</strong> {producto.metadatos.creado_por}
                            <div className="text-muted">{producto.metadatos.fecha_creacion}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="small">
                            <strong>Último cambio por:</strong> {producto.metadatos.modificado_por}
                            <div className="text-muted">{producto.metadatos.fecha_modificacion}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {productosOrdenados.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No hay productos con los filtros seleccionados
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProducts
