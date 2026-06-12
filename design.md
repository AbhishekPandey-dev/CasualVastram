# Casual Vastram — Design System

> **Single source of truth for all design decisions.** Follow every rule here exactly. When in doubt, choose the more minimal, confident option.

---

## 1. Brand Identity

| Field | Value |
|---|---|
| Brand Name | Casual Vastram |
| Tagline | "Comfort Meets Creativity." |
| Category | Premium oversized streetwear |
| Target Audience | Fashion-conscious youth |
| Core Values | Modernity · Creativity · Premium Quality · Self-expression · Authenticity |

**Aesthetic:** Modern · Clean · Premium · Expressive · Minimalist  
**Tone of voice:** Modern · Confident · Expressive · Minimal · Approachable

---

## 2. Color Palette

Use these exact hex values. No substitutions.

| Name | Hex | RGB | CMYK | HSL |
|---|---|---|---|---|
| Jet Black | `#000000` | 0, 0, 0 | 0%, 0%, 0%, 100% | 0, 0%, 0% |
| Obsidian Black | `#212121` | 33, 33, 33 | 0%, 0%, 0%, 87% | 0, 0%, 13% |
| Graphite Gray | `#474C50` | 71, 76, 80 | 11%, 5%, 0%, 69% | 207, 6%, 30% |
| Snow White | `#FEFDFB` | 254, 253, 251 | 0%, 0%, 1%, 0% | 40, 60%, 99% |
| Pure White | `#FFFFFF` | 255, 255, 255 | 0%, 0%, 0%, 0% | 0, 0%, 100% |

### Usage Rules

- **Default background:** `#FEFDFB` (Snow White) — the brand lives in clean, confident light
- **Primary body text:** `#000000` (Jet Black) — maximum legibility on light
- **Headlines / display text:** `#000000` (Jet Black) — bold, confident, full contrast
- **Secondary surfaces (cards, panels):** `#FFFFFF` (Pure White) — lifted above the base
- **Borders, subtle dividers:** `#474C50` (Graphite Gray)
- **Muted / label text:** `#474C50` (Graphite Gray)
- **Text on dark sections (if any):** `#FEFDFB` (Snow White)

> ⚠️ Do not introduce any new colors. This is a strictly monochrome brand. No gradients, no accent colors, no tints.

---

## 3. Typography

### 3.1 Typefaces

| Role | Font Family | Source |
|---|---|---|
| Primary — Display / Headings | **Syne** | Google Fonts |
| Secondary — Body / UI | **Inter** | Google Fonts |

**Next.js (next/font/google):**
```ts
import { Syne, Inter } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
})
```

**Tailwind config:**
```ts
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      syne:  ['var(--font-syne)', 'sans-serif'],
      inter: ['var(--font-inter)', 'sans-serif'],
    },
  },
}
```

### 3.2 Type Scale

```css
/* Display — hero headline */
font-family: 'Syne', sans-serif;
font-size: clamp(3rem, 8vw, 7rem);
font-weight: 800;
letter-spacing: -0.02em;
line-height: 0.95;

/* H1 — section titles */
font-family: 'Syne', sans-serif;
font-size: clamp(2rem, 5vw, 4rem);
font-weight: 700;
letter-spacing: -0.01em;
line-height: 1.05;

/* H2 — sub-section headings */
font-family: 'Syne', sans-serif;
font-size: clamp(1.5rem, 3vw, 2.5rem);
font-weight: 600;
line-height: 1.1;

/* H3 — card titles, labels */
font-family: 'Syne', sans-serif;
font-size: 1.125rem; /* 18px */
font-weight: 600;
letter-spacing: 0.08em;
text-transform: uppercase;

/* Body — paragraphs */
font-family: 'Inter', sans-serif;
font-size: 1rem; /* 16px */
font-weight: 400;
line-height: 1.7;

/* Caption / eyebrow label */
font-family: 'Inter', sans-serif;
font-size: 0.75rem; /* 12px */
font-weight: 400;
letter-spacing: 0.1em;
text-transform: uppercase;
color: #474C50;

/* Button */
font-family: 'Inter', sans-serif;
font-size: 0.875rem; /* 14px */
font-weight: 500;
letter-spacing: 0.06em;
text-transform: uppercase;
```

---

## 4. Logo

### 4.1 Specs

- **Style:** Custom wordmark — hand-lettered high-contrast serif spelling "Casual Vastram"
- **Minimum size:** 1.08 inch / 104px width — below this, clarity is lost
- **Clear space:** 40px on all sides
- **Variants:** Black wordmark on white · White wordmark on black
- **Never** render the logo in any color other than pure black or pure white
- **Never** distort, rotate, outline, or add effects to the logo

### 4.2 Files

```
assets/
└── logo/
    ├── casual-vastram-logo-white.svg   ← use on dark backgrounds
    ├── casual-vastram-logo-black.svg   ← use on light backgrounds
```

---

## 5. Spacing System

Based on a 4px base unit.

```css
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
--space-32:  128px
```

**Tailwind equivalents:** `p-1` = 4px, `p-4` = 16px, `p-8` = 32px, etc. (standard Tailwind 4px grid).

---

## 6. Layout Tokens

```css
--max-width:       1200px;
--page-padding-x:  clamp(1rem, 5vw, 4rem);
--section-py:      clamp(4rem, 10vw, 8rem);
--nav-height:      72px;
```

**Tailwind:**
```ts
theme: {
  extend: {
    maxWidth: { site: '1200px' },
    height:   { nav:  '72px'   },
  }
}
```

---

## 7. UI Elements

### Buttons

```css
/* Primary */
background:      #000000;
color:           #FEFDFB;
border:          none;
border-radius:   0;           /* sharp corners — always */
padding:         12px 32px;
font-family:     'Inter', sans-serif;
font-size:       0.875rem;
font-weight:     500;
letter-spacing:  0.06em;
text-transform:  uppercase;
transition:      background 250ms cubic-bezier(0.4, 0, 0.2, 1),
                 color 250ms cubic-bezier(0.4, 0, 0.2, 1);

/* Primary hover */
background:      #212121;

/* Ghost / Secondary */
background:      transparent;
color:           #000000;
border:          1px solid #474C50;

/* Ghost hover */
border-color:    #000000;
```

### Cards

```css
background:      #FFFFFF;
border:          1px solid #474C50;
border-radius:   0;           /* sharp corners — always */
overflow:        hidden;
```

### Borders & Dividers

```css
border: 1px solid #474C50;  /* all borders use Graphite Gray */
```

> ⚠️ No `box-shadow` or `drop-shadow` anywhere. Use a crisp 1px border instead.

### Form Inputs

```css
background:      #FEFDFB;
color:           #000000;
border:          1px solid #474C50;
border-radius:   0;
padding:         12px 16px;
font-family:     'Inter', sans-serif;
font-size:       1rem;

/* Focus state */
outline:         2px solid #000000;
outline-offset:  2px;
border-color:    #000000;
```

---

## 8. Animation

Keep animations minimal and purposeful. Never use bouncy springs or decorative effects.

```css
--ease-standard:  cubic-bezier(0.4, 0, 0.2, 1);
--duration-fast:  150ms;
--duration-base:  250ms;
--duration-slow:  500ms;
```

**Allowed:**
- Opacity fades on hover / enter
- Subtle translateY on cards entering viewport (`translateY(20px) → 0`)
- Smooth scrolling marquee for text strips
- Cursor or underline hover effects on nav links

**Never:**
- Parallax scrolling
- Bouncy / spring transitions
- Heavy entrance animations
- Color-flash effects

---

## 9. Photography & Imagery

- **Style:** Monochrome or desaturated editorial photography
- **Mood:** High-contrast, minimal, identity-driven
- **Backgrounds in images:** Dark or neutral — never bright / saturated scenes
- **Never** use colorful, filtered, or lifestyle-casual photography
- Product images should feel intentional and editorial, not e-commerce generic
- Aspect ratios to use: `3:4` (portrait product), `16:9` (editorial banner), `1:1` (square grid)

---

## 10. CSS Custom Properties (Full Token Sheet)

Copy into your `:root` block:

```css
:root {
  /* Colors */
  --color-jet-black:      #000000;
  --color-obsidian-black: #212121;
  --color-graphite-gray:  #474C50;
  --color-snow-white:     #FEFDFB;
  --color-pure-white:     #FFFFFF;

  /* Semantic aliases — Light Theme */
  --bg-primary:           var(--color-snow-white);
  --bg-secondary:         var(--color-pure-white);
  --bg-subtle:            #F5F4F2;
  --border-color:         var(--color-graphite-gray);
  --text-primary:         var(--color-jet-black);
  --text-heading:         var(--color-jet-black);
  --text-muted:           var(--color-graphite-gray);

  /* Typography */
  --font-display:         'Syne', sans-serif;
  --font-body:            'Inter', sans-serif;

  /* Spacing */
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;
  --space-32:  128px;

  /* Layout */
  --max-width:       1200px;
  --page-padding-x:  clamp(1rem, 5vw, 4rem);
  --section-py:      clamp(4rem, 10vw, 8rem);
  --nav-height:      72px;

  /* Animation */
  --ease-standard:   cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   500ms;
}
```

---

## 11. Tailwind Config Reference

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'jet-black':      '#000000',
        'obsidian-black': '#212121',
        'graphite-gray':  '#474C50',
        'snow-white':     '#FEFDFB',
        'pure-white':     '#FFFFFF',
      },
      fontFamily: {
        syne:  ['var(--font-syne)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      height: {
        nav: '72px',
      },
      borderRadius: {
        DEFAULT: '0',   // sharp corners brand-wide
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 12. Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use only the 5 brand colors | Add any new colors (no blues, no beiges, no reds) |
| Sharp corners (`border-radius: 0`) on all elements | Round corners or pill-shaped buttons |
| All-caps labels in Inter | Use Syne for body copy |
| Generous whitespace / padding | Crowd elements together |
| Crisp 1px borders in Graphite Gray | Drop shadows or box shadows |
| Minimal, purposeful animations only | Heavy parallax, bouncy springs, flashy effects |
| Black logo on light backgrounds | Logo in any color other than black or white |
| Keep backgrounds light (`#FEFDFB` or `#FFFFFF`) | Dark or colored primary backgrounds |
| Monochrome / editorial photography | Bright, saturated, or heavily filtered images |

---

## 13. Accessibility

- All text must meet WCAG AA contrast minimum — black on Snow White = 21:1 ✅
- Keyboard focus state: `outline: 2px solid #000000; outline-offset: 2px`
- `alt` text required on all product and editorial images
- Minimum font size for any readable text: **14px**
- Touch targets: minimum **44×44px** on mobile

---

*Design system extracted from the Casual Vastram Brand Book (Pomelli, 2024). Last updated: June 2026.*