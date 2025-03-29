
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
    
    // Try to play audio automatically (may be blocked by browser)
    audio.play().then(() => {
      setPlaying(true);
    }).catch(error => {
      console.log("Auto-play failed, waiting for user interaction:", error);
      // Fallback to play on first interaction
      document.addEventListener('click', playAudio);
    });
    
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
      className="fixed bottom-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-2xl hover:scale-110 transition-transform"
      aria-label={playing ? "Mute music" : "Play music"}
      style={{ 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
        transform: playing ? "rotate(0deg)" : "rotate(-10deg)"
      }}
    >
      {playing ? 
        <Volume2 size={24} className="text-love-600" style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))" }} /> : 
        <VolumeX size={24} className="text-gray-600" style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))" }} />
      }
    </button>
  );
};

export default AudioPlayer;
