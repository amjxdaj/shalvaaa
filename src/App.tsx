
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PhotosPage from "./pages/PhotosPage";
import ComplimentsPage from "./pages/ComplimentsPage";
import StatusQuestion from "./pages/StatusQuestion";
import LoveConfession from "./pages/LoveConfession";
import FinalQuestion from "./pages/FinalQuestion";
import Celebration from "./pages/Celebration";
import Sad from "./pages/Sad";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/compliments" element={<ComplimentsPage />} />
          <Route path="/question-status" element={<StatusQuestion />} />
          <Route path="/love-confession" element={<LoveConfession />} />
          <Route path="/final-question" element={<FinalQuestion />} />
          <Route path="/celebration" element={<Celebration />} />
          <Route path="/sad" element={<Sad />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
