/** @format */

import React, { useState, useEffect } from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import storage from '../Services/LocalStorage';
import NewCard from './NewCard';

export default function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([])

  useEffect(() => {
    const recipes = storage.getValueByKey('doneRecipes')
    setDoneRecipes(recipes);
  }, [])
  return (
    <div>
      <h1>Receitas Feitas</h1>
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-food-btn">Food</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      <HeaderTwo titulo={'Receitas Feitas'} />
      {doneRecipes.map((recipe, i) => <NewCard recipe={recipe} index={i} />)}
    </div>
  );
}
