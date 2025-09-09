import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BasketProvider } from './context/BasketContext';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <BasketProvider>
            <Toaster />
            <Sonner />
            <Router>
              <div className="max-w-md mx-auto bg-background min-h-screen relative overflow-hidden">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </Router>
          </BasketProvider>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
