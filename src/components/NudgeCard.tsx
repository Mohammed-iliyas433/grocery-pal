import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Repeat, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBasket } from '@/context/BasketContext';

const NudgeCard: React.FC = () => {
  const { state, dispatch, addItem, removeItem } = useBasket();
  
  if (!state.nudgeRecommendation) return null;

  const { nudgeRecommendation } = state;

  const handleAdd = () => {
    addItem(nudgeRecommendation.product);
    dispatch({ type: 'HIDE_NUDGE' });
  };

  const handleSwap = () => {
    if (nudgeRecommendation.originalProduct) {
      removeItem(nudgeRecommendation.originalProduct.id);
    }
    addItem(nudgeRecommendation.product);
    dispatch({ type: 'HIDE_NUDGE' });
  };

  const handleDismiss = () => {
    dispatch({ type: 'HIDE_NUDGE' });
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleDismiss}
        className="fixed inset-0 bg-black/30 z-40"
      />

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-strong z-50 max-w-md mx-auto"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1 bg-muted rounded-full" />
        </div>

        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center"
              >
                <Zap className="w-4 h-4 text-primary-foreground" />
              </motion.div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Smart Suggestion</h3>
                <p className="text-sm text-muted-foreground">Personalized for you</p>
              </div>
            </div>
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Product Recommendation */}
          <div className="bg-accent/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                <div className="text-xl">📦</div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{nudgeRecommendation.product.name}</h4>
                <p className="text-sm text-primary font-bold">£{nudgeRecommendation.product.price.toFixed(2)}</p>
              </div>
            </div>
            
            <p className="text-sm text-foreground bg-card/50 rounded-lg p-3">
              💡 {nudgeRecommendation.reason}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {nudgeRecommendation.type === 'add' ? (
              <Button
                onClick={handleAdd}
                className="w-full tap-target bg-gradient-primary text-primary-foreground font-semibold rounded-xl"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add to Basket
              </Button>
            ) : (
              <Button
                onClick={handleSwap}
                className="w-full tap-target bg-gradient-primary text-primary-foreground font-semibold rounded-xl"
                size="lg"
              >
                <Repeat className="w-5 h-5 mr-2" />
                Swap Product
              </Button>
            )}
            
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="w-full tap-target"
              size="lg"
            >
              Not Now
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NudgeCard;