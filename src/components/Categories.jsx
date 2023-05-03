import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import { isLoadingReducer, saveProducts } from '../redux/actions';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const allCategories = async () => {
      const categoriesReturn = await getCategories();
      setCategories(categoriesReturn);
    };
    allCategories();
  }, []);

  const handleClick = async (id) => {
    dispatch(isLoadingReducer(true));
    const products = await getProductsFromCategoryAndQuery(id, '');
    dispatch(isLoadingReducer(false));
    dispatch(saveProducts(products.results));
  };
  return (
    <div className="categories-container">
      <ul>
        {categories.map((categorie) => (
          <li
            onClick={ () => handleClick(categorie.id) }
            data-testid="category"
            key={ categorie.id }
            className="li-categorie"
          >
            {categorie.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
