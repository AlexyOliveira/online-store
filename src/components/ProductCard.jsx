import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function ProductCard({ products }) {
  const handleClick = (id) => {
    localStorage.setItem('id', id);
  };
  const handleCartClick = (price, title, thumbnail, id) => {
    const cartFromLocalSt = localStorage.getItem('cart2709');
    const cart = JSON.parse(cartFromLocalSt);
    const isProduct = cart?.find((c) => c.id === id);
    if (isProduct) {
      return alert('Você já possui esse item no seu carrinho!');
    }
    const product = {
      price,
      title,
      thumbnail,
      id,
    };
    cart.push(product);
    localStorage.setItem('cart2709', JSON.stringify(cart));
  };
  return (
    <div className="products">
      {products.map(({ id, price, title, thumbnail }) => (
        <div
          role="link"
          onKeyDown={ handleClick }
          onClick={ () => handleClick(id) }
          data-testid="product"
          key={ id }
          tabIndex={ 0 }
        >
          <Link data-testid="product-detail-link" to="/details">
            <img src={ thumbnail } alt={ title } />
            <p>{title}</p>
          </Link>
          <span>{price}</span>
          <button
            onClick={ () => handleCartClick(price, title, thumbnail, id) }
            data-testid="product-add-to-cart"
            type="button"
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProductCard;
