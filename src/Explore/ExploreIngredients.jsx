/** @format */

import React, { useEffect, useState } from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';
import api from '../Services/FetchAPI'
import{ appPage }from '../Services/Utils'

const ExploreIngredients = ({pathname, redirect}) => {
  const [ingredients, setIngredients ] = useState([]) 
    const explore = 'Explorar ingredientes';
    const path = pathname.includes('comidas')

  useEffect(() => {
   const apis = path ? api.food : api.drink
   apis.getIngredients().then((igr) => setIngredients(igr.slice(0, 12)))
  }, [])
    return (
      <div>
        <HeaderTwo titulo={explore} />
        <div>
          {ingredients.map((igr) => 
          <button>
            <div>
              <img src={path 
              ? `https://www.themealdb.com/images/ingredients/${igr.strIngredient}-Small.png`
              : `https://www.thecocktaildb.com/images/ingredients/${igr.strIngredient1}-Small.png`} 
              />
              <p>{path ? igr.strIngredient : igr.strIngredient1}</p>
            </div>
          </button>
          )}
        </div>
        {console.log(ingredients)}
        <MenuInferior />
      </div>
    );
}

export default appPage(ExploreIngredients);
