
import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import AudioPlayer from '../components/AudioPlayer';
import { trackUserAction } from '../utils/trackUserAction';
import { toast } from 'sonner';

const StatusQuestion = () => {
  const navigate = useNavigate();
  
  const handleSelectOption = async (option: string, path: string) => {
    try {
      console.log(`User selected option: ${option}, navigating to ${path}`);
      await trackUserAction(`Selected "${option}"`, `Response to relationship status question`);
      navigate(path);
    } catch (error) {
      console.error("Error tracking user selection:", error);
      toast.error("Something went wrong");
      // Still navigate even if tracking fails
      navigate(path);
    }
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
