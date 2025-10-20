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
 * Responsabilidad: Configurar las rutas y el layout general
 */
function App() {

  return (
    <Routes>
      {/* Rutas públicas con Header y Footer normales */}
      <Route path="/*" element={
        <>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<InicioPage />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route path="/producto/:id" element={<DetalleProductoPage />} />
              <Route path="/categorias" element={<CategoriasPage />} />
              <Route path="/carrito" element={<CarritoPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
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
