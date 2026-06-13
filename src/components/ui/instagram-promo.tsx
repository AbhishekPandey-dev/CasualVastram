"use client";

import React, { useRef, useState } from 'react';
import { InstagramIcon } from '@animateicons/react/lucide';
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
  const iconRef = useRef<any>(null);

  React.useEffect(() => {
    if (isHovered) {
      iconRef.current?.startAnimation?.();
    } else {
      iconRef.current?.stopAnimation?.();
    }
  }, [isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.a 
      href="https://www.instagram.com/Casualvastram"
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full h-full aspect-[3/4] cursor-pointer overflow-hidden bg-bg-subtle block shadow-sm"
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
      <motion.div 
        initial={false}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.5 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <InstagramIcon ref={iconRef} size={56} color="#FEFDFB" isAnimated={false} />
      </motion.div>
    </motion.a>
  );
};

export const InstagramPromo: React.FC = () => {
  return (
    <section className="w-full bg-snow-white py-12 md:py-20 flex flex-col items-center overflow-hidden">
      <div className="max-w-7xl w-full px-4 text-center shrink-0 mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-jet-black mb-3 md:mb-4 uppercase tracking-tight font-syne">
          Follow us on Instagram
        </h2>
        <p className="text-base md:text-lg text-graphite-gray max-w-2xl mx-auto font-inter uppercase tracking-wider">
          Join the community @casualvastram and tag us to get featured.
        </p>
      </div>

      <div className="w-full px-6 sm:px-12 md:px-8 max-w-5xl lg:max-w-7xl mx-auto">
        {/* Responsive Instagram Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 w-full">
          {INSTAGRAM_DATA.map(item => (
            <PromoCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-10 md:mt-16 shrink-0">
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
    </section>
  );
};
