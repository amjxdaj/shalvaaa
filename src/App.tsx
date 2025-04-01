
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Toaster } from 'sonner';

// Import pages
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import StatusQuestion from './pages/StatusQuestion';
import Sad from './pages/Sad';
import LoveConfession from './pages/LoveConfession';
import FinalQuestion from './pages/FinalQuestion';
import PhotosPage from './pages/PhotosPage';
import ComplimentsPage from './pages/ComplimentsPage';
import CelebrationPage from './pages/Celebration';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/status" element={<StatusQuestion />} />
          <Route path="/sad" element={<Sad />} />
          <Route path="/love-confession" element={<LoveConfession />} />
          <Route path="/final-question" element={<FinalQuestion />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/compliments" element={<ComplimentsPage />} />
          <Route path="/celebration" element={<CelebrationPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
