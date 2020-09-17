/** @format */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    setDoneRecipes(storage.getValueByKey('doneRecipes'));
  }, []);

  // prettier ignore
  return (
    <div>
      <h1>Receitas Feitas</h1>
      <button
        data-testid="filter-by-all-btn"
        onClick={() => setDoneRecipes(storage.getValueByKey('doneRecipes'))}
      >
        All
      </button>
      <button data-testid="filter-by-food-btn" onClick={() => handleClick('comida')}>
        Food
      </button>
      <button data-testid="filter-by-drink-btn" onClick={() => handleClick('bebida')}>
        Drinks
      </button>
      <HeaderTwo titulo={'Receitas Feitas'} />
      {doneRecipes.map((recipe, i) => (
        <NewCard recipe={recipe} index={i} redirect={redirect} />
      ))}
    </div>
  );
};

ReceitasFeitas.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default appPage(ReceitasFeitas);
