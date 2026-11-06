import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import GarmentArt from './GarmentArt'
import { formatPrice } from '../../data/products'
import { useBag } from '../../context/BagContext'

function ProductImage({ product, color, view }) {
  const img = view === 'front' ? product.image : product.hoverImage
  if (img) {
    return (
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes="(min-width: 1024px) 25vw, 50vw"
        alt={img.alt ?? ''}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    )
  }
  return (
    <div className="flex h-full w-full items-center justify-center p-[12%]">
      <GarmentArt
        garment={product.garment}
        color={color}
        view={view}
        title={`${product.name} in ${color.name}, ${view} view`}
        className="h-full w-full"
      />
    </div>
  )
}

export default function ProductCard({ product, index }) {
  const { add } = useBag()
  const [colorIdx, setColorIdx] = useState(0)
  const [added, setAdded] = useState(false)
  const color = product.colors[colorIdx]
  const hasPhoto = Boolean(product.image)

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1800)
    return () => clearTimeout(t)
  }, [added])

  const addToBag = () => {
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      garment: product.garment,
      image: product.image?.src ?? null,
      color: color.name,
      colorValue: color,
    })
    setAdded(true)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* Image stage */}
      <div className="relative aspect-[4/5] overflow-hidden bg-bone">
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.04]">
          <ProductImage product={product} color={color} view="front" />
        </div>
        {(product.hoverImage || !hasPhoto) && (
          <div className="absolute inset-0 opacity-0 transition-[opacity,transform] duration-700 ease-luxe group-hover:scale-[1.04] group-hover:opacity-100 [@media(hover:none)]:hidden">
            <ProductImage product={product} color={color} view="back" />
          </div>
        )}

        {!hasPhoto && (
          <span className="pointer-events-none absolute left-3 top-3 transition-opacity duration-500 group-hover:opacity-0 font-sans text-[0.625rem] tracking-[0.18em] text-concrete/80 uppercase">
            Image placeholder
          </span>
        )}

        {/* Desktop: full-width bar slides up on hover / keyboard focus */}
        <button
          type="button"
          onClick={addToBag}
          className="label absolute inset-x-0 bottom-0 hidden h-12 translate-y-full items-center justify-center gap-2 bg-ink text-ivory transition-transform duration-500 ease-luxe group-hover:translate-y-0 focus-visible:translate-y-0 focus-visible:outline-offset-[-4px] lg:flex"
          aria-label={`Add ${product.name} in ${color.name} to bag`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span key="added" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-2">
                <Check size={14} strokeWidth={1.5} /> Added to bag
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                Add to bag
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Touch / smaller screens: compact square button */}
        <button
          type="button"
          onClick={addToBag}
          className="absolute bottom-3 right-3 flex size-10 items-center justify-center border border-ink/15 bg-ivory text-ink transition-colors active:bg-ink active:text-ivory lg:hidden"
          aria-label={`Add ${product.name} in ${color.name} to bag`}
        >
          {added ? <Check size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Details */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="label text-ink">{product.name}</h3>
        <p className="shrink-0 font-sans text-[0.8125rem] text-charcoal tabular-nums">{formatPrice(product.price)}</p>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div role="radiogroup" aria-label={`${product.name} colour`} className="flex items-center gap-1.5">
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={i === colorIdx}
              aria-label={c.name}
              title={c.name}
              onClick={() => setColorIdx(i)}
              className={`relative flex size-5 items-center justify-center rounded-full transition-shadow duration-300 ${
                i === colorIdx ? 'shadow-[0_0_0_1px_var(--color-ink)]' : 'hover:shadow-[0_0_0_1px_var(--color-stone)]'
              }`}
            >
              <span
                className="block size-3.5 rounded-full border border-ink/15"
                style={{
                  background: c.accent ? `linear-gradient(90deg, ${c.hex} 50%, ${c.accent} 50%)` : c.hex,
                }}
              />
            </button>
          ))}
        </div>
        <span className="font-sans text-xs text-concrete">{color.name}</span>
      </div>
    </motion.article>
  )
}
