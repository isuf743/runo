import { ArrowUp } from 'lucide-react'
import { footer } from '../../config/site'

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-ivory">
      <div className="container-runo pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-display text-[1.65rem] font-medium leading-none tracking-[0.2em]">RUNO</p>
            <p className="mt-8 max-w-xs font-display text-2xl font-light italic leading-snug text-ivory/70">
              {footer.statement}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-6 lg:col-span-2 lg:col-start-7">
            <h2 className="font-sans text-xs text-ivory/50">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="label link-draw text-ivory/90">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="font-sans text-xs text-ivory/50">Follow</h2>
            <ul className="mt-5 space-y-3">
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="label link-draw text-ivory/90">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 md:col-start-11 md:flex md:justify-end">
            <a href="#top" className="label inline-flex h-fit items-center gap-2 text-ivory/70 transition-colors hover:text-ivory">
              Back to top <ArrowUp size={13} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the page edge */}
      <div aria-hidden className="mt-16 select-none md:mt-24">
        <p className="display text-center text-[32vw] leading-[0.72] tracking-[0.04em] text-ivory/[0.08] translate-y-[8%]">
          RUNO
        </p>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-runo flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-ivory/50">{footer.copyright}</p>
          <p className="font-sans text-xs text-ivory/40">Premium contemporary streetwear</p>
        </div>
      </div>
    </footer>
  )
}
