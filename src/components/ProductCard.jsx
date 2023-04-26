import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function ProductCard({ products }) {
  const handleClick = (id) => {
    localStorage.setItem('id', id);
  };
  const handleAddToCart = (price, title, thumbnail, id) => {
    const cartFromLocalSt = localStorage.getItem('cart2709');
    const productsPriceLocal = localStorage.getItem('productsPrice2709');
    const cart = JSON.parse(cartFromLocalSt);
    const productsPriceData = JSON.parse(productsPriceLocal);
    const isProduct = cart?.find((c) => c.id === id);
    if (isProduct) {
      return alert('Você já possui esse item no seu carrinho! 🛒');
    }
    const product = {
      price,
      title,
      thumbnail,
      id,
      quantity: 1,
    };
    const productPrice = {
      id,
      price,
    };
    productsPriceData.push(productPrice);
    cart.push(product);
    localStorage.setItem('cart2709', JSON.stringify(cart));
    localStorage.setItem('productsPrice2709', JSON.stringify(productsPriceData));
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
          <span>
            R$
            {' '}
            {price.toFixed(2)}
          </span>
          <button
            onClick={ () => handleAddToCart(price, title, thumbnail, id) }
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
