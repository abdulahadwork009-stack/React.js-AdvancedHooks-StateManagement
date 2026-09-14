import { memo } from "react";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border rounded p-3 dark:border-gray-700 h-full flex flex-col">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-32 object-contain mb-2"
      />
      <p className="text-sm text-gray-500">{product.category}</p>
      <h3 className="font-semibold">{product.title}</h3>
      <p className="font-bold">${product.price}</p>

      {}
      <button
        onClick={() => onAddToCart(product)}
        className="mt-auto pt-2 w-full bg-blue-600 text-white py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default memo(ProductCard);