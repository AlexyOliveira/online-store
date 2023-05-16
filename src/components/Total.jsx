import React from 'react';
import PropTypes from 'prop-types';
import '../pages/Cart.css';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Total({ totalPriceState }) {
  const { location } = useHistory();
  return (
    <div>
      <div className="total">
        <div className="total-price-value">
          <p>Valor Total Da Compra:</p>
          <span>
            $
            {totalPriceState}
          </span>
        </div>
        {location.pathname === '/cart' && (
          <Link to="/checkout">
            <button data-testid="checkout-products" type="button">
              Finalizar compra
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

Total.propTypes = {};

export default Total;
