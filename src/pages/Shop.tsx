import React from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingCart } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import MiniBasket from '@/components/MiniBasket';
import NudgeCard from '@/components/NudgeCard';
import AllergyAlert from '@/components/AllergyAlert';
import RecommendationList from '@/components/RecommendationList';
import { healthFitnessProfile } from '@/data/mockProducts';

const Shop: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border"
      >
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">SmartShop</h1>
              <p className="text-xs text-muted-foreground">Scan as you shop</p>
            </div>
          </div>

          {/* Profile Avatar */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{healthFitnessProfile.name}</p>
              <p className="text-xs text-muted-foreground">High-protein, low-sugar</p>
            </div>
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-lg">{healthFitnessProfile.avatar}</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pb-32">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4"
        >
          <div className="bg-gradient-soft rounded-2xl p-6 text-center shadow-soft">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl mb-2"
            >
              🛒
            </motion.div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              Ready to shop smart?
            </h2>
            <p className="text-muted-foreground">
              Tap any product to scan and get personalized recommendations
            </p>
          </div>
        </motion.div>

        {/* Recommendations Section */}
        <RecommendationList />

        {/* Product Grid */}
        <ProductGrid />
      </main>

      {/* Floating Components */}
      <MiniBasket />
      <NudgeCard />
      <AllergyAlert />
    </div>
  );
};

export default Shop;