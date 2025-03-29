
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: string;
  options: Array<{
    text: string;
    action: () => void;
    color?: string;
  }>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options }) => {
  return (
    <motion.div
      className="romantic-card p-8 text-center max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heart className="text-love-600 w-12 h-12 mx-auto mb-4 animate-heartbeat" fill="#FFC2C7" />
      <h2 className="text-2xl md:text-3xl mb-8 font-dancing text-love-800">{question}</h2>
      <div className="flex flex-col space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={option.action}
            className={cn(
              "heart-button group", 
              option.color === "green" ? "bg-green-500 hover:bg-green-600" : 
              option.color === "gray" ? "bg-gray-400 hover:bg-gray-500" : 
              "bg-love-600 hover:bg-love-700"
            )}
          >
            <span className="font-playfair">{option.text}</span>
            <Heart 
              className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" 
              fill="#FFF"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
