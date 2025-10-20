import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// Páginas públicas
import InicioPage from './pages/InicioPage'
import ProductosPage from './pages/ProductosPage'
import DetalleProductoPage from './pages/DetalleProductoPage'
import CategoriasPage from './pages/CategoriasPage'
import CarritoPage from './pages/CarritoPage'
import CheckoutPage from './pages/CheckoutPage'
import ExitoPage from './pages/ExitoPage'
import NosotrosPage from './pages/NosotrosPage'
import OfertasPage from './pages/OfertasPage'
import BlogPage from './pages/BlogPage'
import DetalleBlogPage from './pages/DetalleBlogPage'
import ContactoPage from './pages/ContactoPage'
import LoginPage from './pages/LoginPage'
import RegistroPage from './pages/RegistroPage'

import './App.css'

/**
 * Componente principal App
 * Responsabilidad: Configurar las rutas, el layout general y manejar el estado del carrito
 */
function App() {
  // Estado del carrito de compras
  // Cargar carrito desde localStorage al iniciar
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito')
    return carritoGuardado ? JSON.parse(carritoGuardado) : []
  })

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto, cantidad) => {
    // Verificar si hay stock disponible
    if (producto.stock === 0) {
      alert('Este producto no tiene stock disponible')
      return
    }

    // Buscar si el producto ya existe en el carrito
    const itemExistente = carrito.find(item => item.id === producto.id)
    const cantidadEnCarrito = itemExistente ? itemExistente.cantidad : 0
    const cantidadTotal = cantidadEnCarrito + cantidad

    // Verificar que no se exceda el stock
    if (cantidadTotal > producto.stock) {
      alert(`Solo hay ${producto.stock} unidades disponibles. Ya tienes ${cantidadEnCarrito} en el carrito.`)
      return
    }

    if (itemExistente) {
      // Si existe, incrementar la cantidad
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      )
      setCarrito(nuevoCarrito)
    } else {
      // Si no existe, agregarlo como nuevo item
      setCarrito([...carrito, { ...producto, cantidad }])
    }
  }

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter(item => item.id !== productoId)
    setCarrito(nuevoCarrito)
  }

  // Función para actualizar la cantidad de un producto
  const actualizarCantidad = (productoId, nuevaCantidad) => {
    // Si la cantidad es 0 o menor, eliminar el producto
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId)
      return
    }

    // Actualizar la cantidad del producto específico
    const nuevoCarrito = carrito.map(item =>
      item.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    )
    setCarrito(nuevoCarrito)
  }

  // Función para vaciar completamente el carrito
  const vaciarCarrito = () => {
    setCarrito([])
    localStorage.removeItem('carrito')
  }

  // Calcular el subtotal sumando precio * cantidad de cada producto
  const subtotal = carrito.reduce((total, item) => {
    return total + (item.precio_clp * item.cantidad)
  }, 0)

  // Calcular el total de items en el carrito
  const totalItems = carrito.reduce((total, item) => {
    return total + item.cantidad
  }, 0)

  return (
    <Routes>
      {/* Rutas públicas con Header y Footer normales */}
      <Route path="/*" element={
        <>
          <Header totalItems={totalItems} />
          <main>
            <Routes>
              <Route path="/" element={<InicioPage />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route
                path="/producto/:id"
                element={<DetalleProductoPage agregarAlCarrito={agregarAlCarrito} />}
              />
              <Route path="/categorias" element={<CategoriasPage />} />
              <Route
                path="/carrito"
                element={
                  <CarritoPage
                    carrito={carrito}
                    subtotal={subtotal}
                    eliminarDelCarrito={eliminarDelCarrito}
                    actualizarCantidad={actualizarCantidad}
                  />
                }
              />
              <Route
                path="/checkout"
                element={
                  <CheckoutPage
                    carrito={carrito}
                    subtotal={subtotal}
                    vaciarCarrito={vaciarCarrito}
                  />
                }
              />
              <Route path="/exito" element={<ExitoPage />} />
              <Route path="/nosotros" element={<NosotrosPage />} />
              <Route path="/ofertas" element={<OfertasPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<DetalleBlogPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegistroPage />} />
            </Routes>
          </main>
          <Footer />
        </>
      } />

      {/* Rutas admin - PENDIENTES
      <Route path="/admin/*" element={
        <div className="admin-layout">
          <AdminHeader />
          <div className="admin-container">
            <AdminSidebar />
            <main className="admin-content">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/productos" element={<AdminProductosPage />} />
                <Route path="/categorias" element={<AdminCategoriasPage />} />
                <Route path="/pedidos" element={<AdminPedidosPage />} />
                <Route path="/usuarios" element={<AdminUsuariosPage />} />
                <Route path="/reportes" element={<AdminReportesPage />} />
                <Route path="/perfil" element={<AdminPerfilPage />} />
              </Routes>
            </main>
          </div>
        </div>
      } />
      */}
    </Routes>
  )
}

export default App
