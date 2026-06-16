"use client";

import React, { useState, useEffect, useCallback, CSSProperties } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@animateicons/react/lucide";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Real product shots with their respective categories and premium subtitles
 */
const HERO_ITEMS = [
  { src: "/assets/hero-img/couple_collection.png", category: "Couples Collection", subtitle: "Sync your aesthetic. Premium matching hoodies and tees designed exclusively for couples.", href: "/shop" },
  { src: "/assets/hero-img/graphic_hoodie.png", category: "Graphic Hoodies", subtitle: "Bold streetwear staples. Heavyweight warmth crafted for the culture.", href: "/shop" },
  { src: "/assets/hero-img/graphic_tshirt.png", category: "Graphic Tees", subtitle: "Wear your vibe. Exclusive prints on ultra-premium heavyweight cotton.", href: "/shop" },
  { src: "/assets/hero-img/solid_hoodie.png", category: "Solid Hoodies", subtitle: "Minimalist luxury. The perfect balance of class, comfort, and aesthetic.", href: "/shop" },
  { src: "/assets/hero-img/solid_tshirt.png", category: "Solid Tees", subtitle: "Cool premium solids. An effortless aesthetic look with undeniable class.", href: "/shop" },
];

const FIGURE_COUNT = HERO_ITEMS.length;
const AUTO_ADVANCE_MS = 4500;

// ── Types ──────────────────────────────────────────────

type SlotPosition = "center" | "left" | "right" | "back" | "hidden";
type Breakpoint = "mobile" | "tablet" | "desktop";

interface SlotConfig {
  scale: number;
  translateX: string;
  translateY: string;
  blur: number;
  opacity: number;
  zIndex: number;
  height: string;
}

// ── Slot style configs ─────────────────────────────────

const DESKTOP_SLOTS: Record<SlotPosition, SlotConfig> = {
  center: { scale: 1.1, translateX: "15vw", translateY: "0%", blur: 0, opacity: 1, zIndex: 30, height: "70vh" },
  left:   { scale: 0.8, translateX: "-5vw", translateY: "10%", blur: 2, opacity: 0.35, zIndex: 20, height: "70vh" },
  right:  { scale: 0.8, translateX: "35vw", translateY: "10%", blur: 2, opacity: 0.35, zIndex: 20, height: "70vh" },
  back:   { scale: 0.5, translateX: "15vw", translateY: "-15%", blur: 4, opacity: 0.15, zIndex: 10, height: "70vh" },
  hidden: { scale: 0.4, translateX: "15vw", translateY: "-20%", blur: 8, opacity: 0, zIndex: 0, height: "70vh" },
};

const TABLET_SLOTS: Record<SlotPosition, SlotConfig> = {
  center: { scale: 1.1, translateX: "10vw", translateY: "0%", blur: 0, opacity: 1, zIndex: 30, height: "60vh" },
  left:   { scale: 0.8, translateX: "-15vw", translateY: "8%", blur: 2, opacity: 0.35, zIndex: 20, height: "60vh" },
  right:  { scale: 0.8, translateX: "35vw", translateY: "8%", blur: 2, opacity: 0.35, zIndex: 20, height: "60vh" },
  back:   { scale: 0.5, translateX: "10vw", translateY: "-12%", blur: 4, opacity: 0.15, zIndex: 10, height: "60vh" },
  hidden: { scale: 0.4, translateX: "10vw", translateY: "-15%", blur: 8, opacity: 0, zIndex: 0, height: "60vh" },
};

const MOBILE_SLOTS: Record<SlotPosition, SlotConfig> = {
  center: { scale: 1.0, translateX: "0vw", translateY: "0%", blur: 0, opacity: 1, zIndex: 30, height: "55vh" },
  left:   { scale: 0.7, translateX: "-32vw", translateY: "5%", blur: 2, opacity: 0.35, zIndex: 20, height: "55vh" },
  right:  { scale: 0.7, translateX: "32vw", translateY: "5%", blur: 2, opacity: 0.35, zIndex: 20, height: "55vh" },
  back:   { scale: 0.4, translateX: "0vw", translateY: "-10%", blur: 4, opacity: 0.15, zIndex: 10, height: "55vh" },
  hidden: { scale: 0.3, translateX: "0vw", translateY: "-15%", blur: 8, opacity: 0, zIndex: 0, height: "55vh" },
};

// ── Helpers ────────────────────────────────────────────

function getSlot(figureIndex: number, activeIndex: number): SlotPosition {
  const diff = (figureIndex - activeIndex + FIGURE_COUNT) % FIGURE_COUNT;
  if (diff === 0) return "center";
  if (diff === 1) return "right";
  if (diff === FIGURE_COUNT - 1) return "left";
  if (diff === 2) return "back";
  return "hidden";
}

function getSlotStyle(slot: SlotPosition, breakpoint: Breakpoint, reduceMotion: boolean): CSSProperties {
  const config = 
    breakpoint === "mobile" ? MOBILE_SLOTS[slot] : 
    breakpoint === "tablet" ? TABLET_SLOTS[slot] : 
    DESKTOP_SLOTS[slot];

  return {
    position: "absolute",
    left: "50%",
    top: "50%",
    height: config.height,
    transform: `translate(-50%, -50%) translateX(${config.translateX}) translateY(${config.translateY}) scale(${config.scale})`,
    filter: config.blur > 0 ? `blur(${config.blur}px)` : "none",
    opacity: config.opacity,
    zIndex: config.zIndex,
    transition: reduceMotion ? "none" : "all 650ms cubic-bezier(0.4, 0, 0.2, 1)",
    willChange: "transform, opacity, filter",
  };
}

// ── Custom Hooks ───────────────────────────────────────

function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint("mobile");
      else if (width < 1024) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    };

    handleResize(); // Set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}

function useReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduceMotion;
}

// ── Navigation Buttons ─────────────────────────────────

interface NavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  breakpoint: Breakpoint;
}

const NavButton: React.FC<NavButtonProps> = ({ direction, onClick, breakpoint }) => {
  const isMobile = breakpoint === "mobile";
  const iconSize = isMobile ? 18 : 20;
  const label = direction === "prev" ? "Previous figure" : "Next figure";

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="
        flex items-center justify-center cursor-pointer
        bg-transparent text-jet-black border border-graphite-gray
        hover:border-jet-black active:bg-jet-black active:text-snow-white
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-jet-black rounded-none
        transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]
      "
      // eslint-disable-next-line react/forbid-dom-props
      style={{
        width: isMobile ? "2.75rem" : "3.25rem",
        height: isMobile ? "2.75rem" : "3.25rem",
      }}
    >
      {direction === "prev"
        ? <ChevronLeftIcon size={iconSize} />
        : <ChevronRightIcon size={iconSize} />
      }
    </button>
  );
};

// ── Progress Dots ──────────────────────────────────────

interface ProgressDotsProps {
  count: number;
  activeIndex: number;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ count, activeIndex }) => (
  <div className="flex items-center justify-end gap-1.5 mt-4">
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="h-2 rounded-full transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]"
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          width: i === activeIndex ? "1.5rem" : "0.5rem",
          backgroundColor: i === activeIndex ? "#000000" : "#474C50",
        }}
      />
    ))}
  </div>
);

// ── Main Hero Component ────────────────────────────────

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const breakpoint = useBreakpoint();
  const reduceMotion = useReducedMotion();

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % FIGURE_COUNT);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + FIGURE_COUNT) % FIGURE_COUNT);
  }, []);

  // Auto-advance timer — pauses on hover and page hidden
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [isPaused, goNext]);

  // Pause auto-advance when page is not visible
  useEffect(() => {
    const handleVisibility = () => setIsPaused(document.hidden);

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Product showcase carousel"
      className="relative w-full h-[calc(100dvh-84px)] bg-snow-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(document.hidden)}
    >
      {/* Category Typography - Left Aligned / Vertical Center */}
      <div className="absolute z-40 left-6 md:left-12 top-auto bottom-[6.5rem] md:bottom-auto md:top-1/2 md:-translate-y-1/2 pointer-events-none w-[85vw] md:w-[50vw] lg:w-[45vw]">
        <p className="font-inter font-bold text-[10px] md:text-[12px] tracking-[0.2em] uppercase text-graphite-gray mb-2 md:mb-4">
          Featured
        </p>
        
        {/* Grid stack for the typography to dynamically size the container */}
        <div className="relative grid grid-cols-1 grid-rows-1 mb-6 md:mb-8">
          {HERO_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "col-start-1 row-start-1 w-full flex flex-col justify-center gap-2 md:gap-4 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
                activeIndex === idx
                  ? "translate-y-0 opacity-100 blur-none pointer-events-auto z-10"
                  : "translate-y-6 opacity-0 blur-sm pointer-events-none z-0"
              )}
            >
              <h2 className="font-inter font-black text-[28px] sm:text-4xl md:text-5xl lg:text-7xl uppercase text-jet-black tracking-tighter leading-[1.05] md:leading-[1.1] text-balance">
                {item.category}
              </h2>
              <p className="font-inter font-medium text-xs sm:text-sm md:text-base text-graphite-gray leading-relaxed max-w-[95%] md:max-w-[85%]">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pointer-events-auto flex">
          <Link
            href={HERO_ITEMS[activeIndex].href}
            className="group relative inline-flex items-center gap-4 overflow-hidden border border-jet-black bg-transparent px-6 py-3.5 md:py-4 font-inter text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-jet-black transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] hover:bg-jet-black hover:text-snow-white hover:border-jet-black focus:outline-none focus:ring-2 focus:ring-jet-black focus:ring-offset-2"
          >
            <span>Explore Collection</span>
            <div className="relative flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center overflow-hidden">
               {/* Arrow sliding effect */}
               <svg className="absolute transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[150%]" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
               </svg>
               <svg className="absolute -translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"/>
               </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* Carousel Figures */}
      {HERO_ITEMS.map((item, index) => {
        const slot = getSlot(index, activeIndex);
        const style = getSlotStyle(slot, breakpoint, reduceMotion);

        return (
          <img
            key={index}
            src={item.src}
            alt={item.category}
            draggable={false}
            style={style}
            className="pointer-events-none select-none object-contain"
          />
        );
      })}

      {/* Navigation Cluster — bottom-right */}
      <div
        className="absolute z-40 flex flex-col items-end"
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          right: breakpoint === "mobile" ? "1.5rem" : "2rem",
          bottom: breakpoint === "mobile" ? "2.5rem" : "3rem",
        }}
      >
        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-3">
          <NavButton direction="prev" onClick={goPrev} breakpoint={breakpoint} />
          <NavButton direction="next" onClick={goNext} breakpoint={breakpoint} />
        </div>

        {/* Progress Dots */}
        <ProgressDots count={FIGURE_COUNT} activeIndex={activeIndex} />
      </div>
    </section>
  );
}

