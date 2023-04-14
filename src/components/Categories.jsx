import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const allCategories = async () => {
      const categoriesReturn = await getCategories();
      setCategories(categoriesReturn);
    };
    allCategories();
  }, []);
  return (
    <div>
      <ul>
        {categories.map((categorie) => (
          <li data-testid="category" key={ categorie.id }>
            {categorie.name}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Categories;
