
import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import AudioPlayer from '../components/AudioPlayer';
import { trackUserAction } from '../utils/trackUserAction';

const StatusQuestion = () => {
  const navigate = useNavigate();
  
  const handleSelectOption = async (option: string, path: string) => {
    await trackUserAction(`Selected "${option}"`, `Response to relationship status question`);
    navigate(path);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-gradient-to-br from-pink-50 to-blue-50">
      <AudioPlayer />
      
      <QuestionCard 
        question="Are you single or committed?"
        options={[
          {
            text: "Single",
            action: () => handleSelectOption("Single", '/love-confession')
          },
          {
            text: "Committed",
            color: "gray",
            action: () => handleSelectOption("Committed", '/sad')
          }
        ]}
      />
    </div>
  );
};

export default StatusQuestion;
