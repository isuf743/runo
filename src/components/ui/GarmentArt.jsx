import { useId } from 'react'

/**
 * Drawn flat-lay placeholder for product photography.
 * Renders the garment in the selected colour, front or back view,
 * so the collection grid stays on-brand until real images are supplied.
 */

function isDark(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return 0.299 * r + 0.587 * g + 0.114 * b < 128
}

const HOODIE_BODY =
  'M200 50C170 50 148 68 146 98L112 114C92 124 84 148 80 178L62 380L64 406L98 408L100 384L114 224L122 222L122 442L278 442L278 222L286 224L300 384L302 408L336 406L338 380L320 178C316 148 308 124 288 114L254 98C252 68 230 50 200 50Z'
const HOODIE_SLEEVE_L = 'M112 114C92 124 84 148 80 178L62 380L64 406L98 408L100 384L114 224L122 222L118 118Z'
const HOODIE_SLEEVE_R = 'M288 114C308 124 316 148 320 178L338 380L336 406L302 408L300 384L286 224L278 222L282 118Z'

function Hoodie({ fill, accent, line, view, graphic, clipId }) {
  const inner = isDark(fill) ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.08)'
  const markColor = isDark(fill) ? '#ece5d8' : '#1a1917'
  return (
    // drawn tall, then set into boxier streetwear proportions
    <g transform="translate(200 18) scale(1.14 0.93) translate(-200 0)">
      <path d={HOODIE_BODY} fill={fill} />

      {graphic && (
        <>
          <clipPath id={clipId}>
            <path d={HOODIE_SLEEVE_L} />
            <path d={HOODIE_SLEEVE_R} />
            <path d="M122 222L146 222L140 442L122 442Z M278 222L254 222L260 442L278 442Z" />
          </clipPath>
          <g clipPath={`url(#${clipId})`}>
            <rect x="50" y="100" width="300" height="350" fill={accent} />
            {/* brushed streaks, echoing the campaign hoodie */}
            <g fill={fill}>
              <path d="M70 150C88 170 92 230 82 300C78 250 70 210 58 190Z" />
              <path d="M96 200C112 230 110 300 98 370C96 320 90 270 84 240Z" />
              <path d="M104 120C118 150 120 190 112 230C108 196 100 160 92 140Z" />
              <path d="M76 330C90 350 94 380 88 410C84 390 76 370 66 360Z" />
              <path d="M330 150C312 170 308 230 318 300C322 250 330 210 342 190Z" />
              <path d="M304 200C288 230 290 300 302 370C304 320 310 270 316 240Z" />
              <path d="M296 120C282 150 280 190 288 230C292 196 300 160 308 140Z" />
              <path d="M324 330C310 350 306 380 312 410C316 390 324 370 334 360Z" />
              <path d="M134 250C142 290 140 350 132 420C128 370 126 310 128 270Z" />
              <path d="M266 250C258 290 260 350 268 420C272 370 274 310 272 270Z" />
            </g>
          </g>
        </>
      )}

      <g fill="none" stroke={line} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* drop-shoulder seams */}
        <path d="M118 118Q124 170 122 222" />
        <path d="M282 118Q276 170 278 222" />
        {/* cuffs and hem rib */}
        <path d="M63 384L100 386" />
        <path d="M337 384L300 386" />
        <path d="M122 418L278 418" />

        {view === 'front' ? (
          <>
            <path d="M152 330L248 330L262 400L138 400Z" />
            <path d="M152 330L146 400" strokeOpacity="0.6" />
            <path d="M248 330L254 400" strokeOpacity="0.6" />
          </>
        ) : (
          <path d="M200 52L200 120" />
        )}
      </g>

      {view === 'front' && (
        <>
          {/* hood opening */}
          <path d="M168 112C170 80 230 80 232 112C222 130 178 130 168 112Z" fill={inner} />
          {/* drawstrings */}
          <g stroke={line} strokeWidth="2" strokeLinecap="round">
            <path d="M184 124Q181 160 182 204" />
            <path d="M216 124Q219 160 218 204" />
          </g>
          <g stroke={isDark(fill) ? '#8b8476' : '#6b6358'} strokeWidth="3" strokeLinecap="round">
            <path d="M182 200L182 210" />
            <path d="M218 200L218 210" />
          </g>
          <text
            x="200"
            y="182"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', serif"
            fontSize="17"
            letterSpacing="2.5"
            fill={markColor}
          >
            RUNO
          </text>
        </>
      )}
    </g>
  )
}

function Tee({ fill, line, view }) {
  const neckDip = view === 'front' ? 116 : 100
  return (
    <g>
      <path
        d={`M160 88C176 ${neckDip} 224 ${neckDip} 240 88L292 104L344 156L312 204L284 186L286 430L114 430L116 186L88 204L56 156L108 104Z`}
        fill={fill}
      />
      <g fill="none" stroke={line} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={`M166 92C180 ${neckDip + 6} 220 ${neckDip + 6} 234 92`} />
        <path d="M108 104Q118 150 116 186" />
        <path d="M292 104Q282 150 284 186" />
        <path d="M70 180L100 196" />
        <path d="M330 180L300 196" />
        <path d="M114 414L286 414" />
      </g>
      {view === 'front' && (
        <text
          x="200"
          y="168"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', serif"
          fontSize="14"
          letterSpacing="2.5"
          fill={isDark(fill) ? '#ece5d8' : '#1a1917'}
        >
          RUNO
        </text>
      )}
    </g>
  )
}

function Sweatpants({ fill, line, view }) {
  return (
    <g>
      <path
        d="M128 56L272 56L275 92L292 300L284 428L288 454L222 454L222 428L206 168L200 146L194 168L178 428L178 454L112 454L116 428L108 300L125 92Z"
        fill={fill}
      />
      <g fill="none" stroke={line} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M125 92L275 92" />
        <path d="M116 428L178 428" />
        <path d="M222 428L284 428" />
        <path d="M200 92L200 146" />
        {view === 'front' ? (
          <>
            <path d="M136 100Q150 140 146 176" />
            <path d="M264 100Q250 140 254 176" />
          </>
        ) : (
          <>
            <path d="M146 130L182 130L180 176L148 176Z" />
            <path d="M200 92L200 120" />
          </>
        )}
      </g>
      {view === 'front' && (
        <>
          <g stroke={line} strokeWidth="2" strokeLinecap="round">
            <path d="M194 94Q190 116 192 138" />
            <path d="M206 94Q210 116 208 138" />
          </g>
          <text
            x="152"
            y="214"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', serif"
            fontSize="11"
            letterSpacing="2"
            fill={isDark(fill) ? '#ece5d8' : '#1a1917'}
          >
            RUNO
          </text>
        </>
      )}
    </g>
  )
}

export default function GarmentArt({ garment, color, view = 'front', className = '', title }) {
  const clipId = useId().replace(/:/g, '')
  const fill = color.hex
  const accent = color.accent ?? '#ece5d8'
  const line = isDark(fill) ? 'rgba(242,237,228,0.22)' : 'rgba(22,21,19,0.22)'

  const props = { fill, accent, line, view, clipId }

  return (
    <svg viewBox="0 0 400 500" className={className} role="img" aria-label={title}>
      {/* soft floor shadow */}
      <ellipse cx="200" cy="470" rx="130" ry="8" fill="rgba(22,21,19,0.08)" />
      {garment === 'hoodie' && <Hoodie {...props} />}
      {garment === 'hoodie-graphic' && <Hoodie {...props} graphic />}
      {garment === 'tee' && <Tee {...props} />}
      {garment === 'sweatpants' && <Sweatpants {...props} />}
    </svg>
  )
}
