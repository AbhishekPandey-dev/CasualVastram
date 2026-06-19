"use client";

import { CategorySplit } from "@/components/sections/CategorySplit";
import { motion } from "framer-motion";

const tshirtItems = [
  {
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    text: "Summer Whites",
  },
  {
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
    text: "Vintage Graphic",
  },
  {
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800",
    text: "Basic Essentials",
  },
  {
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    text: "Oversized Fit",
  },
  {
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    text: "Bold Colors",
  },
  {
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
    text: "Streetwear Drop",
  },
];

export default function TshirtsPage() {
  return (
    <div className="relative w-full h-[calc(100dvh-84px)] overflow-hidden bg-snow-white">
      <CategorySplit items={tshirtItems} bend={3} />
    </div>
  );
}
