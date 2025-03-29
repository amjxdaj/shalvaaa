
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PhotoCardProps {
  imageSrc: string;
  onSwipe: () => void;
  isActive: boolean;
  index: number;
  isScattered?: boolean;
  scatterPosition?: {x: number, y: number, rotate: number};
}

const PhotoCard: React.FC<PhotoCardProps> = ({ 
  imageSrc, 
  onSwipe, 
  isActive, 
  index, 
  isScattered = false,
  scatterPosition
}) => {
  const [swipeDirection, setSwipeDirection] = useState<null | 'left' | 'right'>(null);

  const handleDragEnd = (e: any, info: any) => {
    if (Math.abs(info.offset.x) > 50 || Math.abs(info.offset.y) > 50) { // Lowered threshold for swipe
      setSwipeDirection(info.offset.x > 0 ? 'right' : 'left');
      setTimeout(() => {
        onSwipe();
      }, 300);
    }
  };

  const handleTap = () => {
    if (isActive) {
      setSwipeDirection('right');
      setTimeout(() => {
        onSwipe();
      }, 300);
    }
  };

  if (isScattered && scatterPosition) {
    return (
      <motion.div 
        className="romantic-card photo-card absolute shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: scatterPosition.x, 
          y: scatterPosition.y, 
          rotate: scatterPosition.rotate,
          zIndex: 5 + index
        }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15, 
          delay: index * 0.1 
        }}
        style={{ 
          width: "80px", 
          height: "120px",
          position: "absolute",
          top: "calc(50% - 150px)",
          left: "calc(50% - 40px)",
          boxShadow: "0px 10px 25px -5px rgba(0, 0, 0, 0.45)"
        }}
      >
        <img 
          src={imageSrc} 
          alt="Special photo" 
          className="w-full h-full object-cover object-center rounded-lg"
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`romantic-card photo-card absolute inset-0 ${isActive ? 'z-10' : '-z-10'} transform-gpu`}
      drag={isActive ? true : false} // Allow drag in all directions
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      onClick={handleTap}
      animate={{
        x: swipeDirection === 'left' ? -500 : swipeDirection === 'right' ? 500 : 0,
        y: swipeDirection ? -100 : 0,
        rotate: swipeDirection === 'left' ? -20 : swipeDirection === 'right' ? 20 : 0,
        opacity: swipeDirection ? 0 : 1,
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, boxShadow: "0px 15px 30px -5px rgba(0, 0, 0, 0.5)" }}
      style={{
        transformStyle: "preserve-3d", 
        perspective: "1000px",
        boxShadow: "0px 10px 25px -5px rgba(0, 0, 0, 0.3)"
      }}
    >
      <img 
        src={imageSrc} 
        alt="Special photo" 
        className="w-full h-full object-cover object-center rounded-lg"
      />
      {isActive && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-white text-lg font-medium px-4 py-2 bg-black/30 backdrop-blur-sm rounded-lg inline-block">
            Tap or swipe
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default PhotoCard;
