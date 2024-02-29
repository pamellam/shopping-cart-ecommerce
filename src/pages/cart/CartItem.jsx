/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import '../shop/Shop.css';
import './Cart.css';

/**
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.title
 * @param {number} props.price
 * @param {string} props.thumbnail
 * @returns {JSX.Element}
 */
const CartItem = (props) => {
  const { id, title, price, thumbnail } = props.data;
  const { cartItems, removeFromCart, addToCart, updateCartItemsCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem">
      <img src={thumbnail} alt="" />
      <div className="description">
        <p>
          <b>{title}</b>
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
