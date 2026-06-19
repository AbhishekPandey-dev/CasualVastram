"use client";

import { CategorySplit } from "@/components/sections/CategorySplit";
import { motion } from "framer-motion";

const tshirtItems = [
  { image: "/assets/example-img/full-tshirt.png" },
  { image: "/assets/example-img/half-tshirt.png" },
  { image: "/assets/example-img/full-tshirt.png" },
  { image: "/assets/example-img/half-tshirt.png" },
  { image: "/assets/example-img/full-tshirt.png" },
  { image: "/assets/example-img/half-tshirt.png" },
];

import { InstagramPromo } from "@/components/ui/instagram-promo";

export default function TshirtsPage() {
  return (
    <main>
      <div className="relative w-full h-[calc(100dvh-84px)] overflow-hidden bg-snow-white">
        <CategorySplit items={tshirtItems} bend={3} />
      </div>
      <section>
        <InstagramPromo />
      </section>
    </main>
  );
}
