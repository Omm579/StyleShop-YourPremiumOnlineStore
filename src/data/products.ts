import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    description: 'Ultra-soft premium cotton t-shirt with a comfortable fit. Perfect for everyday wear and versatile styling options.',
    price: 29.99,
    discountedPrice: 24.99,
    rating: 4.5,
    reviewCount: 123,
    category: 'tshirts',
    gender: 'men',
    brand: 'StyleBasics',
    images: [
      'https://images.pexels.com/photos/5868741/pexels-photo-5868741.jpeg',
      'https://images.pexels.com/photos/5868739/pexels-photo-5868739.jpeg',
      'https://images.pexels.com/photos/5868738/pexels-photo-5868738.jpeg'
    ],
    colors: ['black', 'white', 'navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    onSale: true
  },
  {
    id: '2',
    name: 'Classic Denim Jeans',
    description: 'Classic straight-cut denim jeans with a timeless design. Made from high-quality denim fabric for durability and comfort.',
    price: 59.99,
    rating: 4.3,
    reviewCount: 89,
    category: 'jeans',
    gender: 'men',
    brand: 'DenimCo',
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
    ],
    colors: ['blue', 'black'],
    sizes: ['30', '32', '34', '36'],
    inStock: true
  },
  {
    id: '3',
    name: 'Floral Summer Dress',
    description: 'Beautiful floral summer dress made from lightweight fabric. Perfect for warm days and special occasions.',
    price: 49.99,
    discountedPrice: 39.99,
    rating: 4.7,
    reviewCount: 156,
    category: 'dresses',
    gender: 'women',
    brand: 'ElegantStyles',
    images: [
      'https://images.pexels.com/photos/5560023/pexels-photo-5560023.jpeg',
      'https://images.pexels.com/photos/5560024/pexels-photo-5560024.jpeg'
    ],
    colors: ['floral', 'red', 'blue'],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    featured: true,
    onSale: true
  },
  {
    id: '4',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless Bluetooth headphones with noise cancellation technology. Enjoy premium sound quality and comfort.',
    price: 129.99,
    rating: 4.6,
    reviewCount: 203,
    category: 'electronics',
    brand: 'SoundPro',
    images: [
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
      'https://images.pexels.com/photos/3780680/pexels-photo-3780680.jpeg'
    ],
    colors: ['black', 'white', 'rose gold'],
    inStock: true,
    featured: true,
    isNew: true
  },
  {
    id: '5',
    name: 'Kids Cartoon Print T-Shirt',
    description: 'Fun cartoon print t-shirt for kids. Made from soft, comfortable cotton that\'s gentle on the skin.',
    price: 19.99,
    discountedPrice: 14.99,
    rating: 4.8,
    reviewCount: 75,
    category: 'tshirts',
    gender: 'kids',
    brand: 'KidsFun',
    images: [
      'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg',
      'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg'
    ],
    colors: ['blue', 'red', 'yellow'],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    inStock: true,
    onSale: true
  },
  {
    id: '6',
    name: 'Women\'s Running Shoes',
    description: 'Lightweight, cushioned running shoes designed for comfort and performance. Perfect for running or everyday wear.',
    price: 89.99,
    rating: 4.4,
    reviewCount: 112,
    category: 'shoes',
    gender: 'women',
    brand: 'SportFlex',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg'
    ],
    colors: ['pink', 'black', 'grey'],
    sizes: ['6', '7', '8', '9', '10'],
    inStock: true,
    isNew: true
  },
  {
    id: '7',
    name: 'Smart Watch with Heart Rate Monitor',
    description: 'Advanced smartwatch with heart rate monitor, sleep tracking, and notification alerts. Stay connected and monitor your health.',
    price: 199.99,
    discountedPrice: 169.99,
    rating: 4.5,
    reviewCount: 187,
    category: 'electronics',
    brand: 'TechFit',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg'
    ],
    colors: ['black', 'silver'],
    inStock: true,
    featured: true,
    onSale: true
  },
  {
    id: '8',
    name: 'Men\'s Formal Suit',
    description: 'Classic men\'s formal suit with a modern fit. Made from high-quality materials for a sophisticated look.',
    price: 199.99,
    rating: 4.7,
    reviewCount: 65,
    category: 'formalwear',
    gender: 'men',
    brand: 'ElegantMen',
    images: [
      'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg',
      'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg'
    ],
    colors: ['navy', 'black', 'grey'],
    sizes: ['38', '40', '42', '44'],
    inStock: true,
    featured: true
  }
];