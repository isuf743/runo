import { MaskLines, Reveal, ImageReveal } from '../ui/Reveal'
import { philosophy } from '../../config/site'

export default function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-heading" className="scroll-mt-20 bg-ivory py-24 md:py-36 lg:py-44">
      <div className="container-runo grid grid-cols-12 gap-x-5 md:gap-x-8">
        <Reveal as="p" className="label col-span-12 mb-8 text-concrete md:col-span-3 md:mb-0 md:pt-6">
          {philosophy.label}
        </Reveal>

        <h2
          id="philosophy-heading"
          className="display col-span-12 text-ink text-[clamp(3.25rem,9.6vw,9.75rem)] leading-[0.9] md:col-span-9"
        >
          <MaskLines lines={philosophy.heading} lineClassName={(i) => (i === 1 ? 'pl-[14%]' : '')} />
        </h2>

        <div className="col-span-12 mt-16 grid grid-cols-12 gap-x-5 md:mt-24 md:gap-x-8">
          <ImageReveal
            {...philosophy.image}
            sizes="(min-width: 768px) 40vw, 80vw"
            className="col-span-10 aspect-[3/4] bg-bone sm:col-span-7 md:col-span-5 lg:col-span-4 lg:col-start-2"
          />

          <div className="col-span-12 mt-12 flex flex-col justify-end md:col-span-6 md:col-start-7 md:mt-0 lg:col-span-5 lg:col-start-7">
            <Reveal>
              <p className="font-display text-[clamp(1.5rem,2.2vw,2.125rem)] font-light leading-[1.35] text-charcoal">
                {philosophy.body}
              </p>
              <a href="#collection" className="label link-draw mt-10 inline-block text-ink">
                Explore collection
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
