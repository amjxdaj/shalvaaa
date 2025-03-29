
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const Celebration: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  useEffect(() => {
    // Trigger confetti when component mounts
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50;
      
      // Since we're using default confetti settings, we just trigger multiple shots
      confetti({
        particleCount,
        origin: { x: randomInRange(0.2, 0.3), y: randomInRange(0.5, 0.6) },
        colors: ['#ff9a9e', '#ff6a88', '#ffc3a0', '#ffafbd']
      });
      confetti({
        particleCount,
        origin: { x: randomInRange(0.7, 0.8), y: randomInRange(0.5, 0.6) },
        colors: ['#ff9a9e', '#ff6a88', '#ffc3a0', '#ffafbd']
      });
    }, 250);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div 
      className="romantic-card p-8 text-center max-w-sm mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transform: "translateZ(20px)",
        boxShadow: "0px 20px 40px -10px rgba(0, 0, 0, 0.4)"
      }}
    >
      <div className="flex justify-center mb-6">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ 
              y: [0, -10, 0],
              rotateY: [0, 10, 0]
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: i * 0.1
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Heart 
              className="text-love-600 w-8 h-8 mx-1" 
              fill="#FFC2C7" 
              style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))" }}
            />
          </motion.div>
        ))}
      </div>
      
      <h1 className="text-4xl mb-6 text-love-800">الحمد لله</h1>
      <p className="text-xl mb-8">You've made me the happiest person!</p>
      
      <div className="flex justify-center">
        <button
          onClick={onContinue}
          className="heart-button bg-love-600 hover:bg-love-700 group shadow-xl hover:-translate-y-1 transition-all duration-300"
          style={{ transform: "translateZ(30px)" }}
        >
          <span>DM</span>
          <Heart 
            className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" 
            fill="#FFF"
          />
        </button>
      </div>
    </motion.div>
  );
};

export default Celebration;
