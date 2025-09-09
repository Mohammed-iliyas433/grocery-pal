import React from 'react';
import { motion } from 'framer-motion';
import { Scan, Plus, Zap, Leaf, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/context/BasketContext';
import { useBasket } from '@/context/BasketContext';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { scanProduct } = useBasket();

  const handleScan = () => {
    scanProduct(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="bg-card rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
          <div className="text-4xl opacity-60">📦</div>
        </div>
        
        {/* Product Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isHighProtein && (
            <div className="flex items-center gap-1 px-2 py-1 bg-primary/90 rounded-full">
              <Zap className="w-3 h-3 text-primary-foreground" />
              <span className="text-xs font-medium text-primary-foreground">Protein</span>
            </div>
          )}
          {product.isHealthy && (
            <div className="flex items-center gap-1 px-2 py-1 bg-success/90 rounded-full">
              <Leaf className="w-3 h-3 text-success-foreground" />
              <span className="text-xs font-medium text-success-foreground">Healthy</span>
            </div>
          )}
          {product.hasNuts && (
            <div className="flex items-center gap-1 px-2 py-1 bg-destructive/90 rounded-full">
              <AlertTriangle className="w-3 h-3 text-destructive-foreground" />
              <span className="text-xs font-medium text-destructive-foreground">Nuts</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-3">
        <div>
          <h3 className="font-semibold text-sm line-clamp-2 text-foreground">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-primary mt-1">
            £{product.price.toFixed(2)}
          </p>
        </div>

        {/* Scan Button */}
        <Button
          onClick={handleScan}
          className="w-full tap-target bg-gradient-primary hover:shadow-soft text-primary-foreground font-medium rounded-lg"
          size="sm"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Scan className="w-4 h-4" />
            </motion.div>
            <span>Scan</span>
          </div>
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;