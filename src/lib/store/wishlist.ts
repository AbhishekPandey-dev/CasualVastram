import { create } from "zustand";
import { WishlistItem } from "@/types/cart";

export interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.product.id !== id) })),
}));
