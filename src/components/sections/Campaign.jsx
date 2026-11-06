import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '../ui/Button'
import { ImageReveal, MaskLines, Reveal } from '../ui/Reveal'
import { campaign } from '../../config/site'

export default function Campaign() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      id="campaign"
      ref={ref}
      aria-labelledby="campaign-heading"
      className="relative scroll-mt-20 overflow-hidden bg-ink text-ivory"
    >
      <div className="grid lg:min-h-[100svh] lg:grid-cols-12">
        {/* Main image: bleeds to the right edge on desktop */}
        <div className="grain relative order-1 aspect-[4/5] overflow-hidden sm:aspect-[16/12] lg:order-2 lg:col-span-6 lg:col-start-7 lg:aspect-auto">
          <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y: imgY }}>
            <ImageReveal
              {...campaign.image}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full"
              imgClassName="object-[50%_30%]"
            />
          </motion.div>
        </div>

        {/* Type column */}
        <div className="relative z-10 order-2 flex flex-col justify-between gap-16 px-5 py-20 md:px-10 md:py-24 lg:order-1 lg:col-span-6 lg:py-28 lg:pl-14 lg:pr-12 xl:pl-[max(3.5rem,calc((100vw-96rem)/2+3.5rem))]">
          <div>
            <Reveal as="p" className="label mb-8 text-ivory/60">
              The campaign
            </Reveal>
            <h2
              id="campaign-heading"
              className="display whitespace-nowrap uppercase text-[clamp(3.5rem,15vw,7.5rem)] leading-[0.84] tracking-[-0.02em] lg:w-[calc(100%+42vw)] lg:text-[clamp(7rem,12.6vw,15rem)]"
            >
              <MaskLines lines={campaign.headline} stagger={0.14} />
            </h2>
          </div>

          <div className="grid grid-cols-12 items-end gap-5 md:gap-8">
            <ImageReveal
              {...campaign.detail}
              sizes="(min-width: 1024px) 15vw, 35vw"
              delay={0.15}
              className="col-span-5 aspect-[4/5] sm:col-span-4 sm:row-span-2 lg:col-span-5"
            />
            <Reveal className="col-span-7 sm:col-span-8 lg:col-span-7" delay={0.1}>
              <p className="max-w-xs font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-light leading-snug text-ivory/90">
                {campaign.body}
              </p>
            </Reveal>
            <Reveal className="col-span-12 sm:col-span-8 sm:col-start-5 lg:col-span-7 lg:col-start-6" delay={0.2}>
              <Button tone="light" variant="outline" href={campaign.cta.href} className="w-full sm:w-auto">
                {campaign.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
