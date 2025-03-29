
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MessageCard from '../components/MessageCard';
import FloatingHearts from '../components/FloatingHearts';
import PuzzleQuestion from '../components/PuzzleQuestion';
import AudioPlayer from '../components/AudioPlayer';

const LoveConfession = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <FloatingHearts />
      <AudioPlayer />
      
      <PuzzleQuestion 
        onSolve={() => {
          // Show the love confession message after puzzle is solved
          setTimeout(() => {
            document.getElementById('love-confession-message')?.classList.remove('hidden');
            document.getElementById('puzzle-container')?.classList.add('hidden');
          }, 500);
        }} 
      />
      
      <div id="love-confession-message" className="hidden">
        <MessageCard 
          message="I LOVE YOUUU!!😭🥹❤️"
          onContinue={() => navigate('/final-question')}
        />
      </div>
    </div>
  );
};

export default LoveConfession;
