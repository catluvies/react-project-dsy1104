import { createContext, useState, useEffect } from 'react'

// Crear el contexto
export const CarritoContext = createContext()

/**
 * Provider del contexto del carrito
 * Encapsula toda la lógica del carrito de compras
 */
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
      if (itemExistente) {
        alert(`Ya tienes ${cantidadEnCarrito} unidades en el carrito. Solo quedan ${producto.stock - cantidadEnCarrito} unidades disponibles.`)
      } else {
        alert(`Solo hay ${producto.stock} unidades disponibles.`)
      }
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

  // Calcular el subtotal sumando precio * cantidad de cada producto
  const subtotal = carrito.reduce((total, item) => {
    return total + (item.precio_clp * item.cantidad)
  }, 0)

  // Calcular el total de items en el carrito
  const totalItems = carrito.reduce((total, item) => {
    return total + item.cantidad
  }, 0)

  // Valor que se compartirá a través del contexto
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

