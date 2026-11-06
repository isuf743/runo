import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/** Soft fade-and-rise as the element enters the viewport. Used sparingly. */
export function Reveal({ as = 'div', delay = 0, y = 24, className = '', children, ...props }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, delay, ease }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}

/** Lines of display type that rise out of a mask, one after another. */
export function MaskLines({ lines, className = '', lineClassName = '', delay = 0, stagger = 0.12, animateOnMount = false }) {
  const trigger = animateOnMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }

  return (
    <motion.span initial="hide" {...trigger} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={line} className={`block overflow-hidden pb-[0.06em] ${typeof lineClassName === 'function' ? lineClassName(i) : lineClassName}`}>
          <motion.span
            className="block"
            variants={{ hide: { y: '105%' }, show: { y: '0%' } }}
            transition={{ duration: 1.25, delay: delay + i * stagger, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Image revealed by an upward wipe while settling from a slight zoom. */
export function ImageReveal({ src, srcSet, sizes, alt, className = '', imgClassName = '', delay = 0 }) {
  // The viewport trigger sits on the unclipped wrapper; the clip lives on a child,
  // so visibility detection never depends on the clipped box.
  return (
    <motion.div
      className={`relative ${className}`}
      initial="hide"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={{ hide: { clipPath: 'inset(100% 0% 0% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)' } }}
        transition={{ duration: 1.4, delay, ease }}
      >
        <motion.img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover ${imgClassName}`}
          variants={{ hide: { scale: 1.12 }, show: { scale: 1 } }}
          transition={{ duration: 1.8, delay, ease }}
        />
      </motion.div>
    </motion.div>
  )
}
