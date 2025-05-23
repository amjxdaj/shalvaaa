
import React, { useState, useEffect } from 'react';
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
import { useIsMobile } from '@/hooks/use-mobile';

const StorySlides = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!api) return;
    
    setCount(api.scrollSnapList().length);
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  
  useEffect(() => {
    if (current === count - 1) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [current, count]);
  
  const handleComplete = () => {
    trackUserAction('viewed_story_slides');
    navigate('/compliments');
  };

  return (
    <div className={`
      min-h-screen 
      flex 
      flex-col 
      items-center 
      justify-center 
      p-4 
      relative 
      bg-gradient-to-br 
      from-pink-50 
      to-blue-50
      ${isMobile ? 'space-y-4' : 'space-y-6'}
    `}>
      <Carousel 
        className={`
          w-full 
          ${isMobile ? 'max-w-xs' : 'max-w-md'} 
          relative 
          mb-2
        `} 
        setApi={setApi}
      >
        <CarouselContent>
          {/* First Story Group */}
          <CarouselItem className="flex flex-col items-center justify-center h-[50vh] aspect-[3/4]">
            <div className="romantic-card p-8 w-full h-full flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-love-700 animate-fade-in">
                When I first saw you
              </h2>
            </div>
          </CarouselItem>
          
          <CarouselItem className="flex flex-col items-center justify-center h-[50vh] aspect-[3/4]">
            <div className="romantic-card p-8 w-full h-full flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-love-700 animate-fade-in">
                It was like
              </h2>
            </div>
          </CarouselItem>
          
          <CarouselItem className="flex flex-col items-center justify-center h-[50vh] aspect-[3/4]">
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
          
          {/* Second Story Group */}
          <CarouselItem className="flex flex-col items-center justify-center h-[50vh] aspect-[3/4]">
            <div className="romantic-card p-8 w-full h-full flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-love-700 animate-fade-in">
                Sugar dissolves in water, so please don't walk in the rain
              </h2>
            </div>
          </CarouselItem>
          
          <CarouselItem className="flex flex-col items-center justify-center h-[50vh] aspect-[3/4]">
            <div className="romantic-card p-8 w-full h-full flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-love-700 animate-fade-in">
                or I might lose a Sweetie like you!!😭
              </h2>
            </div>
          </CarouselItem>
          
          {/* Third Story Group */}
          <CarouselItem className="flex flex-col items-center justify-center h-[50vh] aspect-[3/4]">
            <div className="romantic-card p-8 w-full h-full flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-love-700 animate-fade-in">
                In English, they said, "Pretty Eyes,"
              </h2>
            </div>
          </CarouselItem>
          
          <CarouselItem className="flex flex-col items-center justify-center h-[50vh] aspect-[3/4]">
            <div className="romantic-card p-8 w-full h-full flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-love-700 animate-fade-in">
                but in poetry, we say:
              </h2>
            </div>
          </CarouselItem>
          
          <CarouselItem className="flex flex-col items-center justify-center h-[50vh] aspect-[3/4]">
            <div className="romantic-card p-8 w-full h-full flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-love-700 animate-fade-in">
                Even if the sky was filled with stars, I'd still rather see them in your eyes.
              </h2>
            </div>
          </CarouselItem>
          
          {/* Final Image Slide */}
          <CarouselItem className="flex flex-col items-center justify-center h-[50vh] aspect-[3/4]">
            <div className="romantic-card p-4 w-full h-full">
              <div className="w-full h-full relative overflow-hidden rounded-xl">
                <img 
                  src="/lovable-uploads/424da9e8-4e07-4a42-856b-86150884335a.png" 
                  alt="Beautiful eyes" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        
        <div className={`
          absolute 
          bottom-0 
          left-0 
          right-0 
          flex 
          justify-center 
          gap-2 
          ${isMobile ? 'pb-2' : 'pb-4'}
        `}>
          <CarouselPrevious 
            variant="outline" 
            size="sm" 
            className="h-6 w-6 relative static translate-y-0 left-0" 
          />
          <CarouselNext 
            variant="outline" 
            size="sm" 
            className="h-6 w-6 relative static translate-y-0 right-0" 
          />
        </div>
      </Carousel>
      
      {showButton && (
        <Button 
          onClick={handleComplete}
          className={`
            heart-button 
            group 
            animate-bounce-in
            ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'}
          `}
        >
          Continue
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      )}
      
      <div className={`
        text-center 
        text-love-600 
        ${isMobile ? 'text-xs' : 'text-sm'}
      `}>
        <p>Swipe to see more</p>
      </div>
    </div>
  );
};

export default StorySlides;
