
import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer: React.FC = () => {
  const [audio] = useState(new Audio('/lovable-uploads/maand-female-acoustic.mp3'));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audio.loop = true;
    
    const playAudio = () => {
      audio.play().catch(error => {
        console.log("Audio play failed:", error);
      });
      setPlaying(true);
      document.removeEventListener('click', playAudio);
    };
    
    document.addEventListener('click', playAudio);
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener('click', playAudio);
    };
  }, [audio]);

  const togglePlay = () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log(e));
    }
    setPlaying(!playing);
  };

  return (
    <button 
      onClick={togglePlay} 
      className="fixed bottom-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg"
      aria-label={playing ? "Mute music" : "Play music"}
    >
      {playing ? <Volume2 size={24} className="text-love-600" /> : <VolumeX size={24} className="text-gray-600" />}
    </button>
  );
};

export default AudioPlayer;
