
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
      className="romantic-card p-8 text-center max-w-sm mx-auto flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heart className="text-love-600 w-12 h-12 mb-4 animate-heartbeat" fill="#FFC2C7" />
      <h2 className="text-2xl md:text-3xl mb-6 font-dancing text-love-800">{message}</h2>
      <button
        onClick={onContinue}
        className="heart-button group"
      >
        <span>Continue</span> 
        <Heart 
          className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" 
          fill="#FFF"
        />
      </button>
    </motion.div>
  );
};

export default MessageCard;
