
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuestionCard from '../components/QuestionCard';
import FloatingHearts from '../components/FloatingHearts';
import AudioPlayer from '../components/AudioPlayer';

const FinalQuestion = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100">
      <FloatingHearts />
      <AudioPlayer />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <QuestionCard 
          question="DO YOU LIKE ME😭??"
          options={[
            {
              text: "Yes",
              action: () => navigate('/celebration')
            },
            {
              text: "No",
              action: () => navigate('/sad')
            }
          ]}
        />
      </motion.div>
    </div>
  );
};

export default FinalQuestion;
