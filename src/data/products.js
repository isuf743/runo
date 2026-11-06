// Works from any folder (XAMPP subfolder, file://, domain root)
const BASE = import.meta.env.BASE_URL

/**
 * Product catalogue for the homepage.
 *
 * PRICES: `price` is intentionally `null` — set a number (e.g. 180) and the
 * card, bag and subtotal will format it automatically with `currency`.
 *
 * IMAGES: `image` / `hoverImage` accept a path in /public (e.g.
 * 'images/products/signature-hoodie-front.webp'). While `image` is null the
 * card renders a drawn garment placeholder in the selected colour, so the grid
 * stays on-brand until real photography is ready.
 */

export const currency = 'EUR'

const productPhoto = {
  src: `${BASE}images/product-graphic-hoodie.webp`,
  alt: 'RUNO graphic hoodie, black with ivory sleeve print, laid flat on concrete',
}
const onModelWoman = {
  src: `${BASE}images/graphic-hoodie-model-800.webp`,
  srcSet: `${BASE}images/graphic-hoodie-model-500.webp 500w, ${BASE}images/graphic-hoodie-model-800.webp 800w`,
  alt: 'Model wearing the RUNO graphic hoodie',
}
const onModelMan = {
  src: `${BASE}images/hoodie-model-man-800.webp`,
  srcSet: `${BASE}images/hoodie-model-man-500.webp 500w, ${BASE}images/hoodie-model-man-800.webp 800w`,
  alt: 'Model wearing the RUNO graphic hoodie',
}
const blackIvory = [{ name: 'Black / Ivory', hex: '#1a1917', accent: '#ece5d8' }]

export const products = [
  {
    id: 'signature-hoodie',
    name: 'RUNO Signature Hoodie',
    price: null,
    garment: 'hoodie-graphic',
    image: productPhoto,
    hoverImage: onModelMan,
    colors: blackIvory,
  },
  {
    id: 'oversized-graphic-hoodie',
    name: 'Oversized Graphic Hoodie',
    price: null,
    garment: 'hoodie-graphic',
    image: productPhoto,
    hoverImage: onModelWoman,
    colors: blackIvory,
  },
  {
    id: 'essential-hoodie',
    name: 'RUNO Essential Hoodie',
    price: null,
    garment: 'hoodie-graphic',
    image: productPhoto,
    hoverImage: onModelMan,
    colors: blackIvory,
  },
  {
    id: 'heavyweight-hoodie',
    name: 'RUNO Heavyweight Hoodie',
    price: null,
    garment: 'hoodie-graphic',
    image: productPhoto,
    hoverImage: onModelWoman,
    colors: blackIvory,
  },
]

export function formatPrice(value) {
  if (typeof value !== 'number') return '€ —'
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)
}
