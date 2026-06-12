"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Props for the MarqueeStrip component.
 */
interface MarqueeStripProps {
  /** The text to display in the scrolling ticker */
  text?: string;
  /** Duration of one full scroll cycle in seconds (higher = slower) */
  duration?: number;
  /** Tailwind background color class */
  backgroundColor?: string;
  /** Tailwind text color class */
  textColor?: string;
  /** Optional extra Tailwind CSS classes */
  className?: string;
}

const DEFAULT_TEXT = "Black friday sale 50% off";

/**
 * A highly-craft, resolution-independent infinite marquee strip.
 * Uses two identical side-by-side lists translating from 0% to -50% 
 * to ensure a mathematically perfect, seamless loop on all screen widths.
 */
export default function MarqueeStrip({
  text = DEFAULT_TEXT,
  duration = 20,
  backgroundColor = "bg-jet-black",
  textColor = "text-snow-white",
  className,
}: MarqueeStripProps) {
  // We repeat the text within one base group block to fill the screen
  const tickerItems = Array(6).fill(text);

  return (
    <nav
      className={cn(
        "relative w-full h-[28px] overflow-hidden flex items-center justify-center py-1 px-6 border-b border-border-color/10",
        backgroundColor,
        className || ""
      )}
    >
      <div className="relative w-full max-w-[1200px] flex items-center overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap w-fit"
          animate={{
            x: [0, "-50%"], // Translate exactly half the total width of the dual-group wrapper
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Group 1: Visible to screen readers */}
          <ul
            role="list"
            className="flex items-center list-none p-0 m-0 gap-[120px] pr-[120px] whitespace-nowrap"
          >
            {tickerItems.map((item, index) => (
              <li
                key={`group1-${item}-${index}`}
                className="flex-shrink-0 flex items-center h-[14px]"
              >
                <span
                  className={cn(
                    "font-syne font-semibold text-[10px] uppercase tracking-wider select-none",
                    textColor
                  )}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Group 2: Hidden from screen readers, identical width for seamless loop match */}
          <ul
            role="list"
            className="flex items-center list-none p-0 m-0 gap-[120px] pr-[120px] whitespace-nowrap"
            aria-hidden="true"
          >
            {tickerItems.map((item, index) => (
              <li
                key={`group2-${item}-${index}`}
                className="flex-shrink-0 flex items-center h-[14px]"
              >
                <span
                  className={cn(
                    "font-syne font-semibold text-[10px] uppercase tracking-wider select-none",
                    textColor
                  )}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </nav>
  );
}

// Exporting PromoTicker as a named export for compatibility if needed
export { MarqueeStrip as PromoTicker };
