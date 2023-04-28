import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { getProductById } from '../services/api';
import Form from '../components/Form';
import { setProductsSum } from '../redux/actions';

function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thumb, setThumb] = useState([]);
  const [details, setDetails] = useState([]);
  const [isFreeShipping, setIsFreeShipping] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      const localCart = localStorage.getItem('cart2709');
      if (!localCart) {
        localStorage.setItem('cart2709', JSON.stringify([]));
      }
      setLoading(true);
      const LocalStorageId = localStorage.getItem('id');
      const productResult = await getProductById(LocalStorageId);
      const { pictures, attributes, shipping } = productResult;
      setThumb(pictures[0].url);
      setDetails(attributes);
      setProduct(productResult);
      setLoading(false);
      setIsFreeShipping(shipping.free_shipping);
    };
    getProduct();
  }, []);

  const productsSum = () => {
    const localStorageProducts = localStorage.getItem('cart2709');
    const productsParse = JSON.parse(localStorageProducts);
    const sum = productsParse.reduce((ac, produc) => ac + produc.quantity, 0);
    dispatch(setProductsSum(sum));
  };

  const handleClick = (produc) => {
    const {
      id,
      price,
      thumbnail,
      title,
      available_quantity: availableQuantity,
    } = produc;
    const producData = {
      price,
      title,
      thumbnail,
      id,
      quantity: 1,
      availableQuantity,
    };
    const localCart = localStorage.getItem('cart2709');
    const productsPriceLocal = localStorage.getItem('productsPrice2709');
    const cart = JSON.parse(localCart);
    const productsPriceData = JSON.parse(productsPriceLocal);
    const isProduct = cart?.find((p) => p.id === id);
    if (isProduct) {
      return alert(
        'Você já possui esse item!'
          + ' Para adicionar mais desse item acesse seu carrinho de compras 🛒',
      );
    }
    const productPrice = {
      id,
      price,
    };
    productsPriceData.push(productPrice);
    cart.push(producData);
    localStorage.setItem('cart2709', JSON.stringify(cart));
    localStorage.setItem(
      'productsPrice2709',
      JSON.stringify(productsPriceData),
    );
    productsSum();
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
              {isFreeShipping && (
                <p data-testid="free-shipping">Frete grátis</p>
              )}
              <img
                data-testid="product-detail-image"
                src={ thumb }
                alt={ product.title }
              />
              <span data-testid="product-detail-price">
                R$
                {' '}
                {product.price}
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
          onClick={ () => handleClick(product) }
          data-testid="product-detail-add-to-cart"
          type="button"
        >
          Adicionar ao Carrinho
        </button>
      </div>
      <Form productId={ product.id } />
    </div>
  );
}

export default ProductDetails;