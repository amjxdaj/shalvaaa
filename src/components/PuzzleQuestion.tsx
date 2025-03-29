
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface PuzzleQuestionProps {
  onSolve: () => void;
}

const PuzzleQuestion: React.FC<PuzzleQuestionProps> = ({ onSolve }) => {
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState(false);
  const [attempt, setAttempt] = useState(false);
  const correctAnswer = "heart";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempt(true);
    
    if (answer.toLowerCase().trim() === correctAnswer) {
      onSolve();
    }
  };

  const showHint = () => {
    setHint(true);
  };

  return (
    <motion.div
      className="romantic-card p-8 text-center max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heart className="text-love-600 w-12 h-12 mx-auto mb-4 animate-heartbeat" fill="#FFC2C7" />
      
      <h2 className="text-2xl md:text-3xl mb-6 font-dancing text-love-800">Solve This Riddle</h2>
      
      <p className="text-lg mb-6 font-playfair text-love-700">
        I'm the symbol of love, I can break and I can heal. I can be given but never bought. What am I?
      </p>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer"
          className="w-full px-4 py-2 rounded-lg border border-love-300 focus:outline-none focus:ring-2 focus:ring-love-500 mb-4 font-playfair"
        />
        
        <button
          type="submit"
          className="heart-button group w-full"
        >
          <span className="font-playfair">Check Answer</span> 
          <Heart 
            className="ml-2 w-5 h-5 group-hover:scale-125 transition-transform" 
            fill="#FFF"
          />
        </button>
      </form>
      
      {attempt && answer.toLowerCase().trim() !== correctAnswer && (
        <p className="text-red-500 mb-4 font-playfair">
          That's not correct. Try again!
        </p>
      )}
      
      <button
        onClick={showHint}
        className="text-love-600 underline font-playfair"
      >
        Need a hint?
      </button>
      
      {hint && (
        <p className="mt-4 text-love-500 italic font-playfair">
          It's something that beats inside your chest.
        </p>
      )}
    </motion.div>
  );
};

export default PuzzleQuestion;
