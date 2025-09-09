import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Shield, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center justify-center p-mobile-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm text-center"
      >
        {/* App Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl shadow-medium mb-4">
            <ShoppingCart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">SmartShop</h1>
          <p className="text-muted-foreground">Scan as you shop</p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft">
            <div className="w-8 h-8 bg-primary-soft rounded-full flex items-center justify-center">
              <Scan className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm">Smart Scanning</h3>
              <p className="text-xs text-muted-foreground">Scan products for instant recommendations</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft">
            <div className="w-8 h-8 bg-success-soft rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-success" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm">Health Insights</h3>
              <p className="text-xs text-muted-foreground">Personalized nutrition guidance</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft">
            <div className="w-8 h-8 bg-alert-bg rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-destructive" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm">Allergy Protection</h3>
              <p className="text-xs text-muted-foreground">Instant alerts for allergen detection</p>
            </div>
          </div>
        </motion.div>

        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Button 
            onClick={onLogin}
            className="w-full tap-target bg-gradient-primary hover:shadow-medium text-primary-foreground font-semibold rounded-xl"
            size="lg"
          >
            <div className="flex items-center gap-2">
              <span>💪</span>
              <span>Continue as Health & Fitness</span>
            </div>
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4">
            Profile: High-protein, low-sugar preferences<br />
            <span className="text-destructive">⚠️ Allergy: Nuts</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;