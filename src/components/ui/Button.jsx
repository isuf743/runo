/**
 * Square-edged button / link with a fill that wipes in on hover.
 *
 * tone:    'light' (for dark backgrounds) | 'dark' (for light backgrounds)
 * variant: 'solid' | 'outline'
 */
const styles = {
  light: {
    solid: 'bg-ivory text-ink border-ivory hover:text-ivory',
    outline: 'bg-transparent text-ivory border-ivory/60 hover:text-ink hover:border-ivory',
    wipe: { solid: 'bg-ink', outline: 'bg-ivory' },
  },
  dark: {
    solid: 'bg-ink text-ivory border-ink hover:text-ink',
    outline: 'bg-transparent text-ink border-ink/40 hover:text-ivory hover:border-ink',
    wipe: { solid: 'bg-ivory', outline: 'bg-ink' },
  },
}

export default function Button({
  as = 'a',
  tone = 'dark',
  variant = 'solid',
  className = '',
  children,
  ...props
}) {
  const Tag = as
  const s = styles[tone]
  return (
    <Tag
      className={`label group/btn relative isolate inline-flex h-12 items-center justify-center gap-3 overflow-hidden border px-7 transition-[color,border-color] duration-500 ease-luxe disabled:pointer-events-none disabled:opacity-50 ${s[variant]} ${className}`}
      {...props}
    >
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-luxe group-hover/btn:scale-y-100 ${s.wipe[variant]}`}
      />
      {children}
    </Tag>
  )
}
