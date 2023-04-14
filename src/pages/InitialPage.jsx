import React from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';

function InitialPage() {
  return (
    <div className="initial-page">
      <Header />
      <Categories />
      <h2 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h2>
    </div>

  );
}

export default InitialPage;
