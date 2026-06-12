"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  /** The text to display in the ticker */
  text?: string;
  /** Duration of one full scroll cycle in seconds */
  duration?: number;
  /** Background color of the ticker */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Optional extra classes */
  className?: string;
}

const DEFAULT_TEXT = "Black friday sale 50% off";

export default function MarqueeStrip({
  text = DEFAULT_TEXT,
  duration = 20,
  backgroundColor = "bg-jet-black",
  textColor = "text-snow-white",
  className,
}: MarqueeStripProps) {
  // We repeat the text many times to ensure it covers the screen width and loops smoothly
  const tickerItems = Array(12).fill(text);

  return (
    <nav
      className={cn(
        "relative w-full h-[28px] overflow-hidden flex items-center justify-center py-1 px-6 border-b border-border-color/10",
        backgroundColor,
        className || ""
      )}
    >
      <div className="relative w-full max-w-[1200px] flex items-center overflow-hidden">
        <motion.ul
          role="group"
          className="flex items-center list-none p-0 m-0 whitespace-nowrap"
          animate={{
            x: [0, -1000], // Approximate width to scroll before resetting
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            gap: "120px",
          }}
        >
          {tickerItems.map((item, index) => (
            <li
              key={`${item}-${index}`}
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
        </motion.ul>
      </div>
    </nav>
  );
}

// Exporting PromoTicker as a named export for compatibility if needed
export { MarqueeStrip as PromoTicker };
