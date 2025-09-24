import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Header = ({ showSlideshow = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow effect for cycling between description and smart discovery card
  useEffect(() => {
    if (showSlideshow) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 2);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [showSlideshow]);

  const slides = [
    {
      id: 0,
      content: (
        <p className="w-[70vw] text-center text-lg">
          Connect with like-minded peers based on your skills and interests.
          Whether you&apos;re looking to collaborate on projects, share knowledge,
          or find study partners, simply enter the skills you&apos;re interested
          in below. Our matching system will help you discover peers who share
          your learning goals and expertise level, making it easier to form
          meaningful connections and grow together in your chosen fields.
        </p>
      )
    },
    {
      id: 1,
      content: (
        <div className="p-6 bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg text-white text-center w-[70vw]">
          <h3 className="text-xl font-semibold mb-4">🚀 Smart Peer Discovery</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-semibold text-green-300">🌟 Fresh Faces</div>
              <div className="opacity-90">New users looking to connect</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-yellow-300">⭐ Top Rated</div>
              <div className="opacity-90">Highly recommended by community</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-300">🎯 Perfect Match</div>
              <div className="opacity-90">Best skill alignment</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-pink-300">🎲 Discover</div>
              <div className="opacity-90">Random picks for diversity</div>
            </div>
          </div>
          <div className="mt-4 text-xs opacity-75 w-full">
            Each set of 5 users is carefully curated using different approaches to give you the best networking experience!
          </div>
        </div>
      )
    }
  ];

  return (
    <div className='flex h-80 w-full flex-col items-center p-10'>
      <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-100 bg-clip-text text-center text-7xl font-bold text-transparent mb-2">
        Welcome to Peer Finder
      </h1>

      {showSlideshow ? (
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-[70vw] flex justify-center">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute transition-all duration-1000 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 transform translate-y-0' 
                    : index < currentSlide 
                      ? 'opacity-0 transform -translate-y-8'
                      : 'opacity-0 transform translate-y-8'
                }`}
              >
                {slide.content}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mb-8 max-w-[70vw] text-center text-lg">
          Connect with like-minded peers based on your skills and interests.
          Whether you&apos;re looking to collaborate on projects, share knowledge,
          or find study partners, simply enter the skills you&apos;re interested
          in below. Our matching system will help you discover peers who share
          your learning goals and expertise level, making it easier to form
          meaningful connections and grow together in your chosen fields.
        </p>
      )}
    </div>
  );
};

Header.propTypes = {
  showSlideshow: PropTypes.bool,
};

export default Header;
