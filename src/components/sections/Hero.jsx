import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import Button from '../ui/Button'
import { MaskLines } from '../ui/Reveal'
import { hero, media } from '../../config/site'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  // Gentle parallax: video drifts slower than the page as you leave the hero
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Respect reduced-motion: show the poster frame instead of a moving image
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      setPlaying(false)
      return
    }
    const p = v.play()
    if (p?.catch) p.catch(() => setPlaying(false))
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="RUNO campaign"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink text-ivory"
    >
      {/* Video */}
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <motion.video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={media.heroVideo}
          poster={media.heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease }}
        />
      </motion.div>

      {/* Readability: an even veil, plus a deeper floor where the type sits */}
      <div aria-hidden className="absolute inset-0 bg-ink/25" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink/70 via-ink/25 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/40 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-runo relative flex h-full flex-col justify-end pb-8 md:pb-12"
      >
        <motion.p
          className="label mb-5 text-ivory/85 md:mb-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease }}
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="display uppercase text-ivory text-[clamp(3.6rem,14.2vw,14.5rem)] leading-[0.84] tracking-[-0.02em]">
          <MaskLines
            lines={hero.headline}
            animateOnMount
            delay={0.75}
            stagger={0.14}
            lineClassName={(i) => (i === 1 ? 'md:pl-[0.9em]' : '')}
          />
        </h1>

        <motion.div
          className="mt-8 grid gap-7 border-t border-ivory/25 pt-6 md:mt-12 md:grid-cols-12 md:items-end md:gap-10 md:pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.35, ease }}
        >
          <p className="max-w-sm font-sans text-[0.9375rem] font-light leading-relaxed text-ivory/90 md:col-span-4">
            {hero.body}
          </p>

          <div className="flex flex-col gap-3 xs:flex-row md:col-span-6 md:col-start-6 lg:col-span-5 lg:col-start-6">
            <Button tone="light" variant="solid" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Button>
            <Button tone="light" variant="outline" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Button>
          </div>

          <div className="hidden items-center justify-end gap-6 md:col-span-2 md:col-start-11 md:flex lg:col-span-2 lg:col-start-11">
            <button
              type="button"
              onClick={togglePlay}
              className="label flex items-center gap-2 text-ivory/80 transition-colors hover:text-ivory"
              aria-label={playing ? 'Pause campaign video' : 'Play campaign video'}
            >
              {playing ? <Pause size={13} strokeWidth={1.5} /> : <Play size={13} strokeWidth={1.5} />}
              {playing ? 'Pause' : 'Play'}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile pause control, top-right below nav */}
      <button
        type="button"
        onClick={togglePlay}
        className="absolute right-4 top-20 flex size-9 items-center justify-center border border-ivory/30 text-ivory/80 md:hidden"
        aria-label={playing ? 'Pause campaign video' : 'Play campaign video'}
      >
        {playing ? <Pause size={13} strokeWidth={1.5} /> : <Play size={13} strokeWidth={1.5} />}
      </button>
    </section>
  )
}
