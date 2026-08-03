/**
 * Fuente central de datos del sitio. Evita valores duplicados en componentes:
 * modelos de Garden Blocks, precios, envío, promociones, contacto y catálogo.
 */

export const contactInfo = {
  brand: 'Cristalmat',
  address: 'Córdoba 2675, San Miguel, Buenos Aires',
  whatsappDisplay: '11 5746-7538',
  whatsappNumber: '5491157467538',
  instagramHandle: '@cristalmat_ok',
  instagramUrl: 'https://instagram.com/cristalmat_ok',
}

export type GardenBlockModel = {
  id: string
  name: string
  widthCm: number
  heightCm: number
  thicknessCm: number | null
  unitsPerM2: number
  pricePerM2: number
  uses: string
  photo?: string
}

export const gardenBlockModels: GardenBlockModel[] = [
  {
    id: 'rombo',
    name: 'Rombo',
    widthCm: 35,
    heightCm: 35,
    thicknessCm: 6,
    unitsPerM2: 9,
    pricePerM2: 29000,
    uses: 'Accesos vehiculares, cocheras y estacionamientos con diseño geométrico.',
    photo: '/images/garden-block-rombo.jpg',
  },
  {
    id: 'numeral',
    name: 'Numeral',
    widthCm: 35,
    heightCm: 35,
    thicknessCm: 6,
    unitsPerM2: 9,
    pricePerM2: 29000,
    uses: 'Accesos y cocheras que buscan una trama uniforme y prolija.',
    photo: '/images/garden-block-numeral.jpg',
  },
  {
    id: 'circular',
    name: 'Circular',
    widthCm: 35,
    heightCm: 35,
    thicknessCm: 6,
    unitsPerM2: 9,
    pricePerM2: 29000,
    uses: 'Senderos, parques y espacios con una terminación más orgánica.',
  },
  {
    id: 'g9',
    name: 'G9',
    widthCm: 40,
    heightCm: 60,
    thicknessCm: null,
    unitsPerM2: 4,
    pricePerM2: 29000,
    uses: 'Accesos y estacionamientos de gran formato, con menos piezas por m².',
  },
]

export type ShippingZone = {
  id: string
  name: string
  price: number | null
}

/**
 * Tarifas por zona sin confirmar todavía. Cuando Cristalmat defina un precio,
 * basta con reemplazar `price: null` por el monto — el resto de la UI ya lo soporta.
 */
export const shippingZones: ShippingZone[] = [
  { id: 'san-miguel', name: 'San Miguel', price: null },
  { id: 'zona-norte', name: 'Zona Norte', price: null },
  { id: 'zona-oeste', name: 'Zona Oeste', price: null },
  { id: 'caba', name: 'CABA', price: null },
  { id: 'otra', name: 'Otra zona', price: null },
]

export type VolumeDiscount = {
  minM2: number
  maxM2: number | null
  percentage: number
}

/**
 * Porcentajes en 0 hasta que Cristalmat confirme condiciones por volumen.
 * La calculadora sólo muestra el bloque de promoción cuando percentage > 0.
 */
export const volumeDiscounts: VolumeDiscount[] = [
  { minM2: 0, maxM2: 49.99, percentage: 0 },
  { minM2: 50, maxM2: 99.99, percentage: 0 },
  { minM2: 100, maxM2: null, percentage: 0 },
]

export function getVolumeDiscount(m2: number): VolumeDiscount {
  return (
    volumeDiscounts.find((d) => m2 >= d.minM2 && (d.maxM2 === null || m2 <= d.maxM2)) ??
    volumeDiscounts[0]
  )
}

export type ProductCategory = {
  id: string
  name: string
  description: string
  href: string
  ctaLabel: string
  featured?: boolean
}

export const productCategories: ProductCategory[] = [
  {
    id: 'garden-blocks',
    name: 'Garden Blocks',
    description:
      'Bloques premoldeados de hormigón diseñados para crear superficies transitables sin perder la presencia natural del césped. Ideales para cocheras, accesos, estacionamientos, parques y espacios exteriores.',
    href: '#garden-blocks',
    ctaLabel: 'Conocer más',
    featured: true,
  },
  {
    id: 'atermicos',
    name: 'Bordes y pisos atérmicos',
    description:
      'Soluciones para piscinas y soláriums que ofrecen una superficie resistente, antideslizante y confortable al contacto con el sol.',
    href: '#atermicos',
    ctaLabel: 'Conocer más',
  },
  {
    id: 'wall-panel',
    name: 'Wall Panel',
    description:
      'Revestimientos decorativos de rápida instalación para transformar paredes, cielorrasos, muebles y diferentes ambientes interiores.',
    href: '#wall-panel',
    ctaLabel: 'Conocer más',
  },
  {
    id: 'pisos-flotantes',
    name: 'Pisos flotantes',
    description:
      'Alternativas modernas y prácticas para renovar interiores con terminaciones cálidas y elegantes.',
    href: '#mas-productos',
    ctaLabel: 'Conocer más',
  },
  {
    id: 'deck-pvc',
    name: 'Deck de PVC',
    description:
      'Una solución estética y resistente para exteriores, patios, piscinas y espacios que requieren bajo mantenimiento.',
    href: '#mas-productos',
    ctaLabel: 'Conocer más',
  },
]

export const atermicoModels = [
  { id: 'borde-nautico', name: 'Borde Náutico', type: 'Borde' },
  { id: 'borde-plano-l', name: 'Borde Plano L', type: 'Borde' },
  { id: 'borde-deck', name: 'Borde Deck', type: 'Borde' },
  { id: 'solarium-plano', name: 'Solárium Plano', type: 'Solárium' },
  { id: 'solarium-deck', name: 'Solárium Deck', type: 'Solárium' },
]

export const atermicoColors = ['Blanco', 'Marfil']

export const atermicoBenefits = [
  'Atérmicos',
  'Antirreflejo',
  'Antideslizantes',
  'Resistentes',
  'Ideales para piscinas y soláriums',
]

export const wallPanelSpecs = {
  heightMm: 2800,
  pieceWidthMm: 121,
  usableWidthMm: 112,
  thicknessMm: 18,
}

export const wallPanelLines = [
  {
    id: 'vertice',
    name: 'Línea Vértice',
    finishes: ['Haya', 'Nogal'],
    boxUnits: 8,
    yieldM2: 2.5,
  },
  {
    id: 'perfil',
    name: 'Línea Perfil',
    finishes: ['Teca', 'Nogal', 'Roble Americano'],
    boxUnits: 6,
    yieldM2: 1.88,
  },
]

export const wallPanelBenefits = [
  'Fácil limpieza',
  'Ecoamigable',
  'Resistente al impacto',
  'Resistente a rayaduras',
  'Instalación rápida y sencilla',
  'Sin mantenimiento',
]

export const faqs = [
  {
    q: '¿Cuántos Garden Blocks necesito por metro cuadrado?',
    a: 'Los modelos Rombo, Numeral y Circular utilizan aproximadamente 9 unidades por m². El modelo G9 utiliza aproximadamente 4 unidades por m².',
  },
  {
    q: '¿Cuál es el precio de los Garden Blocks?',
    a: 'Actualmente, el valor informado es de $29.000 por m² para los modelos disponibles. El precio puede actualizarse y debe confirmarse antes de realizar el pedido.',
  },
  {
    q: '¿Son aptos para tránsito vehicular?',
    a: 'Están diseñados para accesos, cocheras, estacionamientos y otras superficies transitables. La preparación de la base y la correcta colocación son fundamentales para el desempeño final.',
  },
  {
    q: '¿Se pueden colocar directamente sobre tierra?',
    a: 'La instalación requiere una preparación adecuada de la superficie. Te recomendamos consultar las condiciones particulares de tu proyecto antes de comprar.',
  },
  {
    q: '¿Realizan colocación?',
    a: 'Consultanos indicando la ubicación y las características de la obra para confirmar disponibilidad del servicio.',
  },
  {
    q: '¿Realizan envíos?',
    a: 'Sí, el costo y la disponibilidad se determinan según la zona, el volumen solicitado y las condiciones de entrega.',
  },
  {
    q: '¿Cómo solicito una cotización?',
    a: 'Podés utilizar la calculadora, completar el formulario o comunicarte directamente por WhatsApp.',
  },
  {
    q: '¿Los resultados de la calculadora son definitivos?',
    a: 'No. Son una estimación inicial y deben confirmarse con Cristalmat antes de realizar la compra.',
  },
]
