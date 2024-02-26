/* eslint-disable react/prop-types */
/**
 * @file CartItem component
 */

import { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';

import '../shop/Shop.css';
import './Cart.css';

/**
 * CartItem component
 * @param {object} props component props
 * @param {string} props.data.id product id
 * @param {string} props.data.productName product name
 * @param {number} props.data.price product price
 * @param {string} props.data.productImage product image
 * @returns {JSX.Element} CartItem component
 */
const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, removeFromCart, addToCart, updateCartItemsCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem">
      <img src={productImage} alt="" />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>${price}</p>
      </div>
      <div className="countHandler">
        <button onClick={() => removeFromCart(id)}> - </button>
        <input
          type="number"
          value={cartItems[id]}
          onChange={(e) => updateCartItemsCount(Number(e.target.value), id)}
        />
        <button onClick={() => addToCart(id)}> + </button>
      </div>
    </div>
  );
};

export default CartItem;
