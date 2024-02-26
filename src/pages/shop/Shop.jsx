import { PRODUCTS } from '../../products';
import Product from './Product';
import './Shop.css';

const Shop = () => {
  return (
    <div className="shop">
      <div className="shop-title">
        <h1>Tech Shop</h1>
      </div>
      <div className="products">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
