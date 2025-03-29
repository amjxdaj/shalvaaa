
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import MessageCard from '../components/MessageCard';
import FloatingHearts from '../components/FloatingHearts';
import AudioPlayer from '../components/AudioPlayer';

const LoveConfession = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <FloatingHearts />
      <AudioPlayer />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="romantic-card p-8 text-center max-w-sm mx-auto shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          transform: "translateZ(20px)",
          boxShadow: "0px 20px 40px -10px rgba(0, 0, 0, 0.4)"
        }}
      >
        <Heart className="text-love-600 w-16 h-16 mx-auto mb-6 animate-heartbeat" fill="#FFC2C7" />
        <h1 className="text-4xl mb-6 text-love-800">I LOVE YOUUU!!😭🥹❤️</h1>
        
        <button
          onClick={() => navigate('/final-question')}
          className="heart-button group w-full shadow-xl hover:-translate-y-1 transition-all duration-300"
          style={{ transform: "translateZ(30px)" }}
        >
          <span>Continue</span>
          <Heart 
            className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" 
            fill="#FFF"
          />
        </button>
      </motion.div>
    </div>
  );
};

export default LoveConfession;
