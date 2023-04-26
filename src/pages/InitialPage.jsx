import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';

function InitialPage() {
  const products = useSelector((state) => state.searchReducer.products);
  useEffect(() => {
    const isCart = localStorage.getItem('cart2709');
    const isProductsPrice = localStorage.getItem('productsPrice2709');
    if (!isCart) {
      localStorage.setItem('cart2709', JSON.stringify([]));
    }
    if (!isProductsPrice) {
      localStorage.setItem('productsPrice2709', JSON.stringify([]));
    }
  }, []);
  return (
    <div className="initial-page">
      <Header />
      <Categories />
      {products.length < 1 ? (
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
      ) : <ProductCard products={ products } />}
    </div>
  );
}

export default InitialPage;
