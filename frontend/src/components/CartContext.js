import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  cartItems: [],
  items: [],
  setItems: () => {},
  addItem: () => {},
  deleteItem: () => {},
  setCartItems: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Store cart items in local storage
  }, [cartItems]);

  const addItem = (item) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.ItemID === item.ItemID
    );

    if (item.AmountStored > 0) {
      if (existingCartItem) {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.ItemID === item.ItemID
              ? { ...cartItem, quantity: cartItem.quantity + 1 } // If item is already in cart, increase quantity by 1
              : cartItem
          )
        );
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.ItemID === item.ItemID ? { ...i, AmountStored: i.AmountStored - 1 } : i // Decrease item stock by 1
          )
        );
      } else {
        setCartItems([...cartItems, { ...item, ItemID: item.ItemID, quantity: 1 }]); // Add item to cart with quantity 1
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.ItemID === item.ItemID ? { ...i, AmountStored: i.AmountStored - 1 } : i // Decrease item stock by 1
          )
        );
      }
    }
  };

  const deleteItem = (item) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.ItemID === item.ItemID
    );
  
    if (existingCartItem) {
      setCartItems(cartItems.filter((cartItem) => cartItem.ItemID !== item.ItemID));
      setItems((prevItems) =>
        prevItems.map((i) =>
          i.ItemID === item.ItemID ? { ...i, AmountStored: i.AmountStored + existingCartItem.quantity } : i
        )
      );
    }
  };

  const setCartItemsHandler = (items) => {
    setCartItems(items);
  };

  return (
    <CartContext.Provider value={{ cartItems, items, setItems, addItem, deleteItem, setCartItems: setCartItemsHandler }}>
      {children}
    </CartContext.Provider>
  );
};
