
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PhotoCardProps {
  imageSrc: string;
  onSwipe: () => void;
  isActive: boolean;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ imageSrc, onSwipe, isActive }) => {
  const [swipeDirection, setSwipeDirection] = useState<null | 'left' | 'right'>(null);

  const handleDragEnd = (e: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) { // Threshold for a swipe
      if (info.offset.x > 0) {
        setSwipeDirection('right');
      } else {
        setSwipeDirection('left');
      }
      setTimeout(() => {
        onSwipe();
      }, 300);
    }
  };

  return (
    <motion.div 
      className={`romantic-card photo-card absolute inset-0 ${isActive ? 'z-10' : '-z-10'}`}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={{
        x: swipeDirection === 'left' ? -500 : swipeDirection === 'right' ? 500 : 0,
        rotate: swipeDirection === 'left' ? -20 : swipeDirection === 'right' ? 20 : 0,
        opacity: swipeDirection ? 0 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={imageSrc} 
        alt="Special photo" 
        className="w-full h-full object-cover object-center"
      />
      {isActive && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-white text-lg font-medium px-4 py-2 bg-black/30 backdrop-blur-sm rounded-lg inline-block">
            Swipe to continue
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default PhotoCard;
