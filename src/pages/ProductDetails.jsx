import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { getProductById } from '../services/api';

function ProductDetails() {
  // const id = useSelector((state) => state.productIdReducer.id);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [thumb, setThumb] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const LocalStorageId = localStorage.getItem('id');
      const productResult = await getProductById(LocalStorageId);
      const { pictures } = productResult;
      setThumb(pictures[0].url);
      setProduct(productResult);
      setLoading(false);
    };
    getProduct();
  }, []);
  return (
    <div>
      <Header />
      <div>
        {loading ? (
          <h1>carregando..</h1>
        ) : (
          <div>
            <p data-testid="product-detail-name">{product.title}</p>
            <img
              data-testid="product-detail-image"
              src={ thumb }
              alt={ product.title }
            />
            <span data-testid="product-detail-price">{product.price}</span>
          </div>

        )}
      </div>
    </div>
  );
}

export default ProductDetails;
