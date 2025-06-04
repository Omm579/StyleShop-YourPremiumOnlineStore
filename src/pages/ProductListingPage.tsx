import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';
import { Product } from '../types';

type SortOption = 'featured' | 'price-low-high' | 'price-high-low' | 'newest' | 'top-rated';

const ProductListingPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique brands from products
  const brands = Array.from(new Set(products.map(product => product.brand)));

  // Filter products based on category and other filters
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (categorySlug) {
      filtered = filtered.filter(product => {
        if (['men', 'women', 'kids'].includes(categorySlug)) {
          return product.gender === categorySlug;
        }
        return product.category === categorySlug;
      });
    }
    
    // Filter by price range
    filtered = filtered.filter(product => {
      const price = product.discountedPrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
        break;
      case 'price-high-low':
        filtered.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
        break;
      case 'newest':
        filtered.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case 'top-rated':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => (a.featured === b.featured) ? 0 : a.featured ? -1 : 1);
    }
    
    setFilteredProducts(filtered);
  }, [categorySlug, sortBy, priceRange, selectedBrands]);

  // Handle brand selection
  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Format category name for display
  const formatCategoryName = (slug?: string) => {
    if (!slug) return 'All Products';
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{formatCategoryName(categorySlug)}</h1>
      
      {/* Mobile filter button */}
      <button 
        className="md:hidden w-full flex items-center justify-between bg-white shadow-sm border p-3 mb-4 rounded-md"
        onClick={() => setShowFilters(!showFilters)}
      >
        <div className="flex items-center">
          <SlidersHorizontal size={18} className="mr-2" />
          <span>Filters</span>
        </div>
        <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </button>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - desktop always visible, mobile toggleable */}
        <aside className={`w-full md:w-64 flex-shrink-0 bg-white rounded-lg shadow-sm p-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Price Range</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">${priceRange[0]}</span>
              <span className="text-sm text-gray-600">${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Brands</h3>
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="rounded text-blue-600 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>
        
        {/* Products */}
        <div className="flex-grow">
          {/* Sort and results count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-sm mb-6">
            <p className="text-sm text-gray-600 mb-2 sm:mb-0">
              Showing <span className="font-medium">{filteredProducts.length}</span> results
            </p>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm mr-2">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm border rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="top-rated">Top Rated</option>
              </select>
            </div>
          </div>
          
          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;