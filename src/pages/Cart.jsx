import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Cart() {
  const [cartList, setCartList] = useState();
  const [totalPriceState, setTotalPriceState] = useState(0);
  // const [productPrice, setProductPrice] = useState();
  const { location } = useHistory();

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
    totalPrice();
    setCartList(cart);
  }, []);

  const increaseHandle = (productId) => {
    const productsPriceLocal = localStorage.getItem('productsPrice2709');
    const productsPriceData = JSON.parse(productsPriceLocal);
    const price = productsPriceData.filter(
      (product) => product.id === productId,
    );
    const newCartList = cartList.map((product) => {
      if (product.id === productId) {
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
  };

  const decreaseHandle = (productId) => {
    const productsPriceLocal = localStorage.getItem('productsPrice2709');
    const productsPriceData = JSON.parse(productsPriceLocal);
    const price = productsPriceData.filter(
      (product) => product.id === productId,
    );
    const newCartList = cartList.map((product) => {
      if (product.id === productId) {
        const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1;
        return {
          ...product,
          quantity: newQuantity,
          price:
            product.price > price[0].price
              ? product.price - price[0].price
              : price[0].price,
        };
      }
      return product;
    });
    setCartList(newCartList);
    localStorage.setItem('cart2709', JSON.stringify(newCartList));
    totalPrice();
  };

  const deleteHandle = (id) => {
    const newCartList = cartList.filter((product) => product.id !== id);
    setCartList(newCartList);
    localStorage.setItem('cart2709', JSON.stringify(newCartList));
    totalPrice();
  };
  return (
    <div>
      {location.pathname === '/cart' && <h2>Carrinho de Compras</h2>}

      {!cartList || !cartList.length ? (
        <h3 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h3>
      ) : (
        <div>
          <ul>
            {cartList?.map((product) => (
              <li key={ product.id }>
                <span
                  onClick={ () => deleteHandle(product.id) }
                  data-testid="remove-product"
                >
                  X
                </span>
                <img src={ product.thumbnail } alt={ product.title } />
                <p data-testid="shopping-cart-product-name">{product.title}</p>
                <div>
                  <div
                    className="inc-dec"
                    onClick={ () => decreaseHandle(product.id) }
                    data-testid="product-decrease-quantity"
                  >
                    -
                  </div>
                  <div data-testid="shopping-cart-product-quantity">
                    {product.quantity}
                  </div>
                  <div
                    className="inc-dec"
                    onClick={ (event) => increaseHandle(product.id) }
                    data-testid="product-increase-quantity"
                  >
                    +
                  </div>
                </div>
                <span>
                  $
                  {product.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="total">
        <div>
          TOTAL: R$
          {totalPriceState}
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

export default Cart;
