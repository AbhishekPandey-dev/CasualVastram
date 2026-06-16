"use client";

import React, { useState, useEffect, useCallback, CSSProperties } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@animateicons/react/lucide";

/**
 * Real product shots from public/assets/hero-img
 */
const FIGURES = [
  "/assets/hero-img/hero (1).png",
  "/assets/hero-img/hero (2).png",
  "/assets/hero-img/hero (3).png",
  "/assets/hero-img/hero (4).png",
];

const FIGURE_COUNT = FIGURES.length;
const AUTO_ADVANCE_MS = 4500;

// ── Types ──────────────────────────────────────────────

type SlotPosition = "center" | "left" | "right" | "back";
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
// By keeping the height fixed within a breakpoint and animating scale, 
// we ensure GPU acceleration and prevent layout jank.
// translateX uses 'vw' to ensure side figures are pushed out relative to screen width.

const DESKTOP_SLOTS: Record<SlotPosition, SlotConfig> = {
  center: { scale: 1.1, translateX: "0vw", translateY: "0%", blur: 0, opacity: 1, zIndex: 30, height: "70vh" },
  left:   { scale: 0.8, translateX: "-22vw", translateY: "10%", blur: 2, opacity: 0.35, zIndex: 20, height: "70vh" },
  right:  { scale: 0.8, translateX: "22vw", translateY: "10%", blur: 2, opacity: 0.35, zIndex: 20, height: "70vh" },
  back:   { scale: 0.5, translateX: "0vw", translateY: "-15%", blur: 4, opacity: 0.15, zIndex: 10, height: "70vh" },
};

const TABLET_SLOTS: Record<SlotPosition, SlotConfig> = {
  center: { scale: 1.1, translateX: "0vw", translateY: "0%", blur: 0, opacity: 1, zIndex: 30, height: "60vh" },
  left:   { scale: 0.8, translateX: "-28vw", translateY: "8%", blur: 2, opacity: 0.35, zIndex: 20, height: "60vh" },
  right:  { scale: 0.8, translateX: "28vw", translateY: "8%", blur: 2, opacity: 0.35, zIndex: 20, height: "60vh" },
  back:   { scale: 0.5, translateX: "0vw", translateY: "-12%", blur: 4, opacity: 0.15, zIndex: 10, height: "60vh" },
};

const MOBILE_SLOTS: Record<SlotPosition, SlotConfig> = {
  center: { scale: 1.0, translateX: "0vw", translateY: "0%", blur: 0, opacity: 1, zIndex: 30, height: "55vh" },
  left:   { scale: 0.7, translateX: "-32vw", translateY: "5%", blur: 2, opacity: 0.35, zIndex: 20, height: "55vh" },
  right:  { scale: 0.7, translateX: "32vw", translateY: "5%", blur: 2, opacity: 0.35, zIndex: 20, height: "55vh" },
  back:   { scale: 0.4, translateX: "0vw", translateY: "-10%", blur: 4, opacity: 0.15, zIndex: 10, height: "55vh" },
};

// ── Helpers ────────────────────────────────────────────

/** Returns the positional slot for a given figure index relative to activeIndex */
function getSlot(figureIndex: number, activeIndex: number): SlotPosition {
  const diff = (figureIndex - activeIndex + FIGURE_COUNT) % FIGURE_COUNT;
  if (diff === 0) return "center";
  if (diff === 1) return "right";
  if (diff === FIGURE_COUNT - 1) return "left";
  return "back";
}

/** Builds the inline CSSProperties for a figure in a given slot */
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
    // Note: translateX must be calculated with CSS because the parent is already -50% translated
    transform: `translate(-50%, -50%) translateX(${config.translateX}) translateY(${config.translateY}) scale(${config.scale})`,
    filter: config.blur > 0 ? `blur(${config.blur}px)` : "none",
    opacity: config.opacity,
    zIndex: config.zIndex,
    transition: reduceMotion ? "none" : "all 650ms cubic-bezier(0.4, 0, 0.2, 1)",
    willChange: "transform, opacity, filter",
  };
}

// ── Custom Hooks ───────────────────────────────────────

/** Detects viewport breakpoint for responsive slot configs */
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

/** Detects prefers-reduced-motion user preference */
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
      {/* Carousel Figures */}
      {FIGURES.map((src, index) => {
        const slot = getSlot(index, activeIndex);
        const style = getSlotStyle(slot, breakpoint, reduceMotion);

        return (
          <img
            key={index}
            src={src}
            alt=""
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
          right: breakpoint === "mobile" ? "1rem" : "1.5rem",
          bottom: breakpoint === "mobile" ? "1rem" : "1.5rem",
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
