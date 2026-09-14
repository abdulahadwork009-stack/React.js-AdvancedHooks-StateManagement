import { memo } from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="flex flex-col gap-1.5 rounded border border-edge border-t-[3px] border-t-accent bg-surface p-4 dark:border-edge-dark dark:border-t-accent-dark dark:bg-surface-dark">
      <div className="mb-1 flex aspect-[4/3] items-center justify-center overflow-hidden rounded bg-paper dark:bg-paper-dark">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="max-h-[85%] max-w-[85%] object-contain"
        />
      </div>

      <p className="m-0 text-xs text-muted dark:text-muted-dark">{product.category}</p>
      <h3 className="m-0 font-display text-base font-medium leading-snug">{product.title}</h3>
      <p className="m-0 text-base font-semibold tabular-nums">${product.price.toFixed(2)}</p>

      <button
        type="button"
        className="mt-2 rounded bg-ink px-3 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-85 dark:bg-ink-dark dark:text-paper-dark"
        onClick={() => onAddToCart(product)}
      >
        Add to cart
      </button>
    </article>
  );
}

export default memo(ProductCard);