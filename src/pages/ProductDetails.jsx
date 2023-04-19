import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { getProductById } from '../services/api';

function ProductDetails() {
  // const id = useSelector((state) => state.productIdReducer.id);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thumb, setThumb] = useState([]);
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const localCart = localStorage.getItem('cart2709');
      if (!localCart) {
        localStorage.setItem('cart2709', JSON.stringify([]));
      }
      setLoading(true);
      const LocalStorageId = localStorage.getItem('id');
      const productResult = await getProductById(LocalStorageId);
      const { pictures, attributes } = productResult;
      setThumb(pictures[0].url);
      setDetails(attributes);
      setProduct(productResult);
      setLoading(false);
    };
    getProduct();
  }, []);

  const handleClick = (id, price, thumbnail, title) => {
    const producData = {
      id,
      price,
      quantity: 1,
      thumbnail,
      title,
    };
    const localCart = localStorage.getItem('cart2709');
    const cart = JSON.parse(localCart);
    const isProduct = cart?.find((c) => c.id === id);
    if (isProduct) {
      return alert('Você já possui esse item no seu carrinho! 🛒');
    }
    cart.push(producData);
    localStorage.setItem('cart2709', JSON.stringify(cart));
  };

  return (
    <div>
      <Header />
      <div>
        {loading ? (
          <h1>carregando..</h1>
        ) : (
          <>
            <div>
              <p data-testid="product-detail-name">{product.title}</p>
              <img
                data-testid="product-detail-image"
                src={ thumb }
                alt={ product.title }
              />
              <span data-testid="product-detail-price">
                R$
                {' '}
                {product.price}
                {/* problema com toFixed no price */}
              </span>
            </div>
            <div className="descriptions">
              <ul>
                {details.map(
                  (detail) => detail.value_name && (
                    <li key={ detail.id }>
                      <span style={ { color: 'red' } }>{detail.name}</span>
                      {': '}
                      {detail.value_name}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </>
        )}
        <button
          onClick={ () => handleClick(
            product.id,
            product.price,
            product.thumbnail,
            product.title,
          ) }
          data-testid="product-detail-add-to-cart"
          type="button"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
