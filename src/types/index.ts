export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  gender?: 'men' | 'women' | 'kids';
  brand: string;
  images: string[];
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
  onSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  photoURL?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}