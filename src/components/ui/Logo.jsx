/**
 * RUNO wordmark.
 * Set in the display serif so it echoes the embroidered chest logo.
 * To use a supplied logo file instead, replace the <span> with:
 *   <img src="/images/runo-logo.svg" alt="" className="h-5 w-auto" />
 */
export default function Logo({ className = '' }) {
  return (
    <a href="#top" aria-label="RUNO, back to top" className={`items-center ${className}`}>
      <span className="font-display text-[1.65rem] font-medium leading-none tracking-[0.2em]">RUNO</span>
    </a>
  )
}
