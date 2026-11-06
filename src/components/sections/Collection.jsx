import { MaskLines, Reveal } from '../ui/Reveal'
import ProductCard from '../ui/ProductCard'
import { collection } from '../../config/site'
import { products } from '../../data/products'

export default function Collection() {
  return (
    <section id="collection" aria-labelledby="collection-heading" className="scroll-mt-20 border-t border-sand bg-ivory py-24 md:py-32">
      <div className="container-runo">
        <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end md:gap-8">
          <h2
            id="collection-heading"
            className="display uppercase text-ink text-[clamp(3rem,7.4vw,7.5rem)] md:col-span-8"
          >
            <MaskLines lines={[collection.heading]} />
          </h2>
          <Reveal className="flex items-end justify-between gap-6 md:col-span-4 md:flex-col md:items-end md:text-right">
            <p className="font-display text-xl font-light italic text-charcoal md:text-2xl">{collection.subtitle}</p>
            <a href="/shop" className="label link-draw shrink-0 text-ink">
              View all
            </a>
          </Reveal>
        </header>

        <div className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
