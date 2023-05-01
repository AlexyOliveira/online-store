import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import { saveProducts } from '../redux/actions';
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
    const products = await getProductsFromCategoryAndQuery(id, '');
    dispatch(saveProducts(products.results));
  };
  return (
    <div className="categories-container">
      <header className='cat'>Ctegories</header>
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
