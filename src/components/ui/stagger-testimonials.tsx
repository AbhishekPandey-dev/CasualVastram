"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@animateicons/react/lucide";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: string | number;
  quote: string;
  author: string;
  avatarUrl: string;
}

export interface StaggerTestimonialsProps {
  title?: string;
  data?: Testimonial[];
  className?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    quote: "The fabric quality is unreal. I've washed this hoodie 20 times and it still feels brand new.",
    author: "Alex, Verified Buyer",
    avatarUrl: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 1,
    quote: "Finally, an oversized tee that actually drapes perfectly instead of just looking boxy.",
    author: "Dan, Verified Buyer",
    avatarUrl: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 2,
    quote: "My go-to brand for streetwear now. The minimalism and quality are unmatched.",
    author: "Stephanie, Verified Buyer",
    avatarUrl: "https://i.pravatar.cc/150?img=10"
  },
  {
    id: 3,
    quote: "The shipping was incredibly fast and the packaging felt so premium. 10/10 experience.",
    author: "Marie, Verified Buyer",
    avatarUrl: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 4,
    quote: "I get compliments on the Jet Black hoodie every time I wear it.",
    author: "Andre, Verified Buyer",
    avatarUrl: "https://i.pravatar.cc/150?img=15"
  },
  {
    id: 5,
    quote: "Obsessed with the fit and the sharp, minimalist aesthetic. Absolutely perfect.",
    author: "Jeremy, Verified Buyer",
    avatarUrl: "https://i.pravatar.cc/150?img=16"
  },
  {
    id: 6,
    quote: "It's so hard to find premium basics that don't cost a fortune. Casual Vastram nailed it.",
    author: "Pam, Verified Buyer",
    avatarUrl: "https://i.pravatar.cc/150?img=17"
  },
  {
    id: 7,
    quote: "The subtle detailing and zero-compromise quality make this my favorite t-shirt.",
    author: "Daniel, Verified Buyer",
    avatarUrl: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: 8,
    quote: "It's just the best. Period. No flashy logos, just pure comfort and style.",
    author: "Fernando, Verified Buyer",
    avatarUrl: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 9,
    quote: "I switched my entire wardrobe to these basics 5 months ago and never looked back.",
    author: "Andy, Verified Buyer",
    avatarUrl: "https://i.pravatar.cc/150?img=20"
  }
];

type InternalTestimonial = Testimonial & { tempId: number };

interface TestimonialCardProps {
  position: number;
  testimonial: InternalTestimonial;
  handleMove: (steps: number) => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-none",
        "w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[365px] md:h-[365px]",
        isCenter
          ? "z-10 bg-jet-black text-snow-white border-jet-black"
          : "z-0 bg-pure-white text-jet-black border-graphite-gray hover:border-jet-black"
      )}
      // eslint-disable-next-line react/forbid-dom-props
      style={{
        transform: `
          translate(-50%, -50%) 
          translateX(${position * 66.66}%)
          translateY(${isCenter ? -40 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleMove(position);
        }
      }}
      aria-label={`View testimonial by ${testimonial.author}`}
    >
      <img
        src={testimonial.avatarUrl}
        alt={testimonial.author.split(",")[0]}
        className={cn(
          "mb-4 sm:mb-6 h-12 w-10 sm:h-14 sm:w-12 object-cover object-top grayscale border rounded-none",
          isCenter ? "border-snow-white" : "border-jet-black"
        )}
      />
      <h3
        className={cn(
          "text-base sm:text-lg md:text-xl font-syne font-bold leading-[1.2] tracking-tight",
          isCenter ? "text-snow-white" : "text-jet-black"
        )}
      >
        "{testimonial.quote}"
      </h3>
      <p
        className={cn(
          "absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 mt-2 text-[10px] sm:text-xs tracking-[0.1em] uppercase font-inter",
          isCenter ? "text-snow-white/80" : "text-graphite-gray"
        )}
      >
        — {testimonial.author}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({
  title = "What They Say",
  data = DEFAULT_TESTIMONIALS,
  className,
}) => {
  const [testimonialsList, setTestimonialsList] = useState<InternalTestimonial[]>([]);

  // Initialize data with random tempIds for stable list rendering
  useEffect(() => {
    setTestimonialsList(data.map((t) => ({ ...t, tempId: Math.random() })));
  }, [data]);

  const handleMove = (steps: number) => {
    setTestimonialsList((prev) => {
      const newList = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prev;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prev;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      return newList;
    });
  };

  // Skip rendering if not mounted to prevent hydration mismatches
  if (testimonialsList.length === 0) {
    return null; 
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-bg-subtle",
        "h-[500px] md:h-[600px]", // Responsive height
        className
      )}
    >
      <div className="absolute top-8 sm:top-12 left-0 w-full text-center z-20 pointer-events-none px-4">
        <h2 className="font-syne text-2xl sm:text-3xl font-bold uppercase tracking-tight text-jet-black">
          {title}
        </h2>
      </div>

      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - Math.floor(testimonialsList.length / 2)
            : index - testimonialsList.length / 2;
            
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
          />
        );
      })}

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-xl transition-colors border",
            "bg-pure-white border-graphite-gray text-jet-black hover:bg-jet-black hover:text-snow-white",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jet-black rounded-none"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-xl transition-colors border",
            "bg-pure-white border-graphite-gray text-jet-black hover:bg-jet-black hover:text-snow-white",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jet-black rounded-none"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>
    </div>
  );
};
