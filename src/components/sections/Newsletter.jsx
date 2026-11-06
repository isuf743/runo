import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MaskLines, Reveal } from '../ui/Reveal'
import { newsletter } from '../../config/site'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | done

  const onSubmit = (e) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) {
      setStatus('error')
      return
    }
    // TODO: connect to your email provider (Klaviyo, Mailchimp, Shopify…)
    setStatus('done')
  }

  return (
    <section aria-labelledby="newsletter-heading" className="bg-bone py-24 md:py-32">
      <div className="container-runo grid gap-12 md:grid-cols-12 md:gap-8">
        <h2
          id="newsletter-heading"
          className="display uppercase text-ink text-[clamp(3rem,7vw,7rem)] md:col-span-7"
        >
          <MaskLines lines={['Stay in', 'the know.']} />
        </h2>

        <Reveal className="flex flex-col justify-end md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
          <p className="font-sans text-[0.9375rem] font-light leading-relaxed text-charcoal">{newsletter.body}</p>

          <AnimatePresence mode="wait" initial={false}>
            {status === 'done' ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 border-b border-ink pb-4 font-display text-2xl font-light text-ink"
                role="status"
              >
                You’re on the list. Watch your inbox for the next release.
              </motion.p>
            ) : (
              <motion.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="mt-10">
                <div className="flex items-end gap-4 border-b border-ink pb-2 focus-within:border-ink">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === 'error') setStatus('idle')
                    }}
                    placeholder={newsletter.placeholder}
                    aria-invalid={status === 'error'}
                    aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                    className="min-w-0 flex-1 bg-transparent py-2 font-sans text-base text-ink placeholder:text-concrete focus:outline-none"
                  />
                  <button type="submit" className="label link-draw shrink-0 py-2 text-ink">
                    {newsletter.button}
                  </button>
                </div>
                <p id="newsletter-error" className="mt-3 min-h-5 font-sans text-xs text-[#8a3b2e]" aria-live="polite">
                  {status === 'error' ? 'Enter a full email address, like name@example.com.' : ''}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
