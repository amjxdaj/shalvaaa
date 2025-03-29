
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import FloatingHearts from '../components/FloatingHearts';
import AudioPlayer from '../components/AudioPlayer';

const FinalQuestion = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <FloatingHearts />
      <AudioPlayer />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <QuestionCard 
          question="Do YOU LIKE ME??"
          options={[
            {
              text: "Yes",
              color: "green",
              action: () => navigate('/celebration')
            },
            {
              text: "No",
              color: "gray",
              action: () => navigate('/sad')
            }
          ]}
        />
      </motion.div>
    </div>
  );
};

export default FinalQuestion;
