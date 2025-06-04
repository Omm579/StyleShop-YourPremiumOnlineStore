import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            StyleShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
            <Link to="/category/men" className="text-gray-700 hover:text-blue-600 transition">Men</Link>
            <Link to="/category/women" className="text-gray-700 hover:text-blue-600 transition">Women</Link>
            <Link to="/category/kids" className="text-gray-700 hover:text-blue-600 transition">Kids</Link>
            <Link to="/category/electronics" className="text-gray-700 hover:text-blue-600 transition">Electronics</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleSearch} className="p-2 text-gray-700 hover:text-blue-600 transition">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="p-2 text-gray-700 hover:text-blue-600 transition">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="p-2 text-gray-700 hover:text-blue-600 transition relative">
              <ShoppingCart size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative group">
                <button className="p-2 text-gray-700 hover:text-blue-600 transition flex items-center">
                  <User size={20} />
                  <span className="ml-2">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Orders</Link>
                  <button onClick={() => logout()} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-gray-700 hover:text-blue-600 transition flex items-center">
                <User size={20} />
                <span className="ml-2">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="p-2 text-gray-700 hover:text-blue-600 transition relative">
              <ShoppingCart size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="p-2 text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 pt-2 pb-4 space-y-4">
            <Link to="/" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/category/men" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Men</Link>
            <Link to="/category/women" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Women</Link>
            <Link to="/category/kids" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Kids</Link>
            <Link to="/category/electronics" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Electronics</Link>
            <div className="pt-2 border-t border-gray-200">
              {user ? (
                <>
                  <div className="py-2 font-medium">Hello, {user.name}</div>
                  <Link to="/profile" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                  <Link to="/orders" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Orders</Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }} 
                    className="block py-2 text-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Login / Register</Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="bg-gray-50 py-4 px-4 transition-all duration-300">
          <div className="container mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="w-full px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;