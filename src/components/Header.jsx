import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Header() {
  return (
    <div>
      Header
      <Link to="/cart">
        <button data-testid="shopping-cart-button" type="button">Cart</button>
      </Link>

    </div>
  );
}

export default Header;
