import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBasket } from '@/context/BasketContext';

const RecommendationList: React.FC = () => {
  const { state, addItem } = useBasket();
  
  if (state.recommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-3 h-3 text-primary-foreground" />
        </motion.div>
        <h2 className="text-lg font-bold text-foreground">
          Because you picked that...
        </h2>
      </div>

      {/* Horizontal Scroll */}
      <div className="recommendation-scroll">
        {state.recommendations.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="recommendation-item w-40"
          >
            <div className="bg-card rounded-xl shadow-soft overflow-hidden">
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-accent/50 to-accent">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-3xl opacity-70">📦</div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2 text-foreground">
                  {product.name}
                </h3>
                <p className="text-sm font-bold text-primary">
                  £{product.price.toFixed(2)}
                </p>
                
                <Button
                  onClick={() => addItem(product)}
                  className="w-full tap-target bg-success hover:bg-success/90 text-success-foreground font-medium rounded-lg"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecommendationList;