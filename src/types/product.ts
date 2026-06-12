export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: "hoodie" | "t-shirt";
  subCategory?: string;
  images: string[];
  sizes: string[];
  inStock: boolean;
  createdAt: string;
}
