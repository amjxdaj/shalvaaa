
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import { trackUserAction } from '../utils/trackUserAction';

interface IndexProps {
  playAudio?: () => void;
}

const Index: React.FC<IndexProps> = ({ playAudio }) => {
  const navigate = useNavigate();

  const handleStart = async () => {
    // Track user action
    await trackUserAction('Started journey', 'From landing page');
    
    // Play music if the function is provided
    if (playAudio) {
      playAudio();
    }
    
    navigate('/photos');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <AudioPlayer />
      
      <motion.div
        className="romantic-card p-8 text-center max-w-sm mx-auto z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          transform: "translateZ(20px)",
          boxShadow: "0px 15px 35px -5px rgba(0, 0, 0, 0.25)",
        }}
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Heart 
            className="text-love-600 w-16 h-16 mx-auto three-d-card" 
            fill="#FFC2C7" 
            style={{ filter: "drop-shadow(0 8px 12px rgba(255, 76, 94, 0.4))" }}
          />
        </motion.div>
        
        <h1 className="text-4xl mb-6 font-montserrat font-bold text-love-800">
          For Someone Special
        </h1>
        <p className="mb-8 text-love-700">
          I've created something just for you. Tap below to begin your journey...
        </p>
        
        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="heart-button group"
            style={{ 
              transform: "translateZ(10px)", 
              boxShadow: "0 10px 25px -5px rgba(255, 77, 94, 0.4)",
              transition: "all 0.3s ease"
            }}
          >
            <span>Begin</span>
            <Heart 
              className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" 
              fill="#FFF"
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
