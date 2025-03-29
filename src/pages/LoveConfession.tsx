
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MessageCard from '../components/MessageCard';
import FloatingHearts from '../components/FloatingHearts';

const LoveConfession = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <FloatingHearts />
      
      <MessageCard 
        message="I LOVE YOUUU!!😭🥹❤️"
        onContinue={() => navigate('/final-question')}
      />
    </div>
  );
};

export default LoveConfession;
