import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Calculate discount percentage
  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
    : 0;

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
        {product.onSale && product.discountedPrice && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* Wishlist button */}
      <button 
        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-sm transition duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <Heart size={18} className="text-gray-500 hover:text-red-500 transition duration-300" />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-[3/4] overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
          />
        </div>
        
        {/* Quick add to cart overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <button 
            onClick={handleAddToCart}
            className="bg-white text-gray-900 font-medium py-2 px-4 rounded-full flex items-center gap-2 hover:bg-blue-600 hover:text-white transition duration-300"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm text-gray-700 font-medium line-clamp-1 mb-1 group-hover:text-blue-600 transition duration-300">
            {product.name}
          </h3>
        </Link>

        {/* Brand */}
        <p className="text-xs text-gray-500 mb-2">{product.brand}</p>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center">
          {product.discountedPrice ? (
            <>
              <span className="text-sm font-medium text-gray-900">${product.discountedPrice.toFixed(2)}</span>
              <span className="text-xs text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;