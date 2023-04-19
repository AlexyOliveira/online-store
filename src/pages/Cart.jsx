import React, { useEffect, useState } from 'react';
import './Cart.css';

function Cart() {
  const [cartList, setCartList] = useState();
  // const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const cartFromLocalSt = localStorage.getItem('cart2709');
    const cart = JSON.parse(cartFromLocalSt);
    setCartList(cart);
  }, []);
  const increaseHandle = (productId) => {
    const newCartList = cartList.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCartList(newCartList);
    localStorage.setItem('cart2709', JSON.stringify(newCartList));
  };
  const decreaseHandle = (productId) => {
    const newCartList = cartList.map((product) => {
      if (product.id === productId) {
        const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1;
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setCartList(newCartList);
    localStorage.setItem('cart2709', JSON.stringify(newCartList));
  };

  const deleteHandle = (id) => {
    const newCartList = cartList.filter((product) => product.id !== id);
    setCartList(newCartList);
    localStorage.setItem('cart2709', JSON.stringify(newCartList));
  };
  return (
    <div>
      {!cartList || !cartList.length ? (
        <h2 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h2>
      ) : (
        <div>
          <ul>
            {cartList.map((product) => (
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
                    onClick={ () => increaseHandle(product.id) }
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
        <div>TOTAL</div>
      </div>
    </div>
  );
}

export default Cart;
