import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { products, formatPrice } from '../../data/products'
import { useOverlay } from '../../hooks/useOverlay'

const suggestions = ['Hoodie', 'Tee', 'Sweatpants', 'Signature']

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const close = () => {
    setQuery('')
    onClose()
  }
  useOverlay(open, close)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.garment.includes(q))
  }, [query])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search">
          <motion.div
            className="absolute inset-0 bg-ink/40"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="relative bg-ivory text-ink"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-runo pb-12 pt-6 md:pb-16 md:pt-8">
              <div className="flex justify-end">
                <button type="button" onClick={close} className="-mr-2 flex size-10 items-center justify-center" aria-label="Close search">
                  <X size={20} strokeWidth={1.25} />
                </button>
              </div>

              <form
                role="search"
                onSubmit={(e) => e.preventDefault()}
                className="mx-auto mt-4 flex max-w-4xl items-center gap-4 border-b border-ink pb-3"
              >
                <Search size={22} strokeWidth={1} className="shrink-0" aria-hidden />
                <label htmlFor="site-search" className="sr-only">
                  Search RUNO
                </label>
                <input
                  id="site-search"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the collection"
                  className="w-full bg-transparent font-display text-3xl font-light placeholder:text-stone focus:outline-none md:text-5xl"
                  autoComplete="off"
                />
              </form>

              <div className="mx-auto mt-8 max-w-4xl" aria-live="polite">
                {!query && (
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <span className="font-sans text-xs text-concrete">Popular</span>
                    {suggestions.map((s) => (
                      <button key={s} type="button" onClick={() => setQuery(s)} className="label link-draw">
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {query && results.length === 0 && (
                  <p className="font-sans text-sm text-concrete">
                    Nothing matches “{query}”. Try a piece, such as hoodie or tee.
                  </p>
                )}

                {results.length > 0 && (
                  <ul className="divide-y divide-sand border-y border-sand">
                    {results.map((p) => (
                      <li key={p.id}>
                        <a href="#collection" onClick={close} className="group flex items-center justify-between py-4">
                          <span className="label link-draw">{p.name}</span>
                          <span className="font-sans text-sm text-concrete">{formatPrice(p.price)}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
