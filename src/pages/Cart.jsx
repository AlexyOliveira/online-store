/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable sonarjs/no-use-of-empty-return-value */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { setProductsSum } from '../redux/actions';
import Header from '../components/Header';

function Cart() {
  const [cartList, setCartList] = useState();
  const [totalPriceState, setTotalPriceState] = useState(0);
  const dispatch = useDispatch();
  const { location } = useHistory();
  const titleLenght = 20;

  const handleClick = (id) => {
    localStorage.setItem('id', id);
  };

  const productsSumIncrease = () => {
    const localStorageProducts = localStorage.getItem('cart2709');
    const productsParse = JSON.parse(localStorageProducts);
    const sum = productsParse.reduce((ac, product) => ac + product.quantity, 0);
    dispatch(setProductsSum(sum));
  };

  const productsSumDecrease = () => {
    const localStorageProducts = localStorage.getItem('cart2709');
    const productsParse = JSON.parse(localStorageProducts);
    const sum = productsParse.reduce((ac, product) => ac - product.quantity, 0);
    dispatch(setProductsSum(sum));
  };

  const totalPrice = () => {
    const cartFromLocalSt = localStorage.getItem('cart2709');
    const cart = JSON.parse(cartFromLocalSt);
    const precoTotal = cart?.reduce(
      (acc, produto) => acc + Number(produto.price),
      0,
    );
    setTotalPriceState(precoTotal?.toFixed(2));
    return precoTotal;
  };

  useEffect(() => {
    const cartFromLocalSt = localStorage.getItem('cart2709');
    const cart = JSON.parse(cartFromLocalSt);
    productsSumIncrease();
    totalPrice();
    setCartList(cart);
  }, []);

  const increaseHandle = (productId) => {
    const productsPriceLocal = localStorage.getItem('productsPrice2709');
    const cart = localStorage.getItem('cart2709');

    const productsPriceData = JSON.parse(productsPriceLocal);
    const cartData = JSON.parse(cart);

    const price = productsPriceData.filter(
      (product) => product.id === productId,
    );
    const newCartList = cartData.map((product) => {
      if (
        product.id === productId
        && product.quantity < product.availableQuantity
      ) {
        return {
          ...product,
          quantity: product.quantity + 1,
          price: price[0].price + product.price,
        };
      }
      return product;
    });
    setCartList(newCartList);
    localStorage.setItem('cart2709', JSON.stringify(newCartList));
    totalPrice();
    productsSumIncrease();
  };

  const decreaseHandle = (productId) => {
    const productsPriceLocal = localStorage.getItem('productsPrice2709');
    const cart = localStorage.getItem('cart2709');
    const productsPriceData = JSON.parse(productsPriceLocal);
    const cartData = JSON.parse(cart);
    const [price] = productsPriceData.filter(
      (product) => product.id === productId,
    );
    const newCartList = cartData.map((product) => {
      if (product.id === productId) {
        const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1;
        return {
          ...product,
          quantity: newQuantity,
          price:
            product.price >= price.price + 1
              ? product.price - price.price
              : price.price,
        };
      }
      return product;
    });
    setCartList(newCartList);
    localStorage.setItem('cart2709', JSON.stringify(newCartList));
    totalPrice();
    productsSumDecrease();
  };

  const deleteHandle = (id) => {
    const newCartList = cartList.filter((product) => product.id !== id);
    setCartList(newCartList);
    localStorage.setItem('cart2709', JSON.stringify(newCartList));
    totalPrice();
    productsSumIncrease();
  };
  return (
    <div className="cart-container-area">
      <Header />
      {!cartList || !cartList.length ? (
        <h3 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h3>
      ) : (
        <div className="cart-products">
          {location.pathname === '/cart' && <h2>Carrinho de Compras</h2>}
          <hr className="cart-card hr" />
          <ul className="ul-cart">
            {cartList?.map((product, index) => (
              <div className="cart-card" key={ product.id + index }>
                <li className="cart-card-info">
                  <span
                    className="card-info-delete"
                    onClick={ () => deleteHandle(product.id) }
                    data-testid="remove-product"
                  >
                    X
                  </span>
                  <div className="img-title">
                    <Link to="/details">
                      <img
                        onClick={ () => handleClick(product.id) }
                        src={ product.thumbnail }
                        alt={ product.title }
                        style={ { cursor: 'pointer' } }
                      />
                    </Link>
                    <p
                      data-testid="shopping-cart-product-name"
                      title={ product.title }
                      className="product-title"
                    >
                      {product.title.substring(0, titleLenght)}
                      {product.title.length > titleLenght ? '...' : ''}
                    </p>
                  </div>

                  <div className="inc-dec">
                    <div
                      className="more-less btn"
                      onClick={ () => decreaseHandle(product.id) }
                      data-testid="product-decrease-quantity"
                    >
                      -
                    </div>
                    <div
                      className="m-3 product-quantity"
                      data-testid="shopping-cart-product-quantity"
                    >
                      {product.quantity}
                    </div>
                    <div
                      className="more-less btn"
                      onClick={ () => increaseHandle(product.id) }
                      data-testid="product-increase-quantity"
                    >
                      +
                    </div>
                  </div>
                  <span className="price">
                    $
                    {product.price.toFixed(2)}
                  </span>
                </li>
                <p className="quantity">
                  Disponível:
                  {' '}
                  {product.availableQuantity}
                </p>
                <hr />
              </div>
            ))}
          </ul>
        </div>
      )}
      <div className="total">
        <div>
          <p>Valor Total Da Compra:</p>
          <span>
            $
            {totalPriceState}
          </span>
        </div>
        {location.pathname === '/cart' && (
          <Link to="/checkout">
            <button
              disabled={ !cartList?.length }
              data-testid="checkout-products"
              type="button"
            >
              Finalizar compra
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Cart;
