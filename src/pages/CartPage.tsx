import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  
  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
              <div className="col-span-6 font-medium text-gray-700">Product</div>
              <div className="col-span-2 font-medium text-gray-700">Price</div>
              <div className="col-span-2 font-medium text-gray-700">Quantity</div>
              <div className="col-span-2 font-medium text-gray-700 text-right">Total</div>
            </div>
            
            {/* Cart Items */}
            {cart.items.map((item) => (
              <div 
                key={`${item.product.id}-${item.size}-${item.color}`} 
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center"
              >
                {/* Product */}
                <div className="md:col-span-6 flex items-center">
                  <div className="w-20 h-20 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="ml-4">
                    <Link to={`/product/${item.product.id}`} className="font-medium text-gray-900 hover:text-blue-600 transition">
                      {item.product.name}
                    </Link>
                    {(item.size || item.color) && (
                      <div className="text-sm text-gray-600 mt-1">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.size && item.color && <span className="mx-1">|</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                    )}
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-sm text-red-600 hover:text-red-800 flex items-center mt-2 md:hidden"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
                
                {/* Price */}
                <div className="md:col-span-2 flex items-center justify-between">
                  <span className="md:hidden font-medium text-gray-700">Price:</span>
                  <span className="text-gray-900">
                    ${(item.product.discountedPrice || item.product.price).toFixed(2)}
                  </span>
                </div>
                
                {/* Quantity */}
                <div className="md:col-span-2 flex items-center justify-between">
                  <span className="md:hidden font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-l-md"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product.id, Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-10 h-8 border-t border-b border-gray-300 text-center focus:outline-none"
                      min="1"
                    />
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 flex items-center justify-center rounded-r-md"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Total */}
                <div className="md:col-span-2 flex items-center justify-between">
                  <span className="md:hidden font-medium text-gray-700">Total:</span>
                  <div className="flex items-center justify-end">
                    <span className="text-gray-900 font-medium">
                      ${((item.product.discountedPrice || item.product.price) * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="ml-4 text-gray-500 hover:text-red-600 hidden md:block"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Continue Shopping */}
          <div className="mt-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
            >
              <ShoppingBag size={16} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${cart.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {cart.totalPrice >= 50 ? 'Free' : '$5.00'}
                </span>
              </div>
              {cart.totalPrice < 50 && (
                <div className="text-sm text-gray-600">
                  Add ${(50 - cart.totalPrice).toFixed(2)} more to qualify for free shipping
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-lg">
                  ${(cart.totalPrice + (cart.totalPrice >= 50 ? 0 : 5)).toFixed(2)}
                </span>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center transition duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;