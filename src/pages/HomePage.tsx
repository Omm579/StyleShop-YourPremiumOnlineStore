import React from 'react';
import Banner from '../components/home/Banner';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoSection from '../components/home/PromoSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <FeaturedProducts />
      <PromoSection />
    </div>
  );
};

export default HomePage;