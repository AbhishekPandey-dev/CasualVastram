"use client";

import { CategorySplit } from "@/components/sections/CategorySplit";
import { motion } from "framer-motion";

const hoodieItems = [
  {
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    text: "Urban Classic",
  },
  {
    image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&q=80&w=800",
    text: "Cozy Essentials",
  },
  {
    image: "https://images.unsplash.com/photo-1578587018452-892bace94f04?auto=format&fit=crop&q=80&w=800",
    text: "Street Vibe",
  },
  {
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    text: "Winter Warmth",
  },
  {
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    text: "Signature Print",
  },
  {
    image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&q=80&w=800",
    text: "Minimalist Edit",
  },
];

export default function HoodiesPage() {
  return (
    <div className="relative w-full h-[calc(100dvh-84px)] overflow-hidden bg-snow-white">
      <CategorySplit items={hoodieItems} bend={3} />
    </div>
  );
}
