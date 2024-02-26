/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';

/**
 * Product component
 * @param {object} props - component props
 * @param {number} props.id - product id
 * @param {string} props.productName - product name
 * @param {number} props.price - product price
 * @param {string} props.productImage - product image url
 * @returns {JSX.Element} - product component
 */
const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemAmount = cartItems[id];

  return (
    <div className="product">
      <img src={productImage} alt="" />
      <div className="description">
        <p>
          <b>{productName}</b>
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
