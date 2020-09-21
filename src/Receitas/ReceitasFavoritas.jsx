/** @format */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderTwo from '../Header/HeaderTwo';
import storage from '../Services/LocalStorage';
import RecipeCard from './RecipeCard';
/* import NewCardFavoritos from './NewCardFavoritos'; */
import { appPage } from '../Services/Utils';

function ReceitasFavoritas({ redirect, pathname }) {
  const rcps = storage.getValueByKey('favoriteRecipes');
  const [receitasFavoritas, setReceitasFavoritas] = useState([]);

  useEffect(() => {
    setReceitasFavoritas(rcps);
  }, []);

  function filtro(tipo) {
    const filt = rcps.filter((f) => f.type === tipo);
    setReceitasFavoritas(filt);
  }

  return (
    <div>
      <HeaderTwo titulo={'Receitas Favoritas'} />
      <div className="select done-list ">
      <button
        className="btn"
        onClick={() => setReceitasFavoritas(rcps)}
        data-testid="filter-by-all-btn"
        >
        All
      </button>
      <button className="btn" onClick={() => filtro('comida')} data-testid="filter-by-food-btn">
        Food
      </button>
      <button
        className="btn"
        onClick={() => filtro('bebida')}
        data-testid="filter-by-drink-btn"
        >
        Drinks
      </button>
      </div>
      {receitasFavoritas.map((recipe, i) => (
        <div className="recipeCard-container">
          <RecipeCard recipe={recipe} index={i} redirect={redirect} pathname={pathname} />
        </div>
      ))}
    </div>
  );
}

ReceitasFavoritas.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default appPage(ReceitasFavoritas);
