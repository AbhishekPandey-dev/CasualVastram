"use client";

import React, { useRef, useState } from 'react';
import { InstagramIcon, type InstagramIconHandle } from '@/components/ui/animated-instagram-icon';
import { motion, AnimatePresence } from 'framer-motion';

export interface InstagramItem {
  id: number;
  imageUrl: string;
  alt: string;
}

const INSTAGRAM_DATA: InstagramItem[] = [{
  id: 1,
  imageUrl: "https://materia-streetwear-demo2.myshopify.com/cdn/shop/files/2ed7f8bfefbd951a333d91a9c6955cd1_71d83448-9220-4690-a21b-27b362497949_500x.jpg?v=1760176837",
  alt: "Streetwear aesthetic showcase 1"
}, {
  id: 2,
  imageUrl: "https://materia-streetwear-demo2.myshopify.com/cdn/shop/files/4ad79cfb49119e1ebea18beb3fd74110_6c12d863-ca25-4acf-8826-fc755bbbf088_500x.png?v=1760176894",
  alt: "Streetwear aesthetic showcase 2"
}, {
  id: 3,
  imageUrl: "https://materia-streetwear-demo2.myshopify.com/cdn/shop/files/38e3c59d66d89d9f409a79a3dcb1c3f0_c9e046bf-3aac-4d11-9566-c9da733b9466_500x.png?v=1760176915",
  alt: "Streetwear aesthetic showcase 3"
}, {
  id: 4,
  imageUrl: "https://materia-streetwear-demo2.myshopify.com/cdn/shop/files/fa3ba1e49d42dfabf7feffdd26fe4a73_e5f81f25-7fc6-4873-9b39-a5bbf9edc8d9_500x.png?v=1760176894",
  alt: "Streetwear aesthetic showcase 4"
}];

const PromoCard = ({ item }: { item: InstagramItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef<InstagramIconHandle>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Programmatically trigger the animateicons animation
    iconRef.current?.startAnimation?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    iconRef.current?.stopAnimation?.();
  };

  return (
    <motion.a 
      href="https://www.instagram.com/Casualvastram"
      target="_blank"
      rel="noopener noreferrer"
      className="relative h-full shrink-0 aspect-[3/4] snap-center cursor-pointer overflow-hidden bg-bg-subtle block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image with subtle pan effect on hover */}
      <motion.img 
        src={item.imageUrl} 
        alt={item.alt} 
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full object-cover origin-center" 
      />
      
      {/* Darkening Veil */}
      <motion.div 
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 bg-jet-black/30 pointer-events-none" 
      />

      {/* Centered Minimalist Instagram Icon */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* isAnimated={false} disables direct hover so we can trigger it programmatically via parent card hover */}
            <InstagramIcon ref={iconRef} size={56} color="#FEFDFB" isAnimated={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

export const InstagramPromo: React.FC = () => {
  return (
    <section className="w-full bg-snow-white h-[calc(100vh-56px)] py-6 md:py-10 flex flex-col items-center justify-between overflow-hidden">
      <div className="max-w-7xl w-full px-4 text-center shrink-0">
        <h2 className="text-2xl md:text-4xl font-bold text-jet-black mb-2 uppercase tracking-tight font-syne">
          Follow us on Instagram
        </h2>
        <p className="text-xs md:text-sm text-graphite-gray mb-4 md:mb-6 max-w-2xl mx-auto font-inter uppercase tracking-wider">
          Join the community @casualvastram and tag us to get featured.
        </p>
      </div>

      <div className="w-full flex-1 min-h-0 flex items-center justify-start overflow-hidden px-4 md:px-8">
        {/* Horizontal Filmstrip Layout */}
        <div className="flex flex-nowrap gap-4 md:gap-6 h-[85%] max-h-[60vh] w-full overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scroll items-center md:justify-center">
          {INSTAGRAM_DATA.map(item => (
            <PromoCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-4 md:mt-6 shrink-0">
        <motion.a 
          href="https://www.instagram.com/Casualvastram" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-pure-white border border-jet-black text-jet-black hover:bg-jet-black hover:text-snow-white font-bold rounded-none transition-colors duration-300 text-sm font-inter uppercase tracking-[0.1em]" 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
        >
          @casualvastram
        </motion.a>
      </div>

      {/* Local styles for hiding scrollbar reliably across all browsers */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
          .hide-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
      }} />
    </section>
  );
};
