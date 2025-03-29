
import React from 'react';
import Celebration from '../components/Celebration';
import FloatingHearts from '../components/FloatingHearts';
import AudioPlayer from '../components/AudioPlayer';

const CelebrationPage = () => {
  const handleContinueToInstagram = () => {
    // Create a pre-filled message for Instagram DM
    const instagramUrl = "https://www.instagram.com/amjxd_aj?igsh=eDQyZTBrMWpwdjc2&utm_source=qr";
    window.location.href = instagramUrl;
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-gradient-to-r from-pink-100 via-pink-50 to-blue-100">
      <FloatingHearts />
      <AudioPlayer />
      <Celebration onContinue={handleContinueToInstagram} />
    </div>
  );
};

export default CelebrationPage;
