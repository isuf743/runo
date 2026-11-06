import { Reveal } from '../ui/Reveal'
import { values } from '../../config/site'

export default function Values() {
  return (
    <section aria-label="What RUNO stands for" className="bg-ivory py-24 md:py-32">
      <div className="container-runo">
        <ul className="grid border-y border-sand md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal
              as="li"
              key={v.title}
              delay={i * 0.1}
              className={`flex flex-col gap-10 py-10 md:gap-24 md:px-8 md:py-12 lg:px-12 ${
                i > 0 ? 'border-t border-sand md:border-l md:border-t-0' : 'md:pl-0 lg:pl-0'
              } ${i === values.length - 1 ? 'md:pr-0 lg:pr-0' : ''}`}
            >
              <span className="font-display text-6xl font-light leading-none text-stone md:text-7xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="label text-ink">{v.title}</h3>
                <p className="mt-4 max-w-[18rem] font-display text-2xl font-light leading-snug text-charcoal md:text-[1.75rem]">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
