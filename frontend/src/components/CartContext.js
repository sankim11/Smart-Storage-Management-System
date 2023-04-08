import React, { createContext, useState } from 'react';

export const CartContext = createContext({
  cartItems: [],
  items: [],
  setItems: () => {},
  addItem: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.ItemID === item.ItemID
    );

    if (item.AmountStored > 0) {
      if (existingCartItem) {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.ItemID === item.ItemID
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.ItemID === item.ItemID ? { ...i, AmountStored: i.AmountStored - 1 } : i
          )
        );
      } else {
        setCartItems([...cartItems, { ...item, ItemID: item.ItemID, quantity: 1 }]);
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.ItemID === item.ItemID ? { ...i, AmountStored: i.AmountStored - 1 } : i
          )
        );
      }
    }
    console.log(cartItems)
  };

  return (
    <CartContext.Provider value={{ cartItems, items, setItems, addItem }}>
      {children}
    </CartContext.Provider>
  );
};
