import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderTwo from '../Header/HeaderTwo';
import storage from '../Services/LocalStorage';
import NewCard from './NewCard';
import RecipeCard from './RecipeCard';
import { appPage } from '../Services/Utils';

import './style.css';

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
      <HeaderTwo titulo={'Receitas Feitas'} />
      <div className="menu-container done-list">
      	<button
          className="btn"
      	  data-testid="filter-by-all-btn"
      	  onClick={() => setDoneRecipes(storage.getValueByKey('doneRecipes'))}
      	>
          <i class="material-icons left white-text">more_horiz</i>
      	  All
      	</button>
        <button
          className="btn"
          data-testid="filter-by-food-btn" onClick={() => handleClick('comida')}
        >
          <i class="material-icons left white-text">local_dining</i>
      	  Food
      	</button>
      	<button
          className="btn"
          data-testid="filter-by-drink-btn" onClick={() => handleClick('bebida')}
        >
          <i class="material-icons left white-text">local_bar</i>
      	  Drinks
      	</button>
      </div>
      
      {doneRecipes.map((recipe, i) => (
        <RecipeCard recipe={recipe} index={i} redirect={redirect} />
        // <NewCard recipe={recipe} index={i} redirect={redirect} />
      ))}
    </div>
  );
};

ReceitasFeitas.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default appPage(ReceitasFeitas);
