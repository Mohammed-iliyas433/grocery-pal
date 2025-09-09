import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BasketProvider } from './context/BasketContext';
import Login from './pages/Login';
import Shop from './pages/Shop';

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BasketProvider>
          <Toaster />
          <Sonner />
          <div className="max-w-md mx-auto bg-background min-h-screen relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isLoggedIn ? (
                <Login key="login" onLogin={handleLogin} />
              ) : (
                <Shop key="shop" />
              )}
            </AnimatePresence>
          </div>
        </BasketProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
