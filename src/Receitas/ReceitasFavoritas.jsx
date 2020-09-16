/** @format */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderTwo from '../Header/HeaderTwo';
import storage from '../Services/LocalStorage';
import NewCardFavoritos from './NewCardFavoritos';
import { appPage } from '../Services/Utils';

function ReceitasFavoritas({ redirect }) {
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
      <h1>Receitas Favoritas</h1>
      <HeaderTwo titulo={'Receitas Favoritas'} />
      <button
        onClick={() => setReceitasFavoritas(rcps)}
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button onClick={() => filtro('comida')} data-testid="filter-by-food-btn">
        Food
      </button>
      <button
        onClick={() => filtro('bebida')}
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {receitasFavoritas.map((recipe, i) => (
        <div>
          <NewCardFavoritos recipe={recipe} index={i} redirect={redirect} />
        </div>
      ))}
    </div>
  );
}

ReceitasFavoritas.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default appPage(ReceitasFavoritas);
