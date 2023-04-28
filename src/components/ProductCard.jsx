import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { setProductsSum } from '../redux/actions';

function ProductCard({ products }) {
  const dispatch = useDispatch();
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
      {products.map((p) => (
        <div
          role="link"
          onKeyDown={ handleClick }
          onClick={ () => handleClick(p.id) }
          data-testid="product"
          key={ p.id }
          tabIndex={ 0 }
        >
          <Link data-testid="product-detail-link" to="/details">
            <img src={ p.thumbnail } alt={ p.title } />
            {p.shipping.free_shipping && (
              <p data-testid="free-shipping">Frete grátis</p>
            )}
            <p>{p.title}</p>
          </Link>
          <span>
            R$
            {' '}
            {p.price.toFixed(2)}
          </span>
          <button
            onClick={ () => handleAddToCart(p) }
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
