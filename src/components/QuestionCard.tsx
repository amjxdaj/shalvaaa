
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackUserAction } from '../utils/trackUserAction';

interface QuestionCardProps {
  question: string;
  options: Array<{
    text: string;
    action: () => void;
    color?: string;
  }>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options }) => {
  const handleOptionClick = (option: { text: string; action: () => void }) => {
    // Track the action before executing it
    trackUserAction(`Selected "${option.text}"`, `Response to: "${question}"`);
    // Execute the original action
    option.action();
  };

  return (
    <motion.div
      className="romantic-card p-8 text-center max-w-sm mx-auto bg-white/80 backdrop-blur-md"
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
        className="text-love-600 w-12 h-12 mx-auto mb-4 animate-heartbeat" 
        fill="#FFC2C7" 
        style={{
          filter: "drop-shadow(0 4px 8px rgba(255, 76, 94, 0.4))",
          transform: "translateZ(30px)"
        }}
      />
      <h2 
        className="text-3xl md:text-4xl mb-8 font-montserrat font-bold text-love-800"
        style={{ 
          textShadow: "0 2px 10px rgba(0,0,0,0.05)",
          transform: "translateZ(40px)" 
        }}
      >
        {question}
      </h2>
      <div className="flex flex-col space-y-4">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionClick(option)}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center justify-center px-6 py-4 rounded-full transition-all transform text-white font-bold",
              option.color === "green" ? "bg-gradient-to-r from-green-400 to-green-600" : 
              option.color === "gray" ? "bg-gradient-to-r from-gray-400 to-gray-600" : 
              "bg-gradient-to-r from-love-500 to-love-600"
            )}
            style={{
              transform: `translateZ(${50 + index * 10}px)`,
              boxShadow: option.color === "green" 
                ? "0 15px 30px -8px rgba(74, 222, 128, 0.5)" 
                : option.color === "gray" 
                  ? "0 15px 30px -8px rgba(156, 163, 175, 0.5)"
                  : "0 15px 30px -8px rgba(255, 77, 94, 0.5)",
            }}
          >
            <span className="font-montserrat">{option.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
