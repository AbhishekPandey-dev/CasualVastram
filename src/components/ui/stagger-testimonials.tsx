"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@animateicons/react/lucide";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: string | number;
  quote: string;
  author: string;
}

export interface StaggerTestimonialsProps {
  title?: string;
  data?: Testimonial[];
  className?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    quote: "Bhai ekdum solid hoodie hai. 3 baar wash kiya, colour bilkul wahi hai. Itna acha fabric pehli baar mila.",
    author: "Rohit S., Delhi"
  },
  {
    id: 1,
    quote: "The oversized fit is genuinely perfect — not too boxy, not too long. Wore it to college and got 4 compliments on day one.",
    author: "Ananya M., Bangalore"
  },
  {
    id: 2,
    quote: "Maine bohot brands try kiye but ye wala tee ka feel alag hi hai. Soft hai, heavy nahi lagta, aur look premium hai.",
    author: "Arjun K., Mumbai"
  },
  {
    id: 3,
    quote: "Packaging dekh ke hi samajh aa gaya ki brand serious hai. T-shirt bhi exactly as shown. No complaints at all.",
    author: "Priya R., Pune"
  },
  {
    id: 4,
    quote: "I was skeptical ordering online but the hoodie quality genuinely surprised me. Worth every rupee honestly.",
    author: "Karan D., Hyderabad"
  },
  {
    id: 5,
    quote: "Mujhe minimalist pasand hai aur ye brand exactly wahi deta hai. No loud logos, bas clean design. Repeat order done.",
    author: "Sneha T., Jaipur"
  },
  {
    id: 6,
    quote: "Oversized tee liya tha casual outing ke liye. Ab har weekend ye hi pehenta hu. Comfort level 10/10.",
    author: "Varun P., Lucknow"
  },
  {
    id: 7,
    quote: "Finally a brand that understands Indian weather and still makes hoodies that you actually want to wear. Love the weight of the fabric.",
    author: "Isha G., Chandigarh"
  },
  {
    id: 8,
    quote: "Dost ko gift kiya tha, usne bhi apne liye order kar liya next day. Quality speaks for itself.",
    author: "Aditya V., Indore"
  },
  {
    id: 9,
    quote: "I've been wearing the same black tee for 4 months straight. Still no fading, no pilling. This is my go-to brand now.",
    author: "Meera J., Chennai"
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
      <div 
        className={cn(
          "mb-4 sm:mb-6 h-12 w-12 sm:h-14 sm:w-14 border rounded-none p-2 flex items-center justify-center overflow-hidden",
          isCenter ? "border-snow-white" : "border-jet-black"
        )}
      >
        <img
          src="/assets/profile-icon.svg"
          alt={testimonial.author.split(",")[0]}
          className={cn(
            "w-full h-full object-contain",
            isCenter && "invert"
          )}
        />
      </div>
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
        "relative w-full overflow-hidden bg-snow-white",
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
