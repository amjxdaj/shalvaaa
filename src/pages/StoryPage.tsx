
import React from 'react';
import StorySlides from '../components/StorySlides';
import AudioPlayer from '../components/AudioPlayer';

const StoryPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-gradient-to-br from-pink-50 to-blue-50">
      <AudioPlayer />
      <StorySlides />
    </div>
  );
};

export default StoryPage;
