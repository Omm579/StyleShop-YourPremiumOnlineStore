import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, RefreshCw, ShieldCheck } from 'lucide-react';

const PromoSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Truck className="text-blue-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">On all orders over $50</p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <RefreshCw className="text-blue-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy</p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="text-blue-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">Protected by industry leaders</p>
          </div>
        </div>
        
        {/* Special Offers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-lg overflow-hidden group">
            <img 
              src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg" 
              alt="Men's Collection" 
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Men's Collection</h3>
                <p className="mb-4">New arrivals for the season</p>
                <Link 
                  to="/category/men" 
                  className="inline-block bg-white text-gray-900 font-medium px-4 py-2 rounded transition duration-300 hover:bg-blue-600 hover:text-white"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden group">
            <img 
              src="https://images.pexels.com/photos/5560023/pexels-photo-5560023.jpeg" 
              alt="Women's Collection" 
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Women's Collection</h3>
                <p className="mb-4">Summer styles on sale</p>
                <Link 
                  to="/category/women" 
                  className="inline-block bg-white text-gray-900 font-medium px-4 py-2 rounded transition duration-300 hover:bg-blue-600 hover:text-white"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;