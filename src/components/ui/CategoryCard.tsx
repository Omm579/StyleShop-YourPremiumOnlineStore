import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="absolute bottom-0 w-full p-4">
            <h3 className="text-white text-xl font-bold">{category.name}</h3>
            <p className="text-white/80 text-sm mt-1 group-hover:translate-x-2 transition-transform duration-300">
              Shop Now →
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;