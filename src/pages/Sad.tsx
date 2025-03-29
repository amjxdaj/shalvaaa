
import React from 'react';
import SadResponse from '../components/SadResponse';
import AudioPlayer from '../components/AudioPlayer';

const SadPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <AudioPlayer />
      <SadResponse />
    </div>
  );
};

export default SadPage;
