import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { BagProvider } from './context/BagContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MobileMenu from './components/overlays/MobileMenu'
import SearchOverlay from './components/overlays/SearchOverlay'
import BagDrawer from './components/overlays/BagDrawer'
import Hero from './components/sections/Hero'
import Philosophy from './components/sections/Philosophy'
import Collection from './components/sections/Collection'
import Campaign from './components/sections/Campaign'
import Values from './components/sections/Values'
import Newsletter from './components/sections/Newsletter'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const openSearch = useCallback(() => setSearchOpen(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <BagProvider>
        <Navbar onOpenMenu={() => setMenuOpen(true)} onOpenSearch={openSearch} />
        <MobileMenu open={menuOpen} onClose={closeMenu} onOpenSearch={openSearch} />
        <SearchOverlay open={searchOpen} onClose={closeSearch} />
        <BagDrawer />

        <main id="main">
          <Hero />
          <Philosophy />
          <Collection />
          <Campaign />
          <Values />
          <Newsletter />
        </main>
        <Footer />
      </BagProvider>
    </MotionConfig>
  )
}
