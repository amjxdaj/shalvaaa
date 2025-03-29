
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface MessageCardProps {
  message: string;
  onContinue: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onContinue }) => {
  return (
    <motion.div
      className="romantic-card p-8 text-center max-w-sm mx-auto flex flex-col items-center justify-center bg-white/80 backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transform: "translateZ(20px)",
        boxShadow: "0px 20px 40px -5px rgba(0, 0, 0, 0.2)",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.5)"
      }}
      whileHover={{
        transform: "translateZ(30px) scale(1.03)",
        transition: { duration: 0.2 }
      }}
    >
      <Heart 
        className="text-love-600 w-12 h-12 mb-4 animate-heartbeat" 
        fill="#FFC2C7" 
        style={{
          filter: "drop-shadow(0 4px 8px rgba(255, 76, 94, 0.4))",
          transform: "translateZ(30px)"
        }}
      />
      <h2 
        className="text-3xl md:text-4xl mb-6 font-montserrat font-bold text-love-800"
        style={{ 
          textShadow: "0 2px 10px rgba(0,0,0,0.05)",
          transform: "translateZ(40px)" 
        }}
      >
        {message}
      </h2>
      <button
        onClick={onContinue}
        className="heart-button group bg-gradient-to-r from-love-500 to-love-600 hover:from-love-600 hover:to-love-700"
        style={{ 
          transform: "translateZ(50px)",
          boxShadow: "0 15px 30px -8px rgba(255, 77, 94, 0.5)",
          borderRadius: "50px",
          transition: "all 0.3s ease"
        }}
      >
        <span className="font-montserrat font-bold">Continue</span> 
        <Heart 
          className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" 
          fill="#FFF"
        />
      </button>
    </motion.div>
  );
};

export default MessageCard;
