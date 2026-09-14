import { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import { cartReducer, cartInitialState } from '../reducers/cartReducer';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId } });
  }, []);

  const increaseQuantity = useCallback((productId) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id: productId } });
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { id: productId } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [
      state.items,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      totalItems,
      totalPrice,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}