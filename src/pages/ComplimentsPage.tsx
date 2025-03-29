
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageCard from '../components/MessageCard';
import AudioPlayer from '../components/AudioPlayer';

const ComplimentsPage = () => {
  const navigate = useNavigate();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  const compliments = [
    "You're soo cutee!!!",
    "Your smile is soo adorable 😭😭❤️"
  ];
  
  const handleContinue = () => {
    if (currentMessageIndex < compliments.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      // Navigate to status question page when all compliments shown
      navigate('/question-status');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-gradient-to-br from-pink-50 to-blue-50">
      <AudioPlayer />
      
      <MessageCard 
        message={compliments[currentMessageIndex]}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default ComplimentsPage;
