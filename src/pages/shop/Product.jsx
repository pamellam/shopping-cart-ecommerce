/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';

/**
 * Product component
 * @param {object} props - component props
 * @param {number} props.id - product id
 * @param {string} props.title - product title
 * @param {number} props.price - product price
 * @param {string} props.thumbnail - product thumbnail
 * @returns {JSX.Element} - product component
 */
const Product = (props) => {
  const { id, title, price, thumbnail } = props.data;
  // get ShopContext from React's useContext hook
  const { addToCart, cartItems } = useContext(ShopContext);

  // get the amount of items in the cart with the given product id
  const cartItemAmount = cartItems[id];

  return (
    <div className="product">
      <img src={thumbnail} alt="product's image" />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        <p>${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button>
    </div>
  );
};

export default Product;
