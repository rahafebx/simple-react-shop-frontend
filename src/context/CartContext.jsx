import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getProducts } from "../data/products";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const products = getProducts();
      const updatedCart = storedCart.filter((item) =>
        products.some((product) => product.id === item.id),
      );
      // Only update localStorage if the cart changed
      if (JSON.stringify(storedCart) !== JSON.stringify(updatedCart)) {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      return updatedCart;
    } catch {
      return [];
    }
  });

  // Sync localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity if product already exists
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // Add new product with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prevItems) => {
      // Find the item to remove
      const itemToRemove = prevItems.find((item) => item.id === productId);

      if (!itemToRemove) return prevItems;

      // If quantity > 1, just decrement
      if (itemToRemove.quantity > 1) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }

      // If quantity is 1 or less, remove completely
      return prevItems.filter((item) => item.id !== productId);
    });
  }, []);

  const removeItemCompletely = useCallback((productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity <= 0) {
        removeItemCompletely(productId);
        return;
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [removeItemCompletely],
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce((total, item) => {
    const price =
      item.discount && item.discount > 0
        ? item.price * (1 - item.discount / 100)
        : item.price;
    return total + price * item.quantity;
  }, 0);

  const isProductInCart = useCallback(
    (productId) => {
      return cartItems.some((item) => item.id === productId);
    },
    [cartItems],
  );

  const value = {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    clearCart,
    updateQuantity,
    isProductInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
