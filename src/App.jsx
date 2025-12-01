import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AdminHeader from './components/AdminHeader'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'

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

// Páginas de usuario autenticado
import PerfilPage from './pages/PerfilPage'
import MisComprasPage from './pages/MisComprasPage'

// Páginas admin
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'
import AdminProductsPage from './pages/admin/AdminProductsPage'
import AdminUsuariosPage from './pages/admin/AdminUsuariosPage'
import AdminCategoriasPage from './pages/admin/AdminCategoriasPage'

function App() {
  return (
    <>
      <ScrollToTop />
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

                {/* Rutas protegidas para usuarios autenticados */}
                <Route path="/perfil" element={
                  <ProtectedRoute>
                    <PerfilPage />
                  </ProtectedRoute>
                } />
                <Route path="/mis-compras" element={
                  <ProtectedRoute>
                    <MisComprasPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </>
        } />

        {/* Rutas admin */}
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRoles={['ADMIN_OR_VENDEDOR']}>
            <div className="admin-layout">
              <AdminHeader />
              <main className="admin-content">
                <Routes>
                  <Route path="/" element={<AdminDashboardPage />} />
                  <Route path="/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/ordenes" element={<AdminOrdersPage />} />
                  <Route path="/productos" element={<AdminProductsPage />} />
                  <Route path="/usuarios" element={
                    <ProtectedRoute requiredRoles={['ADMIN']}>
                      <AdminUsuariosPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/categorias" element={
                    <ProtectedRoute requiredRoles={['ADMIN']}>
                      <AdminCategoriasPage />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
            </div>
          </ProtectedRoute>
      } />
      </Routes>
    </>
  )
}

export default App
