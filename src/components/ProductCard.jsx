import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsSum } from '../redux/actions';
import './ProductCard.css';
import loading from '../images/loading.gif';

function ProductCard({ products }) {
  const isLoading = useSelector((state) => state.isLoadingReducer.loading);
  const dispatch = useDispatch();
  const titleLenght = 50;

  const handleClick = (id) => {
    localStorage.setItem('id', id);
  };

  const productsSum = () => {
    const localStorageProducts = localStorage.getItem('cart2709');
    const productsParse = JSON.parse(localStorageProducts);
    const sum = productsParse.reduce((ac, product) => ac + product.quantity, 0);
    dispatch(setProductsSum(sum));
  };

  const handleAddToCart = (produc) => {
    const {
      price,
      title,
      thumbnail,
      id,
      available_quantity: availableQuantity,
      shipping,
    } = produc;
    const cartFromLocalSt = localStorage.getItem('cart2709');
    const productsPriceLocal = localStorage.getItem('productsPrice2709');
    const cart = JSON.parse(cartFromLocalSt);
    const productsPriceData = JSON.parse(productsPriceLocal);
    const isProduct = cart?.find((p) => p.id === id);
    if (isProduct) {
      return alert(
        'Você já possui esse item!'
          + ' Para adicionar mais desse item acesse seu carrinho de compras 🛒',
      );
    }
    const product = {
      price,
      title,
      thumbnail,
      id,
      quantity: 1,
      availableQuantity,
      shipping,
    };
    const productPrice = {
      id,
      price,
    };
    productsPriceData.push(productPrice);
    cart.push(product);
    localStorage.setItem('cart2709', JSON.stringify(cart));
    localStorage.setItem(
      'productsPrice2709',
      JSON.stringify(productsPriceData),
    );
    productsSum();
  };

  return (
    <div className="products">
      {!isLoading ? (
        products.map((p) => (
          <div
            role="link"
            onKeyDown={ handleClick }
            onClick={ () => handleClick(p.id) }
            data-testid="product"
            key={ p.id }
            tabIndex={ 0 }
            className="card-p"
          >
            <Link
              className="link"
              data-testid="product-detail-link"
              to="/details"
            >
              <img
                title={ p.title }
                className="card-img"
                src={ p.thumbnail }
                alt={ p.title }
              />
              {p.shipping.free_shipping && (
                <p data-testid="free-shipping">Frete grátis</p>
              )}
              <p title={ p.title } className="product-title">
                {p.title.substring(0, titleLenght)}
                {p.title.length > titleLenght ? '...' : ''}
              </p>
            </Link>
            <div className="price-btn">
              <span>
                R$
                {' '}
                {p.price.toFixed(2)}
              </span>
              <button
                onClick={ () => handleAddToCart(p) }
                data-testid="product-add-to-cart"
                type="button"
                className="btn btn-primary btn-cards"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <img className="loading-img" src={ loading } alt="loading" />
      )}
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
