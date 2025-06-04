import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { banners } from '../../data/banners';
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();

const Banner: React.FC = () => {
  const swiperRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Set up swiper parameters
    const swiperEl = swiperRef.current;
    
    if (swiperEl) {
      const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      };

      // Assign Swiper parameters
      Object.assign(swiperEl, swiperParams);

      // Initialize Swiper
      swiperEl.initialize();
    }
  }, []);

  return (
    <div className="relative">
      <swiper-container ref={swiperRef} init="false" class="w-full">
        {banners.map((banner) => (
          <swiper-slide key={banner.id}>
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="container mx-auto px-4 md:px-8">
                  <div className="max-w-lg text-white">
                    <p className="text-sm md:text-base font-medium text-blue-300 mb-2">{banner.subtitle}</p>
                    <h2 className="text-2xl md:text-4xl font-bold mb-3">{banner.title}</h2>
                    <p className="text-sm md:text-base mb-6 text-gray-200">{banner.description}</p>
                    <Link 
                      to={banner.buttonLink} 
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition duration-300"
                    >
                      {banner.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>

      {/* Navigation Buttons */}
      <button className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/60 text-white hover:text-gray-800 p-2 rounded-full transition duration-300 backdrop-blur-sm">
        <ChevronLeft size={24} />
      </button>
      <button className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/60 text-white hover:text-gray-800 p-2 rounded-full transition duration-300 backdrop-blur-sm">
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Banner;