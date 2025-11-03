import { Link } from 'react-router-dom'
import productosData from '../data/productos.json'
import { obtenerCategoriasUnicas } from '../utils/productos'
import { formatearCategoria } from '../utils/formateo'

function CategoriasGrid() {
  const categoriasUnicas = obtenerCategoriasUnicas(productosData)

  const categoriasConInfo = []
  for (let i = 0; i < categoriasUnicas.length; i++) {
    const categoria = categoriasUnicas[i]

    let cantidad = 0
    for (let j = 0; j < productosData.length; j++) {
      if (productosData[j].categoria === categoria) {
        cantidad = cantidad + 1
      }
    }

    categoriasConInfo.push({
      nombre: categoria,
      cantidad: cantidad
    })
  }

  return (
    <>
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Categorías</h1>
          <p className="lead">Explora nuestras categorías y encuentra el producto perfecto</p>
        </div>
      </section>
      <section className="py-5">
        <div className="container">

        <div className="row g-4">
          {categoriasConInfo.map(categoria => (
            <div key={categoria.nombre} className="col-md-6 col-lg-4">
              <div className="card h-100 text-center border-2">
                <div className="card-body">
                  <h5 className="card-title text-cafe">{formatearCategoria(categoria.nombre)}</h5>
                  <p className="card-text text-muted mb-3">
                    <span className="badge" style={{backgroundColor: '#FFB6C1', color: '#654321'}}>
                      {categoria.cantidad} {categoria.cantidad === 1 ? 'producto' : 'productos'}
                    </span>
                  </p>
                  <Link
                    to={`/productos?categoria=${categoria.nombre}`}
                    className="btn btn-primary"
                  >
                    Ver Productos
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </>
  )
}

export default CategoriasGrid
