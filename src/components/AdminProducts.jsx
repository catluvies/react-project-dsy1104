import { useState } from 'react'
import productosData from '../data/productos.json'
import './AdminProducts.css'

function AdminProducts() {
  const [productos] = useState(productosData)
  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [filtroStock, setFiltroStock] = useState('todos')

  // Obtener categorías únicas
  const categorias = ['todas', ...Array.from(new Set(productos.map(p => p.categoria)))]

  // Formatear categoría para mostrar
  const formatCategoria = (categoria) => {
    return categoria.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  // Filtrar productos
  const productosFiltrados = productos.filter(producto => {
    const categoriaMatch = filtroCategoria === 'todas' || producto.categoria === filtroCategoria
    const stockMatch = filtroStock === 'todos' || 
      (filtroStock === 'con-stock' && producto.stock > 0) ||
      (filtroStock === 'sin-stock' && producto.stock === 0) ||
      (filtroStock === 'stock-bajo' && producto.stock > 0 && producto.stock < 5)
    
    return categoriaMatch && stockMatch
  })

  // Ordenar por nombre
  const productosOrdenados = [...productosFiltrados].sort((a, b) => 
    a.nombre.localeCompare(b.nombre)
  )

  const getStockStatus = (stock) => {
    if (stock === 0) return { status: 'sin-stock', text: 'Sin stock' }
    if (stock < 5) return { status: 'bajo', text: 'Stock bajo' }
    if (stock < 15) return { status: 'medio', text: 'Stock medio' }
    return { status: 'bien', text: 'Stock alto' }
  }

  return (
    <div className="admin-products">
      <div className="contenedor">
        <div className="admin-products__header">
          <h1 className="titulo-principal">Gestión de Productos</h1>
          
          <div className="admin-products__controles">
            <div className="admin-products__acciones">
              <button className="boton boton--primario">
                ✏️ Editar Productos
              </button>
              <button className="boton boton--primario">
                📋 Ver Historial de Cambios
              </button>
            </div>
            
            <div className="admin-products__filtros">
              <select 
                value={filtroCategoria} 
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="admin-filtro-select"
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
                className="admin-filtro-select"
              >
                <option value="todos">Todos los productos</option>
                <option value="con-stock">Con stock</option>
                <option value="sin-stock">Sin stock</option>
                <option value="stock-bajo">Stock bajo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="admin-products__resumen">
          <p className="texto-muted">
            Mostrando {productosOrdenados.length} de {productos.length} productos
          </p>
        </div>

        <div className="admin-products-grid">
          {productosOrdenados.map((producto) => {
            const stockInfo = getStockStatus(producto.stock)
            
            return (
              <div key={producto.id} className="admin-product-card card">
                <div className="admin-product-card__header">
                  <div className="admin-product-card__info">
                    <h3 className="admin-product-card__nombre">{producto.nombre}</h3>
                    <span className="admin-product-card__id">ID: {producto.id}</span>
                  </div>
                  <div className={`admin-product-card__stock admin-product-card__stock--${stockInfo.status}`}>
                    {stockInfo.text}
                  </div>
                </div>

                <div className="admin-product-card__contenido">
                  <div className="admin-product-card__col">
                    <div className="admin-product-card__precio">
                      ${producto.precio_clp.toLocaleString('es-CL')}
                    </div>
                    <div className="admin-product-card__categoria">
                      {formatCategoria(producto.categoria)}
                    </div>
                    <div className="admin-product-card__spec">
                      <strong>Stock:</strong> {producto.stock} unidades
                    </div>
                    <div className="admin-product-card__spec">
                      <strong>Porciones:</strong> {producto.porciones}
                    </div>
                  </div>

                  <div className="admin-product-card__col">
                    <div className="admin-product-card__descripcion">
                      <p>{producto.descripcion}</p>
                    </div>
                  </div>
                </div>

                {/* Metadatos destacados */}
                {producto.metadatos && (
                  <div className="admin-product-card__metadatos">
                    <h4>📋 Metadatos del Producto</h4>
                    <div className="admin-product-metadatos">
                      <div className="admin-product-metadata admin-product-metadata--destacado">
                        <div className="admin-product-metadata__info">
                          <strong>Creado por:</strong> {producto.metadatos.creado_por}
                          <span className="admin-product-metadata__fecha">
                            {producto.metadatos.fecha_creacion}
                          </span>
                        </div>
                      </div>
                      <div className="admin-product-metadata admin-product-metadata--destacado">
                        <div className="admin-product-metadata__info">
                          <strong>Último cambio por:</strong> {producto.metadatos.modificado_por}
                          <span className="admin-product-metadata__fecha">
                            {producto.metadatos.fecha_modificacion}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {productosOrdenados.length === 0 && (
            <div className="admin-products-vacio">
              <p>No hay productos con los filtros seleccionados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminProducts
