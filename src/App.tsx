
import React, { useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PhotosPage from "./pages/PhotosPage";
import StoryPage from "./pages/StoryPage"; // Import our new page
import ComplimentsPage from "./pages/ComplimentsPage";
import StatusQuestion from "./pages/StatusQuestion";
import LoveConfession from "./pages/LoveConfession";
import FinalQuestion from "./pages/FinalQuestion";
import Celebration from "./pages/Celebration";
import Sad from "./pages/Sad";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to play music when user clicks "Begin"
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log("Playback failed:", err));
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Global Audio Player */}
          <audio ref={audioRef} src="/shalvaa.mp3" loop />

          <Routes>
            <Route path="/" element={<Index playAudio={playAudio} />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/story" element={<StoryPage />} /> {/* Add our new route */}
            <Route path="/compliments" element={<ComplimentsPage />} />
            <Route path="/question-status" element={<StatusQuestion />} />
            <Route path="/love-confession" element={<LoveConfession />} />
            <Route path="/final-question" element={<FinalQuestion />} />
            <Route path="/celebration" element={<Celebration />} />
            <Route path="/sad" element={<Sad />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
