/** @format */

import React, { useState, useEffect } from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import storage from '../Services/LocalStorage';
import NewCard from './NewCard';
import { appPage } from '../Services/Utils';

const ReceitasFeitas = ({ redirect }) => {
  const [doneRecipes, setDoneRecipes] = useState([]);

  const handleClick = (param) => {
    const filterd = storage.getValueByKey('doneRecipes').filter((recipe) => recipe.type === param);
    return setDoneRecipes(filterd);
  };

  useEffect(() => {
    console.log('chamando useE');
    setDoneRecipes(storage.getValueByKey('doneRecipes'));
  }, []);

  return (
    <div>
      <h1>Receitas Feitas</h1>
      <button
        data-testid='filter-by-all-btn'
        onClick={() => setDoneRecipes(storage.getValueByKey('doneRecipes'))}>
        All
      </button>
      <button data-testid='filter-by-food-btn' onClick={() => handleClick('comida')}>
        Food
      </button>
      <button data-testid='filter-by-drink-btn' onClick={() => handleClick('bebida')}>
        Drinks
      </button>
      <HeaderTwo titulo={'Receitas Feitas'} />
      {doneRecipes.map((recipe, i) => (
        <NewCard recipe={recipe} index={i} redirect={redirect} pathname={pathname} />
      ))}
    </div>
  );
};

export default appPage(ReceitasFeitas);
