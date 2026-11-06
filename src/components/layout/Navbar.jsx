import { useEffect, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { Search, User, ShoppingBag, Menu } from 'lucide-react'
import Logo from '../ui/Logo'
import { navLinks } from '../../config/site'
import { useScrolled } from '../../hooks/useScrolled'
import { useBag } from '../../context/BagContext'

function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

const sectionIds = ['top', ...navLinks.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1))]

export default function Navbar({ onOpenMenu, onOpenSearch }) {
  const scrolled = useScrolled(60)
  const { count, open: openBag, lastAdded } = useBag()
  const active = useActiveSection(sectionIds)
  const pulse = useAnimationControls()

  useEffect(() => {
    if (lastAdded) pulse.start({ scale: [1, 1.35, 1], transition: { duration: 0.5 } })
  }, [lastAdded, pulse])

  const iconBtn = 'flex size-10 items-center justify-center transition-opacity duration-300 hover:opacity-60'

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,color,border-color] duration-700 ease-luxe ${
        scrolled ? 'border-b border-sand bg-ivory/95 text-ink backdrop-blur-[2px]' : 'border-b border-transparent bg-transparent text-ivory'
      }`}
    >
      <a
        href="#main"
        className="label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-ink focus:px-4 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>

      <nav aria-label="Primary" className="container-runo grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-20">
        <div className="flex items-center gap-1">
          <button type="button" onClick={onOpenMenu} className={`${iconBtn} -ml-2 lg:hidden`} aria-label="Open menu">
            <Menu size={20} strokeWidth={1.25} />
          </button>
          <Logo className="hidden lg:inline-flex" />
        </div>

        <div className="flex justify-center">
          <Logo className="inline-flex lg:hidden" />
          <ul className="hidden items-center gap-11 lg:flex">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="label link-draw py-2"
                  aria-current={active && l.href === `#${active}` ? 'true' : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-0.5 md:gap-2">
          <button type="button" onClick={onOpenSearch} className={iconBtn} aria-label="Search">
            <Search size={19} strokeWidth={1.25} />
          </button>
          <a href="/account" className={`${iconBtn} hidden sm:flex`} aria-label="Account">
            <User size={19} strokeWidth={1.25} />
          </a>
          <button
            type="button"
            onClick={openBag}
            className={`${iconBtn} relative -mr-2`}
            aria-label={`Shopping bag, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <ShoppingBag size={19} strokeWidth={1.25} />
            <motion.span
              animate={pulse}
              aria-hidden
              className={`absolute right-0.5 top-1 flex min-w-4 items-center justify-center rounded-full px-1 font-sans text-[0.625rem] leading-4 tabular-nums transition-colors duration-700 ${
                scrolled ? 'bg-ink text-ivory' : 'bg-ivory text-ink'
              }`}
            >
              {count}
            </motion.span>
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
