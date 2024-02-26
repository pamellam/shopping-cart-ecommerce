/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import { PRODUCTS } from '../products';

/**
 * Creates a context object that can be used with the React.createContext() function.
 * This context provides a way to pass data through the component tree without having to pass props down manually at every level.
 * The ShopContext object contains information about the current state of the shopping cart, including the items in the cart and the total amount.
 */
export const ShopContext = createContext(null);

/**
 * Returns an object that represents the default state of the shopping cart.
 * The default state includes items for each product in the PRODUCTS array, with a quantity of 0.
 */
const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

/**
 * A React component that provides the context for the shopping cart.
 * This component uses the useState hook to manage the state of the shopping cart, including adding and removing items, updating the quantity of items, and calculating the total amount.
 * The component also provides a way to access the shopping cart information from any component in the component tree by using the ShopContext.Provider component.
 * @param {object} props - The props passed to the component
 * @param {object} props.children - The child components to render
 */
export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  /**
   * Adds an item to the shopping cart.
   * @param {number} itemId - The ID of the item to add
   */
  const addToCart = (itemId) => {
    setCartItems((prevState) => ({
      ...prevState,
      [itemId]: prevState[itemId] + 1,
    }));
  };

  /**
   * Removes an item from the shopping cart.
   * @param {number} itemId - The ID of the item to remove
   */
  const removeFromCart = (itemId) => {
    setCartItems((prevState) => ({
      ...prevState,
      [itemId]: prevState[itemId] - 1,
    }));
  };

  /**
   * Updates the quantity of an item in the shopping cart.
   * @param {number} newAmount - The new quantity of the item
   * @param {number} itemId - The ID of the item to update
   */
  const updateCartItemsCount = (newAmount, itemId) => {
    setCartItems((prevState) => ({
      ...prevState,
      [itemId]: newAmount,
    }));
  };

  /**
   * Calculates the total amount of items in the shopping cart.
   * @returns {number} The total amount of items in the shopping cart
   */
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }

    return totalAmount;
  };
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemsCount,
    getTotalAmount,
  };
  console.log(cartItems);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
