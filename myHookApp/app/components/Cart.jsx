import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

function Cart() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <div className="w-full md:w-72 border rounded p-4 dark:border-gray-700">
      <h2 className="font-bold mb-2">Cart: {totalItems} items</h2>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Cart is empty</p>
      ) : (
        items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
          />
        ))
      )}

      <div className="flex justify-between mt-3 font-bold">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>

      {items.length > 0 && (
        <button
          onClick={clearCart}
          className="mt-3 w-full bg-red-600 text-white py-1 rounded"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
}

export default Cart;