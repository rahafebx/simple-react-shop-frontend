import { createContext, useState, useContext } from "react";
import { getProducts } from "../data/products";
export const CartContext = createContext(null);

export default function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const products = getProducts();
      const updatedCart = storedCart.filter((item) =>
        products.some((product) => product.id === item.id)
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    } catch (e) {
      return [];
    }
  });

  const addToCart = (product) => {
    
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        localStorage.setItem(
          "cart",
          JSON.stringify(prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ))
        );

        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      // update the cart in local storage
      localStorage.setItem(
        "cart",
        JSON.stringify([...prevItems, { ...product, quantity: 1 }]),
      );

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
    // update the cart in local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const clearCart = () => {
    setCartItems([]);
    // clear the cart in local storage
    localStorage.removeItem("cart");
  };

  const updateQuantity = (productId, quantity) => {
    // remove product from cart if quantity is 0
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
    // update the cart in local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        isProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
