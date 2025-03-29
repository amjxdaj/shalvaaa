
import React from 'react';
import Celebration from '../components/Celebration';
import FloatingHearts from '../components/FloatingHearts';
import AudioPlayer from '../components/AudioPlayer';

const CelebrationPage = () => {
  const handleContinueToInstagram = () => {
    const username = "amjxd_aj";  // Replace with your Instagram username
    const instagramAppUrl = `instagram://user?username=${username}`;
    const instagramWebUrl = `https://www.instagram.com/${username}/`;
  
    // Try to open Instagram app
    window.location.href = instagramAppUrl;
  
    // If the app is not installed, open the Instagram website after 2 seconds
    setTimeout(() => {
      window.location.href = instagramWebUrl;
    }, 2000);
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
