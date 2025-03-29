
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import FloatingHearts from '../components/FloatingHearts';

const Index = () => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    navigate('/photos');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingHearts />
      
      <motion.div
        className="romantic-card p-8 text-center max-w-sm mx-auto z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <Heart className="text-love-600 w-16 h-16 mx-auto" fill="#FFC2C7" />
        </motion.div>
        
        <h1 className="text-4xl mb-6 font-dancing text-love-800">For Someone Special</h1>
        <p className="mb-8 text-love-700">
          I've created something just for you. Tap below to begin your journey...
        </p>
        
        <button
          onClick={handleStart}
          className="heart-button group"
        >
          <span>Begin</span>
          <Heart 
            className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" 
            fill="#FFF"
          />
        </button>
      </motion.div>
    </div>
  );
};

export default Index;
