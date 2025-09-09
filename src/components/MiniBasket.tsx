import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBasket } from '@/context/BasketContext';

const MiniBasket: React.FC = () => {
  const { state, updateQuantity, removeItem } = useBasket();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/20 z-40"
          />
        )}
      </AnimatePresence>

      {/* Mini Basket */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-4 left-4 right-4 z-50"
      >
        <motion.div
          layout
          className="bg-card rounded-2xl shadow-strong border border-border overflow-hidden"
        >
          {/* Collapsed Header */}
          <motion.div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between p-4 cursor-pointer tap-target"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-primary-foreground" />
                </div>
                <motion.div
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-destructive-foreground">{itemCount}</span>
                </motion.div>
              </div>
              <div>
                <p className="font-semibold text-foreground">Your Basket</p>
                <p className="text-sm text-muted-foreground">£{state.total.toFixed(2)}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="border-t border-border"
              >
                <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                  {state.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">£{item.price.toFixed(2)} each</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0 rounded-full"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0 rounded-full"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0 rounded-full text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Checkout Button */}
                <div className="p-4 border-t border-border">
                  <Button className="w-full tap-target bg-gradient-primary text-primary-foreground font-semibold rounded-xl">
                    Checkout • £{state.total.toFixed(2)}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MiniBasket;