import React, { useEffect, useState } from 'react';

function Cart() {
  const [cartList, setCartList] = useState();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const cartFromLocalSt = localStorage.getItem('cart2709');
    const cart = JSON.parse(cartFromLocalSt);
    setCartList(cart);
  }, []);
  return (
    <div>
      {console.log(cartList)}
      {!cartList || !cartList.length ? (
        <h2 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h2>
      ) : (
        <div>
          <ul>
            {cartList.map((product) => (
              <li key={ product.id }>
                <span>X</span>
                <img src={ product.thumbnail } alt={ product.title } />
                <p data-testid="shopping-cart-product-name">{product.title}</p>
                <div>
                  <div>-</div>
                  <div data-testid="shopping-cart-product-quantity">{quantity}</div>
                  <div>+</div>
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
    </div>
  );
}

export default Cart;
