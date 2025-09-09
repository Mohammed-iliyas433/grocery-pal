import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBasket } from '@/context/BasketContext';

const AllergyAlert: React.FC = () => {
  const { state, dispatch, addItem } = useBasket();
  
  if (!state.showAllergyAlert || !state.allergyProduct) return null;

  const handleRemove = () => {
    dispatch({ type: 'HIDE_ALLERGY_ALERT' });
  };

  const handleKeepAnyway = () => {
    if (state.allergyProduct) {
      addItem(state.allergyProduct);
    }
    dispatch({ type: 'HIDE_ALLERGY_ALERT' });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-destructive/90 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="alert-shake"
        >
          <div className="bg-card rounded-3xl p-6 max-w-sm w-full shadow-alert">
            {/* Alert Header */}
            <div className="text-center mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0] 
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <AlertTriangle className="w-8 h-8 text-destructive-foreground" />
              </motion.div>
              
              <h1 className="text-2xl font-bold text-destructive mb-2">
                ⚠️ ALLERGY ALERT!
              </h1>
              <p className="text-foreground font-semibold">
                Nuts Detected
              </p>
            </div>

            {/* Product Info */}
            <div className="bg-alert-bg border-2 border-alert-border rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center">
                  <div className="text-2xl">🥜</div>
                </div>
                <div>
                  <h3 className="font-bold text-destructive">{state.allergyProduct.name}</h3>
                  <p className="text-sm text-destructive/80">Contains nuts - matches your allergy profile</p>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-destructive/10 rounded-xl p-4 mb-6">
              <p className="text-sm text-center text-foreground">
                <strong>⚠️ Health Warning:</strong><br />
                This product contains nuts and may cause a severe allergic reaction.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleRemove}
                className="w-full tap-target bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold rounded-xl"
                size="lg"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Remove Item (Recommended)
              </Button>
              
              <Button
                onClick={handleKeepAnyway}
                variant="outline"
                className="w-full tap-target border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                size="lg"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Keep Anyway (Risky)
              </Button>
            </div>

            {/* Footer */}
            <p className="text-xs text-center text-muted-foreground mt-4">
              Your safety is our priority. Please double-check all ingredients.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AllergyAlert;