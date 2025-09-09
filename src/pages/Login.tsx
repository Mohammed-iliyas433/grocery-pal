import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Shield, Scan, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(username, password);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate('/shop');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password. Try user/pass123",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col items-center justify-center p-mobile-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        {/* App Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl shadow-medium mb-4">
            <ShoppingCart className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">SmartShop</h1>
          <p className="text-muted-foreground">Scan as you shop</p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          onSubmit={handleLogin}
          className="space-y-4 mb-6"
        >
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-foreground">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-card border-accent/20 focus:border-primary rounded-xl"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-card border-accent/20 focus:border-primary rounded-xl pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1 hover:bg-transparent"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full tap-target bg-gradient-primary hover:shadow-medium text-primary-foreground font-semibold rounded-xl"
            size="lg"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </motion.form>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="bg-card rounded-xl p-4 shadow-soft mb-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-2">Demo Credentials</h3>
          <p className="text-xs text-muted-foreground">
            Username: <span className="font-mono text-foreground">user</span><br />
            Password: <span className="font-mono text-foreground">pass123</span>
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-soft">
            <div className="w-8 h-8 bg-primary-soft rounded-full flex items-center justify-center">
              <Scan className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm text-foreground">Smart Scanning</h3>
              <p className="text-xs text-muted-foreground">Scan products for instant recommendations</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-soft">
            <div className="w-8 h-8 bg-success-soft rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-success" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm text-foreground">Health Insights</h3>
              <p className="text-xs text-muted-foreground">Personalized nutrition guidance</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-soft">
            <div className="w-8 h-8 bg-alert-bg rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-destructive" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm text-foreground">Allergy Protection</h3>
              <p className="text-xs text-muted-foreground">Instant alerts for allergen detection</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;