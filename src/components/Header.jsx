import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { saveProducts } from '../redux/actions';

function Header() {
  const sumReducer = useSelector((state) => state.productsSumReducer.sum);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  const handleClick = async () => {
    const products = await getProductsFromCategoryAndQuery('', input);
    dispatch(saveProducts(products.results));
    history.push('/');
  };

  return (
    <div>
      <div className="searchField">
        <input
          onChange={ handleChange }
          data-testid="query-input"
          placeholder="Type your search"
          type="text"
        />
        <button onClick={ handleClick } data-testid="query-button" type="button">
          Search
        </button>
      </div>
      Header
      <Link to="/cart">
        <button data-testid="shopping-cart-button" type="button">
          Cart
          {' '}
          <strong data-testid="shopping-cart-size">{Math.abs(sumReducer)}</strong>
        </button>
      </Link>
    </div>
  );
}

export default Header;
