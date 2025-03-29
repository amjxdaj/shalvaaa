
import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import FloatingHearts from '../components/FloatingHearts';

const StatusQuestion = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <FloatingHearts />
      
      <QuestionCard 
        question="Are you single or committed?"
        options={[
          {
            text: "Single",
            action: () => navigate('/love-confession')
          },
          {
            text: "Committed",
            color: "gray",
            action: () => navigate('/sad')
          }
        ]}
      />
    </div>
  );
};

export default StatusQuestion;
