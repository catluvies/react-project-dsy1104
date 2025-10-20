import { createContext, useState, useEffect } from 'react'

// Crear el contexto del carrito
export const CarritoContext = createContext()

// Provider para manejo del carrito de compras
export function CarritoProvider({ children }) {
  // Estado del carrito de compras
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito')
    return carritoGuardado ? JSON.parse(carritoGuardado) : []
  })

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  // Agrega productos al carrito
  const agregarAlCarrito = (producto, cantidad) => {
    // verificar stock
    if (producto.stock === 0) {
      alert('Este producto no tiene stock disponible')
      return
    }

    // buscar si ya existe en carrito
    const itemExistente = carrito.find(item => item.id === producto.id)
    const cantidadEnCarrito = itemExistente ? itemExistente.cantidad : 0
    const cantidadTotal = cantidadEnCarrito + cantidad

    // verificar que no se pase del stock
    if (cantidadTotal > producto.stock) {
      if (itemExistente) {
        alert(`Ya tienes ${cantidadEnCarrito} unidades en el carrito. Solo quedan ${producto.stock - cantidadEnCarrito} unidades disponibles.`)
      } else {
        alert(`Solo hay ${producto.stock} unidades disponibles.`)
      }
      return
    }

    if (itemExistente) {
      // si existe, aumentar cantidad
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      )
      setCarrito(nuevoCarrito)
    } else {
      // si no existe, agregarlo nuevo
      setCarrito([...carrito, { ...producto, cantidad }])
    }
  }

  // calcular subtotal
  const subtotal = carrito.reduce((total, item) => {
    return total + (item.precio_clp * item.cantidad)
  }, 0)

  // contar total de productos
  const totalItems = carrito.reduce((total, item) => {
    return total + item.cantidad
  }, 0)

  // Valores disponibles en el contexto
  const value = {
    carrito,
    agregarAlCarrito,
    subtotal,
    totalItems
  }

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  )
}

