
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TrainBooking from "./pages/TrainBooking";
import CrowdMap from "./pages/CrowdMap";
import LostFound from "./pages/LostFound";
import Emergency from "./pages/Emergency";
import Services from "./pages/Services";
import SplashScreen from "./components/Layout/SplashScreen";

// Add motion library
import { LazyMotion, domAnimation } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <LazyMotion features={domAnimation}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/train-booking" element={<TrainBooking />} />
              <Route path="/crowd-map" element={<CrowdMap />} />
              <Route path="/lost-found" element={<LostFound />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/services" element={<Services />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LazyMotion>
  );
};

export default App;
