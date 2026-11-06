// Works from any folder (XAMPP subfolder, file://, domain root)
const BASE = import.meta.env.BASE_URL

/**
 * Central site configuration.
 * Swap media, copy and links here without touching components.
 */

export const media = {
  // Replace with your own file: drop it in /public/videos and update the path.
  heroVideo: `${BASE}videos/runo-campaign.mp4`,
  // Still shown while the video loads (and if autoplay is blocked).
  heroPoster: `${BASE}images/hero-poster.jpg`,
}

export const navLinks = [
  { label: 'Shop', href: '#collection' },
  { label: 'Collections', href: '#campaign' },
  { label: 'About', href: '#philosophy' },
  { label: 'Journal', href: '/journal' },
]

export const hero = {
  eyebrow: 'The new generation of streetwear',
  headline: ['Not made', 'to follow.'],
  body: 'Redefining everyday essentials through form, identity and expression.',
  primaryCta: { label: 'Explore collection', href: '#collection' },
  secondaryCta: { label: 'Discover RUNO', href: '#philosophy' },
}

export const philosophy = {
  label: 'Our philosophy',
  heading: ['Less noise.', 'More identity.'],
  body: "RUNO is built around the idea that true style doesn't need to demand attention. Every detail has a purpose. Every piece tells a story. Designed for those who define their own direction.",
  image: {
    src: `${BASE}images/philosophy-900.webp`,
    srcSet: `${BASE}images/philosophy-600.webp 600w, ${BASE}images/philosophy-900.webp 900w`,
    alt: 'Model in the RUNO graphic hoodie against a sunlit concrete wall',
  },
}

export const collection = {
  heading: 'The Collection',
  subtitle: 'Considered essentials. Distinctive identity.',
}

export const campaign = {
  headline: ['Built', 'different.'],
  body: 'An expression of individuality. A statement without words.',
  cta: { label: 'Discover the campaign', href: '#campaign' },
  image: {
    src: `${BASE}images/campaign-1080.webp`,
    srcSet: `${BASE}images/campaign-640.webp 640w, ${BASE}images/campaign-1080.webp 1080w`,
    alt: 'Close view of the RUNO graphic hoodie with ivory sleeve panels and embroidered wordmark',
  },
  detail: {
    src: `${BASE}images/campaign-detail-800.webp`,
    srcSet: `${BASE}images/campaign-detail-480.webp 480w, ${BASE}images/campaign-detail-800.webp 800w`,
    alt: 'Model wearing the RUNO graphic hoodie',
  },
}

export const values = [
  { title: 'Purposeful Design', body: 'Every detail is intentional.' },
  { title: 'Premium Essentials', body: 'Designed around quality, comfort and character.' },
  { title: 'Distinctive Identity', body: 'Style that speaks without saying too much.' },
]

export const newsletter = {
  headline: 'Stay in the know.',
  body: 'Be the first to discover new releases, exclusive collections and everything happening at RUNO.',
  placeholder: 'Your email address',
  button: 'Subscribe',
}

export const footer = {
  statement: 'Not made to follow.',
  links: [
    { label: 'Shop', href: '#collection' },
    { label: 'About', href: '#philosophy' },
    { label: 'Contact', href: '/contact' },
    { label: 'Shipping & Returns', href: '/shipping-returns' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'TikTok', href: 'https://tiktok.com/' },
    { label: 'Pinterest', href: 'https://pinterest.com/' },
  ],
  copyright: '© 2026 RUNO. All rights reserved.',
}
