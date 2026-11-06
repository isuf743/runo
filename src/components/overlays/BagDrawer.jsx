import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { useBag } from '../../context/BagContext'
import { formatPrice } from '../../data/products'
import { useOverlay } from '../../hooks/useOverlay'
import GarmentArt from '../ui/GarmentArt'
import Button from '../ui/Button'

const ease = [0.22, 1, 0.36, 1]

export default function BagDrawer() {
  const { isOpen, close, lines, count, subtotal, changeQty, remove } = useBag()
  useOverlay(isOpen, close)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping bag">
          <motion.div
            className="absolute inset-0 bg-ink/40"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory text-ink"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.7, ease }}
          >
            <header className="flex h-16 items-center justify-between border-b border-sand px-6 md:h-20">
              <h2 className="label">
                Bag <span className="text-concrete">({count})</span>
              </h2>
              <button type="button" onClick={close} className="-mr-2 flex size-10 items-center justify-center" aria-label="Close bag" autoFocus>
                <X size={20} strokeWidth={1.25} />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6">
                <p className="display text-5xl">Your bag is empty.</p>
                <p className="max-w-xs font-sans text-sm leading-relaxed text-concrete">
                  Add a piece from the collection and it will be waiting here.
                </p>
                <Button href="#collection" onClick={close}>
                  Explore collection
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-sand overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.key}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="flex gap-4 py-5"
                      >
                        <div className="flex aspect-[4/5] w-24 shrink-0 items-center justify-center overflow-hidden bg-bone">
                          {l.image ? (
                            <img src={l.image} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full p-2">
                              <GarmentArt garment={l.garment} color={l.colorValue} title="" className="h-full w-full" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <p className="label">{l.name}</p>
                            <p className="shrink-0 font-sans text-sm tabular-nums">{formatPrice(typeof l.price === 'number' ? l.price * l.qty : null)}</p>
                          </div>
                          <p className="mt-1 font-sans text-xs text-concrete">{l.color}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-sand">
                              <button type="button" onClick={() => changeQty(l.key, -1)} className="flex size-8 items-center justify-center hover:bg-bone" aria-label={`Decrease quantity of ${l.name}`}>
                                <Minus size={12} strokeWidth={1.5} />
                              </button>
                              <span className="w-8 text-center font-sans text-xs tabular-nums" aria-live="polite">{l.qty}</span>
                              <button type="button" onClick={() => changeQty(l.key, 1)} className="flex size-8 items-center justify-center hover:bg-bone" aria-label={`Increase quantity of ${l.name}`}>
                                <Plus size={12} strokeWidth={1.5} />
                              </button>
                            </div>
                            <button type="button" onClick={() => remove(l.key)} className="font-sans text-xs text-concrete underline-offset-4 hover:text-ink hover:underline">
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="border-t border-sand px-6 pb-6 pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="label">Subtotal</span>
                    <span className="font-sans text-sm tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-2 font-sans text-xs text-concrete">Shipping and taxes are calculated at checkout.</p>
                  <Button as="a" href="/checkout" className="mt-5 w-full">
                    Checkout
                  </Button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
