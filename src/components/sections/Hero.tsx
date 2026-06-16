"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
  CSSProperties,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@animateicons/react/lucide";
import { cn } from "@/lib/utils";
import {
  HERO_ITEMS,
  FIGURE_COUNT,
  AUTO_ADVANCE_MS,
  SWIPE_THRESHOLD_PX,
  SLOTS,
  type SlotPosition,
} from "@/config/hero.config";

/**
 * Editorial product carousel for the Casual Vastram hero.
 *
 * Layout: a responsive two-pane grid.
 *   • < lg : stacked — coverflow stage on top, typography block below (no overlap).
 *   • ≥ lg : side-by-side — typography left (44%), coverflow stage right (56%).
 *
 * The coverflow is positioned with CSS container-query units (cqw / cqh) so the
 * figures scale to the *stage*, not the viewport — robust from 320px to ultrawide
 * with zero JS breakpoint logic (and therefore no SSR layout flash).
 */

// Height drives the figure; width follows the 3:4 source ratio. min() guarantees
// the figure is never wider than the stage on tall/narrow (mobile) panes.
const FIGURE_HEIGHT = "min(90cqh, 116cqw)";

// ── Helpers ────────────────────────────────────────────

function getSlot(figureIndex: number, activeIndex: number): SlotPosition {
  const diff = (figureIndex - activeIndex + FIGURE_COUNT) % FIGURE_COUNT;
  if (diff === 0) return "center";
  if (diff === 1) return "right";
  if (diff === FIGURE_COUNT - 1) return "left";
  if (diff === 2) return "back";
  return "hidden";
}

function getFigureStyle(slot: SlotPosition, reduceMotion: boolean): CSSProperties {
  const c = SLOTS[slot];
  return {
    position: "absolute",
    left: "50%",
    top: "50%",
    height: FIGURE_HEIGHT,
    width: "auto",
    transform: `translate(-50%, -50%) translateX(${c.translateX}) translateY(${c.translateY}) scale(${c.scale})`,
    filter: c.blur > 0 ? `blur(${c.blur}px)` : "none",
    opacity: c.opacity,
    zIndex: c.zIndex,
    transition: reduceMotion
      ? "none"
      : "transform 700ms cubic-bezier(0.76,0,0.24,1), opacity 700ms ease, filter 700ms ease",
    willChange: "transform, opacity, filter",
  };
}

// ── Custom Hooks ───────────────────────────────────────

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function useReducedMotion(): boolean {
  // useSyncExternalStore keeps us in sync with the media query without calling
  // setState inside an effect, and renders false on the server (SSR-safe).
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(REDUCED_MOTION_QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

// ── Navigation Button ──────────────────────────────────

interface NavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ direction, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={direction === "prev" ? "Previous product" : "Next product"}
    className="
      flex h-11 w-11 items-center justify-center cursor-pointer
      bg-transparent text-jet-black border border-graphite-gray rounded-none
      hover:border-jet-black hover:bg-jet-black hover:text-snow-white
      active:scale-[0.97]
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jet-black
      transition-[color,background-color,border-color,transform] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]
    "
  >
    {direction === "prev" ? <ChevronLeftIcon size={18} /> : <ChevronRightIcon size={18} />}
  </button>
);

// ── Main Hero Component ────────────────────────────────

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const dragStartX = useRef<number | null>(null);

  const active = HERO_ITEMS[activeIndex];

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % FIGURE_COUNT);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + FIGURE_COUNT) % FIGURE_COUNT);
  }, []);

  // Auto-advance — resets on every slide change (manual or auto) so the timer and
  // the progress bar stay in sync. Skipped while paused, off-screen, or reduced-motion.
  useEffect(() => {
    if (isPaused || reduceMotion || !inView) return;
    const timer = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [isPaused, reduceMotion, inView, goNext, activeIndex]);

  // Pause when the tab is hidden.
  useEffect(() => {
    const onVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Only respond to arrow keys while the hero is actually on screen.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!inView) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inView, goNext, goPrev]);

  // Track on-screen state to gate autoplay + keyboard.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Touch / pointer swipe on the stage.
  const onStagePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };
  const onStagePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) (dx < 0 ? goNext : goPrev)();
  };

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Featured product collections"
      className="hero-section relative w-full h-[calc(100dvh-84px)] bg-snow-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(document.hidden)}
    >
      {/* Editorial seam removed as per user request */}

      <div className="hero-grid">
        {/* ── Typography pane ── */}
        <div className="hero-text z-20 px-6 sm:px-10 lg:px-12 xl:px-16">
          {/* Eyebrow */}
          <p className="flex items-center gap-3 font-inter font-bold text-[11px] md:text-xs tracking-[0.25em] uppercase text-graphite-gray mb-3 md:mb-5">
            <span aria-hidden className="inline-block h-px w-8 bg-graphite-gray/60" />
            Featured
          </p>

          {/* Crossfading headline + subtitle (grid stack sizes to the tallest copy) */}
          <div className="hero-copy relative grid grid-cols-1 grid-rows-1">
            {HERO_ITEMS.map((item, idx) => (
              <div
                key={idx}
                aria-hidden={activeIndex !== idx ? true : undefined}
                className={cn(
                  "col-start-1 row-start-1 flex flex-col gap-3 md:gap-5 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
                  activeIndex === idx
                    ? "opacity-100 translate-y-0 blur-none"
                    : "opacity-0 translate-y-4 blur-[2px] pointer-events-none"
                )}
              >
                <h1 className="font-inter font-black uppercase text-jet-black tracking-tighter leading-[0.95] text-balance text-[clamp(1.625rem,9.5cqi,5.5rem)]">
                  {item.category}
                </h1>
                <p className="font-inter text-sm md:text-base text-graphite-gray leading-relaxed max-w-[52ch] lg:max-w-[42ch]">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-7 md:mt-9 flex">
            <Link
              href={active.href}
              className="group relative inline-flex items-center gap-4 overflow-hidden border border-jet-black bg-transparent px-6 py-3.5 md:px-8 md:py-4 font-inter text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-jet-black transition-colors duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] hover:bg-jet-black hover:text-snow-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jet-black"
            >
              <span>Explore Collection</span>
              <span className="relative flex h-3.5 w-3.5 items-center justify-center overflow-hidden">
                <svg aria-hidden className="absolute transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[160%]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
                <svg aria-hidden className="absolute -translate-x-[160%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Controls — in-flow under the copy on mobile, pinned bottom-right of the
              section on desktop. Index + progress on one side, arrows on the other. */}
          <div className="mt-9 flex items-center justify-between gap-6 lg:absolute lg:right-8 xl:right-12 lg:bottom-8 lg:mt-0 lg:flex-col lg:items-end lg:gap-4 lg:z-30">
            <div className="flex items-center gap-3 lg:flex-col lg:items-end lg:gap-2">
              <span className="font-inter text-xs font-bold tracking-[0.2em] text-jet-black tabular-nums">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="text-graphite-gray"> / {String(FIGURE_COUNT).padStart(2, "0")}</span>
              </span>
              {!reduceMotion && (
                <span aria-hidden className="block h-px w-16 lg:w-24 overflow-hidden bg-graphite-gray/25">
                  {/* eslint-disable-next-line react/forbid-dom-props */}
                  <span
                    key={activeIndex}
                    className="block h-full w-full origin-left bg-jet-black"
                    style={{
                      transform: "scaleX(0)",
                      animation: `cv-hero-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                      animationPlayState: isPaused || !inView ? "paused" : "running",
                    }}
                  />
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <NavButton direction="prev" onClick={goPrev} />
              <NavButton direction="next" onClick={goNext} />
            </div>
          </div>
        </div>

        {/* ── Coverflow stage ── */}
        <div
          className="hero-stage relative overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y [container-type:size]"
          onPointerDown={onStagePointerDown}
          onPointerUp={onStagePointerUp}
          onPointerLeave={() => (dragStartX.current = null)}
        >
          {HERO_ITEMS.map((item, index) => {
            const slot = getSlot(index, activeIndex);
            return (
              <Image
                key={index}
                src={item.src}
                alt={slot === "center" ? item.category : ""}
                aria-hidden={slot !== "center" ? true : undefined}
                width={900}
                height={1200}
                quality={90}
                priority={index === 0}
                sizes="(min-width: 1024px) 45vw, 90vw"
                draggable={false}
                style={getFigureStyle(slot, reduceMotion)}
                className="pointer-events-none select-none object-contain"
              />
            );
          })}
        </div>
      </div>

      {/* Screen-reader announcement of the current slide */}
      <p className="sr-only" aria-live="polite">
        {active.category}, slide {activeIndex + 1} of {FIGURE_COUNT}
      </p>
    </section>
  );
}
