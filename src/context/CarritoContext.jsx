import { createContext, useState, useEffect } from 'react'

export const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carrito')
      return carritoGuardado ? JSON.parse(carritoGuardado) : []
    } catch (error) {
      localStorage.removeItem('carrito')
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (producto, cantidad) => {
    if (producto.stock === 0) {
      alert('Este producto no tiene stock disponible')
      return
    }

    const itemExistente = carrito.find(item => item.id === producto.id)
    const cantidadEnCarrito = itemExistente ? itemExistente.cantidad : 0
    const cantidadTotal = cantidadEnCarrito + cantidad

    if (cantidadTotal > producto.stock) {
      if (itemExistente) {
        alert(`Ya tienes ${cantidadEnCarrito} unidades en el carrito. Solo quedan ${producto.stock - cantidadEnCarrito} unidades disponibles.`)
      } else {
        alert(`Solo hay ${producto.stock} unidades disponibles.`)
      }
      return
    }

    if (itemExistente) {
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      )
      setCarrito(nuevoCarrito)
    } else {
      setCarrito([...carrito, { ...producto, cantidad }])
    }
  }

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return

    const nuevoCarrito = carrito.map(item => {
      if (item.id === productoId) {
        if (nuevaCantidad > item.stock) {
          alert(`Solo hay ${item.stock} unidades disponibles.`)
          return item
        }
        return { ...item, cantidad: nuevaCantidad }
      }
      return item
    })
    setCarrito(nuevoCarrito)
  }

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const subtotal = carrito.reduce((total, item) => {
    const precio = item.precio || 0
    return total + (precio * item.cantidad)
  }, 0)

  const totalItems = carrito.reduce((total, item) => {
    return total + item.cantidad
  }, 0)

  const value = {
    carrito,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    subtotal,
    totalItems
  }

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  )
}
