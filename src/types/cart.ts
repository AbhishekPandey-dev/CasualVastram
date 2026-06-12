import { Product } from "./product";

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}
