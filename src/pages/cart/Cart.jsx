/**
 * @fileOverview Cart component
 */

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import CartItem from './CartItem';
import './Cart.css';

/**
 * Cart component
 * @returns {JSX.Element} Cart page
 */
const Cart = () => {
  const { cartItems, getTotalAmount, fetchedProducts } =
    useContext(ShopContext);
  const totalAmount = getTotalAmount();

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cartItems">
        {fetchedProducts.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount}</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h1>Your cart is empty</h1>
      )}
    </div>
  );
};

export default Cart;
