import { memo } from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="rounded border border-dashed border-edge px-4 py-10 text-center text-muted dark:border-edge-dark dark:text-muted-dark">
        <p className="mb-1 font-display text-lg text-ink dark:text-ink-dark">No products found</p>
        <span className="text-sm">Try a different search term or category.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default memo(ProductList);