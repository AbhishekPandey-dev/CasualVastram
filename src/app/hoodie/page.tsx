"use client";

import { CategorySplit } from "@/components/sections/CategorySplit";
import { motion } from "framer-motion";

const hoodieItems = [
  { image: "/assets/example-img/hoodie.png" },
  { image: "/assets/example-img/hoodie.png" },
  { image: "/assets/example-img/hoodie.png" },
  { image: "/assets/example-img/hoodie.png" },
  { image: "/assets/example-img/hoodie.png" },
  { image: "/assets/example-img/hoodie.png" },
];

import { InstagramPromo } from "@/components/ui/instagram-promo";

export default function HoodiesPage() {
  return (
    <main>
      <div className="relative w-full h-[calc(100dvh-84px)] overflow-hidden bg-snow-white">
        <CategorySplit items={hoodieItems} bend={3} />
      </div>
      <section>
        <InstagramPromo />
      </section>
    </main>
  );
}
