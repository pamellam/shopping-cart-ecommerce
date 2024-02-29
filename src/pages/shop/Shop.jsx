import { useContext } from 'react';
import Product from './Product';
import './Shop.css';
import { ShopContext } from '../../context/shop-context';

const Shop = () => {
  const { fetchedProducts, isFetching, error } = useContext(ShopContext);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="shop">
      <div className="shop-title">
        <h1>Tech Shop</h1>
      </div>
      <div className="products">
        {fetchedProducts.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
