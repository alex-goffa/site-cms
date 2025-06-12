"use client"

import { useState, useEffect } from "react";

export function L4kHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const slides = [
    {
      desktopImage: "/images/learning_for_kidz1.jpg",
      mobileImage: "/images/learning_for_kidz1_mobile.jpg",
      alt: "Learning for Kids Educational Toys"
    },
    {
      desktopImage: "/images/learning_for_kidz2.jpg",
      mobileImage: "/images/learning_for_kidz2_mobile.jpg",
      alt: "Learning Kinetics STEM Activities"
    },
    {
      desktopImage: "/images/learning_for_kidz3.jpg",
      mobileImage: "/images/learning_for_kidz3_mobile.jpg",
      alt: "Creative Minds Art & Craft Supplies"
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setActiveIndex((current) => 
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((current) => 
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="relative w-full max-w-[screen]">
      {/* Container with responsive height - mobile: 300px, desktop: 550px */}
      <div className="relative h-[300px] sm:h-[492px] md:h-[550px] overflow-hidden max-w-[100%]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-700 ease-in-out transform ${
              index === activeIndex 
                ? 'translate-x-0 opacity-100' 
                : index < activeIndex
                  ? '-translate-x-full opacity-0'
                  : 'translate-x-full opacity-0'
            }`}
          >
            {/* Desktop Image */}
            <img 
              src={slide.desktopImage}
              className="absolute hidden md:block w-full h-full object-center"
              alt={slide.alt}
            />
            {/* Mobile Image */}
            <img 
              src={slide.mobileImage}
              className="absolute lg:hidden w-full h-full object-cover"
              alt={slide.alt}
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button 
        type="button" 
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none px-2 sm:px-3 md:px-4" 
        onClick={handlePrevious}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none backdrop-blur-sm">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* Next Button */}
      <button 
        type="button" 
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none px-2 sm:px-3 md:px-4" 
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none backdrop-blur-sm">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>

      {/* Indicators */}
      <div className="absolute z-30 flex space-x-2 -translate-x-1/2 bottom-3 left-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
} 
