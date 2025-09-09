import React from 'react';
import ProductCard from './ProductCard';
import { mockProducts } from '@/data/mockProducts';

const ProductGrid: React.FC = () => {
  return (
    <div className="mobile-grid">
      {mockProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid;