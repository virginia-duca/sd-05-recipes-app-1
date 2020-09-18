/** @format */

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../Context/AppContext';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';
import api from '../Services/FetchAPI';
import { appPage } from '../Services/Utils';

const ExploreIngredients = ({ pathname, redirect }) => {
  const { fetch } = useContext(AppContext);
  const [ingredients, setIngredients] = useState([]);
  const explore = 'Explorar ingredientes';
  const path = pathname.includes('comidas');

  useEffect(() => {
    const apis = path ? api.food : api.drink;
    apis.getIngredients().then((igr) => setIngredients(igr.slice(0, 12)));
  }, []);

  const handleClick = (igr) => {
    if (path) {
      fetch.setFilteredSearchBarFood(api.food.searchByIngredient(igr.strIngredient));
      return redirect('/comidas');
    }
    fetch.setFilteredSearchBarDrink(api.drink.searchByIngredient(igr.strIngredient1));
    return redirect('/bebidas');
    /* path
     ? fetch.setFilteredSearchBarFood(api.food.searchByIngredient(igr.strIngredient))
     : fetch.setFilteredSearchBarDrink(api.drink.searchByIngredient(igr.strIngredient1)) */
  };

  return (
    <div>
      <HeaderTwo titulo={explore} />
      <div>
        {ingredients.map((igr) => (
          <button onClick={() => handleClick(igr)}>
            <div>
              <img
                alt=""
                src={
                  path
                    ? `https://www.themealdb.com/images/ingredients/${igr.strIngredient}-Small.png`
                    : `https://www.thecocktaildb.com/images/ingredients/${igr.strIngredient1}-Small.png`
                }
              />
              <p>{path ? igr.strIngredient : igr.strIngredient1}</p>
            </div>
          </button>
        ))}
      </div>
      {console.log(ingredients)}
      <MenuInferior />
    </div>
  );
};

ExploreIngredients.propTypes = {
  redirect: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default appPage(ExploreIngredients);
