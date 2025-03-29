
import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import FloatingHearts from '../components/FloatingHearts';
import AudioPlayer from '../components/AudioPlayer';

const FinalQuestion = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <FloatingHearts />
      <AudioPlayer />
      
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
    </div>
  );
};

export default FinalQuestion;
