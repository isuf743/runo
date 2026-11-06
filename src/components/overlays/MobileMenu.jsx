import { AnimatePresence, motion } from 'framer-motion'
import { X, User, Search } from 'lucide-react'
import { navLinks, footer } from '../../config/site'
import { useOverlay } from '../../hooks/useOverlay'

const ease = [0.22, 1, 0.36, 1]

export default function MobileMenu({ open, onClose, onOpenSearch }) {
  useOverlay(open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-ivory text-ink"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="container-runo flex h-16 items-center justify-between border-b border-sand md:h-20">
            <span className="font-display text-[1.65rem] font-medium leading-none tracking-[0.2em]">RUNO</span>
            <button type="button" onClick={onClose} className="-mr-2 flex size-10 items-center justify-center" aria-label="Close menu" autoFocus>
              <X size={20} strokeWidth={1.25} />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-runo flex flex-1 flex-col justify-center">
            <ul>
              {navLinks.map((l, i) => (
                <li key={l.label} className="overflow-hidden border-b border-sand">
                  <motion.a
                    href={l.href}
                    onClick={onClose}
                    className="block py-5"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease }}
                  >
                    <span className="display text-[clamp(2.75rem,12vw,4.5rem)] uppercase">{l.label}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-runo flex flex-col gap-5 pb-8 pt-6 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="flex gap-6">
              <a href="/account" className="label flex items-center gap-2">
                <User size={15} strokeWidth={1.25} /> Account
              </a>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onOpenSearch()
                }}
                className="label flex items-center gap-2"
              >
                <Search size={15} strokeWidth={1.25} /> Search
              </button>
            </div>
            <div className="flex gap-4">
              {footer.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="label text-concrete">
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
