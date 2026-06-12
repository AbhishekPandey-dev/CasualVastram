import { create } from "zustand";

export interface WishlistState {
  items: any[];
  addItem: (item: any) => void;
  removeItem: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));
