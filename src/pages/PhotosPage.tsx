
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import FloatingHearts from '../components/FloatingHearts';

const PhotosPage = () => {
  const navigate = useNavigate();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Array of photo URLs
  const photos = [
    "/lovable-uploads/ee1f8aa8-47cd-45a6-a80d-3764e0575fcb.png",
    "/lovable-uploads/117ff596-e689-4089-acfb-3d71925aa44d.png",
    "/lovable-uploads/88446da8-dc8a-40c5-8c17-c18cdc3d709b.png",
    "/lovable-uploads/7ce9284a-2045-4293-aeb5-9f741a3b0c8e.png",
    "/lovable-uploads/0fd1fcc6-ebca-48dc-8d0a-04448a7193bb.png",
    "/lovable-uploads/ab1cab14-d547-4365-b316-2ae1443c80b8.png",
    "/lovable-uploads/fd5640ca-24d1-46f9-9853-88a8d6dbbfaa.png"
  ];

  const handleSwipe = () => {
    if (currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    } else {
      // Navigate to compliments page when all photos have been swiped
      navigate('/compliments');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <FloatingHearts />
      
      <div className="w-full max-w-sm aspect-[3/4] relative photo-stack">
        {photos.map((photo, index) => (
          <PhotoCard 
            key={index}
            imageSrc={photo}
            onSwipe={handleSwipe}
            isActive={index === currentPhotoIndex}
          />
        ))}
      </div>
      
      <p className="mt-4 text-love-700 text-lg font-medium">
        Photo {currentPhotoIndex + 1} of {photos.length}
      </p>
    </div>
  );
};

export default PhotosPage;
