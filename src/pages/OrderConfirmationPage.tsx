import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  // Generate random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Calculate estimated delivery date (5-7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3));
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We've received your order and are preparing it for shipment.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Package size={20} className="text-blue-600 mr-2" />
              <h2 className="text-lg font-bold">Order Details</h2>
            </div>
            
            <div className="text-left">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order Number:</p>
                  <p className="font-medium">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date:</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <Truck size={20} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Shipping Information</p>
                  <p className="text-sm text-gray-600">
                    Your order will be shipped to the address you provided during checkout.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar size={20} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-sm text-gray-600">
                    Your order should arrive by <span className="font-medium">{formattedDeliveryDate}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shipping Progress */}
          <div className="mb-8">
            <div className="relative">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-1/4"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <div className="text-green-600 font-medium">Order Placed</div>
                <div>Processing</div>
                <div>Shipped</div>
                <div>Delivered</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
            >
              Continue Shopping
            </Link>
            <button className="block w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-md transition duration-300">
              View Order Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;