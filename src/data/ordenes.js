// Órdenes maqueteadas para presentación
export const ordenesData = [
  {
    numero_orden: 'ORD20240705',
    fecha: '05-10-2025',
    estado: 'completada',
    cliente: {
      nombre: 'Ahri González',
      email: 'ahri.gonzalez@gmail.com',
      telefono: '+56912345678'
    },
    productos: [
      {
        id: 'PROD001',
        nombre: 'Torta Mil Hojas Tradicional',
        cantidad: 1,
        precio_unitario: 18500,
        subtotal: 18500
      },
      {
        id: 'PROD012',
        nombre: 'Porción de Torta Tres Leches',
        cantidad: 4,
        precio_unitario: 3800,
        subtotal: 15200
      }
    ],
    direccion_entrega: {
      calle: 'Los Crisantemos 453',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Ñuñoa',
      indicaciones: 'Casa blanca con reja negra'
    },
    costos: {
      subtotal: 33700,
      envio: 3500,
      descuento: 16850,
      total: 20350
    },
    metodo_pago: 'Transferencia bancaria',
    notas_adicionales: 'Entrega antes de las 18:00 hrs'
  },
  {
    numero_orden: 'ORD20240708',
    fecha: '08-10-2025',
    estado: 'en_preparacion',
    cliente: {
      nombre: 'Thresh Ramírez',
      email: 'thresh.ramirez@gmail.com',
      telefono: '+56987654321'
    },
    productos: [
      {
        id: 'PROD005',
        nombre: 'Selva Negra Premium',
        cantidad: 1,
        precio_unitario: 28000,
        subtotal: 28000
      }
    ],
    direccion_entrega: {
      calle: 'Avenida Providencia 2134',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Providencia',
      indicaciones: ''
    },
    costos: {
      subtotal: 28000,
      envio: 5000,
      descuento: 3300,
      total: 29700
    },
    metodo_pago: 'Tarjeta de crédito',
    notas_adicionales: ''
  },
  {
    numero_orden: 'ORD20241015',
    fecha: '15-10-2025',
    estado: 'pendiente',
    cliente: {
      nombre: 'Seraphine Torres',
      email: 'seraphine.torres@duocuc.cl',
      telefono: '+56966778899'
    },
    productos: [
      {
        id: 'PROD010',
        nombre: 'Torta Infantil Temática',
        cantidad: 1,
        precio_unitario: 35000,
        subtotal: 35000
      },
      {
        id: 'PROD011',
        nombre: 'Alfajor Gigante Artesanal',
        cantidad: 6,
        precio_unitario: 4500,
        subtotal: 27000
      }
    ],
    direccion_entrega: {
      calle: 'Las Acacias 876',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Maipú',
      indicaciones: 'Departamento 302, tercer piso'
    },
    costos: {
      subtotal: 62000,
      envio: 4500,
      descuento: 0,
      total: 66500
    },
    metodo_pago: 'Efectivo contra entrega',
    notas_adicionales: 'Decoración temática de unicornios en color rosa'
  },
  {
    numero_orden: 'ORD20241017',
    fecha: '17-10-2025',
    estado: 'entregada',
    cliente: {
      nombre: 'Braum Silva',
      email: 'braum.silva@hotmail.com',
      telefono: '+56955443322'
    },
    productos: [
      {
        id: 'PROD003',
        nombre: 'Torta de Lúcuma',
        cantidad: 1,
        precio_unitario: 22000,
        subtotal: 22000
      },
      {
        id: 'PROD021',
        nombre: 'Café Premium Pastelería 1000 Sabores',
        cantidad: 2,
        precio_unitario: 12500,
        subtotal: 25000
      }
    ],
    direccion_entrega: {
      calle: 'Santa Rosa 2345',
      region: 'Región Metropolitana de Santiago',
      comuna: 'La Florida',
      indicaciones: ''
    },
    costos: {
      subtotal: 47000,
      envio: 4000,
      descuento: 25500,
      total: 25500
    },
    metodo_pago: 'Transferencia bancaria',
    notas_adicionales: 'Cliente frecuente - descuento aplicado'
  },
  {
    numero_orden: 'ORD20241018',
    fecha: '18-10-2025',
    estado: 'cancelada',
    cliente: {
      nombre: 'Kai\'Sa Vega',
      email: 'kaisa.vega@yahoo.com',
      telefono: '+56911223344'
    },
    productos: [
      {
        id: 'PROD009',
        nombre: 'Torta de Boda Tradicional Chilena',
        cantidad: 1,
        precio_unitario: 65000,
        subtotal: 65000
      }
    ],
    direccion_entrega: {
      calle: 'Los Aromos 567',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Las Condes',
      indicaciones: 'Casa esquina con portón café'
    },
    costos: {
      subtotal: 65000,
      envio: 8000,
      descuento: 7300,
      total: 65700
    },
    metodo_pago: 'Transferencia bancaria',
    notas_adicionales: 'Cancelado por cambio de fecha del evento'
  }
]

export default ordenesData
