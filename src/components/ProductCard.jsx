import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import { useDispatch } from 'react-redux';
// import { setProductId } from '../redux/actions';

function ProductCard({ products }) {
//   const dispatch = useDispatch();

  const handleClick = (id) => {
    // dispatch(setProductId(id));
    localStorage.setItem('id', id);
  };
  return (
    <div className="products">
      <Link data-testid="product-detail-link" to="/details">
        {products.map(({ id, price, title, thumbnail }) => (
          <div
            role="link"
            onKeyDown={ handleClick }
            onClick={ () => handleClick(id) }
            data-testid="product"
            key={ id }
            tabIndex={ 0 }
          >
            <img src={ thumbnail } alt={ title } />
            <p>{title}</p>
            <span>{price}</span>
          </div>
        ))}
      </Link>
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
