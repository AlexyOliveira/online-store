import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import { setProductsSum } from '../redux/actions';
import './InitialPage.css';

function InitialPage() {
  const products = useSelector((state) => state.searchReducer.products);
  const dispatch = useDispatch();

  const productsSum = () => {
    const localStorageProducts = localStorage.getItem('cart2709');
    const productsParse = JSON.parse(localStorageProducts);
    const sum = productsParse.reduce((ac, product) => ac + product.quantity, 0);
    dispatch(setProductsSum(sum));
  };

  useEffect(() => {
    const isCart = localStorage.getItem('cart2709');
    const isProductsPrice = localStorage.getItem('productsPrice2709');
    if (!isCart) {
      localStorage.setItem('cart2709', JSON.stringify([]));
    }
    if (!isProductsPrice) {
      localStorage.setItem('productsPrice2709', JSON.stringify([]));
    }
    productsSum();
  }, []);
  return (
    <div className="initial-page">
      <Header />
      <div className="initial-page-inside-box">
        <div id="initial-p-categories">
          <Categories />
        </div>
        {products.length < 1 ? (
          <div className="no-search">
            <h2>voce ainda não realizou uma busca</h2>
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </div>
        ) : <ProductCard products={ products } />}
      </div>
    </div>
  );
}

export default InitialPage;
