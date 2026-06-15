"use client";

import React, { useState, useEffect, useCallback, CSSProperties } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@animateicons/react/lucide";

/**
 * 4 placeholder figurine images — swap with real product shots later.
 */
const FIGURES = [
  "https://placehold.co/800x800/FF6B6B/FFFFFF?text=Figure+1",
  "https://placehold.co/800x800/4ECDC4/FFFFFF?text=Figure+2",
  "https://placehold.co/800x800/45B7D1/FFFFFF?text=Figure+3",
  "https://placehold.co/800x800/96CEB4/FFFFFF?text=Figure+4",
];

const FIGURE_COUNT = FIGURES.length;
const AUTO_ADVANCE_MS = 4500;

// ── Types ──────────────────────────────────────────────

type SlotPosition = "center" | "left" | "right" | "back";

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
  center: { scale: 1.45, translateX: "0%", translateY: "0%", blur: 0, opacity: 1, zIndex: 30, height: "78vh" },
  left:   { scale: 0.68, translateX: "-40%", translateY: "10%", blur: 2, opacity: 0.35, zIndex: 20, height: "44vh" },
  right:  { scale: 0.68, translateX: "40%", translateY: "10%", blur: 2, opacity: 0.35, zIndex: 20, height: "44vh" },
  back:   { scale: 0.38, translateX: "0%", translateY: "-18%", blur: 4, opacity: 0.15, zIndex: 10, height: "24vh" },
};

const MOBILE_SLOTS: Record<SlotPosition, SlotConfig> = {
  center: { scale: 1.12, translateX: "0%", translateY: "0%", blur: 0, opacity: 1, zIndex: 30, height: "52vh" },
  left:   { scale: 0.52, translateX: "-34%", translateY: "8%", blur: 2, opacity: 0.35, zIndex: 20, height: "32vh" },
  right:  { scale: 0.52, translateX: "34%", translateY: "8%", blur: 2, opacity: 0.35, zIndex: 20, height: "32vh" },
  back:   { scale: 0.28, translateX: "0%", translateY: "-14%", blur: 4, opacity: 0.15, zIndex: 10, height: "18vh" },
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
function getSlotStyle(slot: SlotPosition, isMobile: boolean, reduceMotion: boolean): CSSProperties {
  const config = isMobile ? MOBILE_SLOTS[slot] : DESKTOP_SLOTS[slot];

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

/** Detects viewport below 640px for responsive slot configs */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
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
  isMobile: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ direction, onClick, isMobile }) => {
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
  const isMobile = useIsMobile();
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
        const style = getSlotStyle(slot, isMobile, reduceMotion);

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
        className="absolute z-50 flex flex-col items-end"
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          right: isMobile ? "1rem" : "1.5rem",
          bottom: isMobile ? "1rem" : "1.5rem",
        }}
      >
        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-3">
          <NavButton direction="prev" onClick={goPrev} isMobile={isMobile} />
          <NavButton direction="next" onClick={goNext} isMobile={isMobile} />
        </div>

        {/* Progress Dots */}
        <ProgressDots count={FIGURE_COUNT} activeIndex={activeIndex} />
      </div>
    </section>
  );
}
