import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Categories from '../components/Categories';

function InitialPage() {
  const products = useSelector((state) => state.searchReducer.products);
  return (
    <div className="initial-page">
      <Header />
      <Categories />
      {products.length < 1 ? (
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
      ) : (
        <div className="products">
          { products.map(({ id, price, title, thumbnail }) => (
            <div data-testid="product" key={ id }>
              {' '}
              <img src={ thumbnail } alt={ title } />
              {' '}
              <p>{title}</p>
              {' '}
              <span>{price}</span>
              {' '}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InitialPage;
