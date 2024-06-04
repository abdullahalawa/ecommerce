import { createContext, useState } from "react";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {
  function addProductToCart() {}

  return (
    <cartContext.Provider value={{ addProductToCart }}>
      {children}
    </cartContext.Provider>
  );
}
