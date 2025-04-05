
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { trackUserAction } from '@/utils/trackUserAction';

const StorySlides = () => {
  const navigate = useNavigate();
  
  const handleComplete = () => {
    trackUserAction('viewed_story_slides');
    navigate('/compliments');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-gradient-to-br from-pink-50 to-blue-50">
      <Carousel className="w-full max-w-md relative">
        <CarouselContent>
          {/* First Slide */}
          <CarouselItem className="flex flex-col items-center justify-center h-[70vh]">
            <div className="romantic-card p-8 w-full h-full flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-love-700 animate-fade-in">
                When I first met you
              </h2>
            </div>
          </CarouselItem>
          
          {/* Second Slide */}
          <CarouselItem className="flex flex-col items-center justify-center h-[70vh]">
            <div className="romantic-card p-8 w-full h-full flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-love-700 animate-fade-in">
                it was like
              </h2>
            </div>
          </CarouselItem>
          
          {/* Third Slide - Image */}
          <CarouselItem className="flex flex-col items-center justify-center h-[70vh]">
            <div className="romantic-card p-4 w-full h-full">
              <div className="w-full h-full relative overflow-hidden rounded-xl">
                <img 
                  src="/lovable-uploads/9319f0a1-0008-43b1-a655-10100fc066bd.png" 
                  alt="Something special" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          <CarouselPrevious variant="outline" size="sm" className="h-7 w-7 relative static translate-y-0 left-0" />
          <CarouselNext variant="outline" size="sm" className="h-7 w-7 relative static translate-y-0 right-0" />
        </div>
        
        <Button 
          onClick={handleComplete}
          className="absolute bottom-16 right-4 heart-button group"
        >
          Continue
          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Carousel>
      
      <div className="absolute bottom-6 text-center text-love-600 text-sm">
        <p>Swipe to see more</p>
      </div>
    </div>
  );
};

export default StorySlides;
