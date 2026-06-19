"use client";

import { CategorySplit } from "@/components/sections/CategorySplit";
import { motion } from "framer-motion";

const tshirtItems = [
  { image: "/assets/example-img/full-tshirt.png", category: "View All T-Shirts", buttonText: "Explore Collection", buttonLink: "/collection/all-tshirts" },
  { image: "/assets/example-img/half-tshirt.png", category: "Solids", buttonText: "Explore Solids", buttonLink: "/collection/solids" },
  { image: "/assets/example-img/full-tshirt.png", category: "Indian Mythology", buttonText: "Explore Mythology", buttonLink: "/collection/indian-mythology" },
  { image: "/assets/example-img/half-tshirt.png", category: "Futuristic", buttonText: "Explore Futuristic", buttonLink: "/collection/futuristic" },
  { image: "/assets/example-img/full-tshirt.png", category: "Minimal", buttonText: "Explore Minimal", buttonLink: "/collection/minimal" },
  { image: "/assets/example-img/half-tshirt.png", category: "Typography", buttonText: "Explore Typography", buttonLink: "/collection/typography" },
  { image: "/assets/example-img/full-tshirt.png", category: "Anime Art", buttonText: "Explore Anime", buttonLink: "/collection/anime-art" },
  { image: "/assets/example-img/half-tshirt.png", category: "Nature Love", buttonText: "Explore Nature", buttonLink: "/collection/nature-love" },
  { image: "/assets/example-img/full-tshirt.png", category: "Vintage", buttonText: "Explore Vintage", buttonLink: "/collection/vintage" },
  { image: "/assets/example-img/half-tshirt.png", category: "Desi Humor", buttonText: "Explore Humor", buttonLink: "/collection/desi-humor" },
  { image: "/assets/example-img/full-tshirt.png", category: "Astrology", buttonText: "Explore Astrology", buttonLink: "/collection/astrology" },
];

import { InstagramPromo } from "@/components/ui/instagram-promo";

export default function TshirtsPage() {
  return (
    <main>
      <div className="relative w-full h-[calc(100dvh-84px)] overflow-hidden bg-snow-white">
        <CategorySplit 
          className="h-full w-full bg-snow-white"
          items={tshirtItems}
          bend={1}
          borderRadius={0}
          scrollEase={0.025}
          scrollSpeed={1.5}
        />
      </div>
      <section>
        <InstagramPromo />
      </section>
    </main>
  );
}
