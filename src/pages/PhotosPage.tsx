
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import AudioPlayer from '../components/AudioPlayer';

const PhotosPage = () => {
  const navigate = useNavigate();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [viewedPhotos, setViewedPhotos] = useState<number[]>([]);
  
  // Array of photo URLs
  const photos = [
    "/lovable-uploads/ee1f8aa8-47cd-45a6-a80d-3764e0575fcb.png",
    "/lovable-uploads/fd5640ca-24d1-46f9-9853-88a8d6dbbfaa.png",
    "/lovable-uploads/117ff596-e689-4089-acfb-3d71925aa44d.png",
    "/lovable-uploads/88446da8-dc8a-40c5-8c17-c18cdc3d709b.png",
    "/lovable-uploads/7ce9284a-2045-4293-aeb5-9f741a3b0c8e.png",
    "/lovable-uploads/0fd1fcc6-ebca-48dc-8d0a-04448a7193bb.png",
    "/lovable-uploads/ab1cab14-d547-4365-b316-2ae1443c80b8.png"
  ];
  
  // Generate random scatter positions for each photo
  const scatterPositions = photos.map(() => ({
    x: Math.random() * 300 - 150, // Random X position between -150 and 150
    y: Math.random() * 400 - 300, // Random Y position between -300 and 100
    rotate: Math.random() * 40 - 20, // Random rotation between -20 and 20 degrees
  }));

  const handleSwipe = () => {
    // Immediately mark current photo as viewed
    const newViewedPhotos = [...viewedPhotos, currentPhotoIndex];
    setViewedPhotos(newViewedPhotos);
    
    // Add a slight delay before moving to next photo to allow for scatter animation
    if (currentPhotoIndex < photos.length - 1) {
      // Preload next image to prevent loading issues
      const nextImg = new Image();
      nextImg.src = photos[currentPhotoIndex + 1];
      
      // Short timeout to ensure smooth transition
      setTimeout(() => {
        setCurrentPhotoIndex(currentPhotoIndex + 1);
      }, 100);
    } else {
      // Navigate to compliments page when all photos have been viewed
      setTimeout(() => {
        navigate('/compliments');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-gradient-to-br from-pink-50 to-blue-50">
      <AudioPlayer />
      
      <div className="w-full max-w-sm aspect-[3/4] relative photo-stack mx-auto">
        {/* Render scattered photos first */}
        {photos.map((photo, index) => (
          viewedPhotos.includes(index) && (
            <PhotoCard 
              key={`scattered-${index}`}
              imageSrc={photo}
              onSwipe={() => {}}
              isActive={false}
              index={index}
              isScattered={true}
              scatterPosition={scatterPositions[index]}
            />
          )
        ))}
        
        {/* Render active photo stack */}
        {photos.map((photo, index) => (
          !viewedPhotos.includes(index) && (
            <PhotoCard 
              key={`stack-${index}`}
              imageSrc={photo}
              onSwipe={handleSwipe}
              isActive={index === currentPhotoIndex}
              index={index}
            />
          )
        ))}
      </div>
      
      <p className="mt-4 text-love-700 text-lg font-medium text-center">
        Photo {currentPhotoIndex + 1} of {photos.length}
      </p>
    </div>
  );
};

export default PhotosPage;
