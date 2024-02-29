/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { fetchProducts } from '../../src/products';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAndInitializeProducts() {
      setIsFetching(true);
      try {
        const products = await fetchProducts();
        setFetchedProducts(products);
        // Initialize cart based on the fetched products
        let defaultCart = {};
        products.forEach((product) => {
          defaultCart[product.id] = 0;
        });
        setCartItems(defaultCart);
        setIsFetching(false);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        setIsFetching(false);
      }
    }

    fetchAndInitializeProducts();
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prevState) => ({
      ...prevState,
      [itemId]: prevState[itemId] + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevState) => ({
      ...prevState,
      [itemId]: Math.max(0, prevState[itemId] - 1),
    }));
  };

  const updateCartItemsCount = (newAmount, itemId) => {
    setCartItems((prevState) => ({
      ...prevState,
      [itemId]: newAmount,
    }));
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = fetchedProducts.find(
          (product) => product.id === Number(item)
        );
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const contextValue = {
    cartItems,
    fetchedProducts,
    isFetching,
    error,
    addToCart,
    removeFromCart,
    updateCartItemsCount,
    getTotalAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
