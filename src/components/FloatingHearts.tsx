
import React from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  // Create an array of heart elements with random positions and sizes
  const hearts = Array.from({ length: 20 }, (_, index) => {
    const size = Math.random() * 20 + 10; // Random size between 10 and 30
    const left = `${Math.random() * 100}%`;
    const top = `${Math.random() * 100}%`;
    const animationDelay = `${Math.random() * 5}s`; // Random delay for floating animation
    const opacity = Math.random() * 0.7 + 0.3; // Random opacity between 0.3 and 1.0
    
    return (
      <Heart
        key={index}
        className="heart"
        style={{
          left,
          top,
          width: size,
          height: size,
          animationDelay,
          opacity
        }}
        fill="#FFCCD5"
        color="#FF8FA3"
      />
    );
  });

  return <div className="floating-hearts">{hearts}</div>;
};

export default FloatingHearts;
