import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, Truck, RefreshCw, ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  
  // Fetch product and related products
  useEffect(() => {
    if (productId) {
      const foundProduct = products.find(p => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
        
        // Reset selections when product changes
        setQuantity(1);
        setSelectedSize(foundProduct.sizes?.[0]);
        setSelectedColor(foundProduct.colors?.[0]);
        
        // Find related products (same category)
        const related = products.filter(p => 
          p.id !== productId && 
          (p.category === foundProduct.category || p.gender === foundProduct.gender)
        ).slice(0, 4);
        
        setRelatedProducts(related);
      }
    }
  }, [productId]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Product not found.</p>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex items-center text-sm">
          <li className="hover:underline">
            <Link to="/">Home</Link>
          </li>
          <ChevronRight size={14} className="mx-2" />
          <li className="hover:underline">
            <Link to={`/category/${product.category}`}>{product.category}</Link>
          </li>
          <ChevronRight size={14} className="mx-2" />
          <li className="text-gray-600 truncate">{product.name}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Images */}
          <div className="md:w-1/2 p-4">
            <div className="mb-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  className={`aspect-square rounded border-2 overflow-hidden ${
                    selectedImage === image ? 'border-blue-600' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2 p-6">
            <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {product.discountedPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">${product.discountedPrice.toFixed(2)}</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  <span className="ml-2 text-sm font-medium text-red-600">
                    {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`
                        h-8 w-8 rounded-full border flex items-center justify-center
                        ${selectedColor === color ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300'}
                      `}
                      style={{ backgroundColor: color === 'white' ? '#ffffff' : color }}
                      aria-label={color}
                    >
                      {selectedColor === color && (
                        <span className={`text-${color === 'white' || color === 'yellow' ? 'black' : 'white'}`}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        px-3 py-1 text-sm border rounded-md min-w-[40px] text-center
                        ${selectedSize === size 
                          ? 'bg-gray-900 text-white border-gray-900' 
                          : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-l-md"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center focus:outline-none"
                  min="1"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-r-md"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center transition duration-300"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
              <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-md transition duration-300">
                Buy Now
              </button>
              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300">
                <Heart size={20} />
              </button>
            </div>
            
            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex">
                <Truck size={18} className="text-gray-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">Free shipping on orders over $50</p>
              </div>
              <div className="flex">
                <RefreshCw size={18} className="text-gray-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-600">30-day easy returns</p>
              </div>
            </div>
            
            {/* Share */}
            <div className="pt-4 flex items-center">
              <span className="text-sm text-gray-600 mr-3">Share:</span>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-blue-600 transition">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;