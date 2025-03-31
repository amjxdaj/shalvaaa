
import React from 'react';
import { motion } from 'framer-motion';

interface Option {
  text: string;
  action: () => void;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options }) => {
  return (
    <motion.div 
      className="romantic-card p-8 text-center max-w-sm mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl mb-6 font-semibold text-gray-800">{question}</h2>
      <div className="flex justify-center space-x-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={option.action}
            className="px-6 py-3 rounded-full transition-all duration-300 
              bg-primary text-primary-foreground hover:bg-primary/90 
              shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            {option.text}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
