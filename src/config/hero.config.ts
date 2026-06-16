/**
 * HERO SECTION CONFIGURATION
 * 
 * This file contains all the editable data and layout settings for the Hero section.
 * Junior developers: You can safely edit the text, images, and timings here without
 * needing to touch the complex React animation logic in `Hero.tsx`.
 */

export type SlotPosition = "center" | "left" | "right" | "back" | "hidden";

export interface SlotConfig {
  translateX: string; // container-relative (cqw)
  translateY: string; // container-relative (cqh)
  scale: number;
  blur: number;
  opacity: number;
  zIndex: number;
}

export interface HeroItem {
  src: string;
  category: string;
  subtitle: string;
  href: string;
}

// ── 1. CONTENT CONFIGURATION ──────────────────────────────────────────────

/**
 * HERO_ITEMS
 * The array of slides shown in the Hero carousel.
 * To add a new slide, simply add a new object to this array.
 */
export const HERO_ITEMS: HeroItem[] = [
  { 
    src: "/assets/hero-img/couple_collection.png", 
    category: "Couples Collection", 
    subtitle: "Sync your aesthetic. Premium matching hoodies and tees designed exclusively for couples.", 
    href: "/shop" 
  },
  { 
    src: "/assets/hero-img/graphic_hoodie.png", 
    category: "Graphic Hoodies", 
    subtitle: "Bold streetwear staples. Heavyweight warmth crafted for the culture.", 
    href: "/shop" 
  },
  { 
    src: "/assets/hero-img/graphic_tshirt.png", 
    category: "Graphic Tees", 
    subtitle: "Wear your vibe. Exclusive prints on ultra-premium heavyweight cotton.", 
    href: "/shop" 
  },
  { 
    src: "/assets/hero-img/solid_hoodie.png", 
    category: "Solid Hoodies", 
    subtitle: "Minimalist luxury. The perfect balance of class, comfort, and aesthetic.", 
    href: "/shop" 
  },
  { 
    src: "/assets/hero-img/solid_tshirt.png", 
    category: "Solid Tees", 
    subtitle: "Cool premium solids. An effortless aesthetic look with undeniable class.", 
    href: "/shop" 
  }
];

export const FIGURE_COUNT = HERO_ITEMS.length;

// ── 2. TIMING & GESTURE CONFIGURATION ──────────────────────────────────────

/** How long (in milliseconds) before the carousel automatically advances to the next slide */
export const AUTO_ADVANCE_MS = 4500;

/** How many pixels a user must drag/swipe on touch devices to trigger a slide change */
export const SWIPE_THRESHOLD_PX = 44;

// ── 3. 3D LAYOUT CONFIGURATION ─────────────────────────────────────────────

/**
 * SLOTS
 * The 3D coverflow positions relative to the stage.
 * Adjust these values if you want to change how far back the inactive images sit,
 * or how blurry they are. 
 * Note: translateX and translateY use container-query units (cqw/cqh) to perfectly
 * scale across all screen sizes.
 */
export const SLOTS: Record<SlotPosition, SlotConfig> = {
  center: { translateX: "0cqw", translateY: "0cqh", scale: 1, blur: 0, opacity: 1, zIndex: 30 },
  right: { translateX: "33cqw", translateY: "3cqh", scale: 0.72, blur: 3, opacity: 0.3, zIndex: 20 },
  left: { translateX: "-33cqw", translateY: "3cqh", scale: 0.72, blur: 3, opacity: 0.3, zIndex: 20 },
  back: { translateX: "0cqw", translateY: "-6cqh", scale: 0.5, blur: 7, opacity: 0.12, zIndex: 10 },
  hidden: { translateX: "0cqw", translateY: "-10cqh", scale: 0.4, blur: 10, opacity: 0, zIndex: 0 },
};
