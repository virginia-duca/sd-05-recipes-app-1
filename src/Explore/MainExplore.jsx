/** @format */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';
import { appPage, prettifyRecipe } from '../Services/Utils';
import api from '../Services/FetchAPI';

const MainExplore = ({ pathname, redirect }) => {
  const [surprise, setSurprise] = useState([]);

  function handleClick(string) {
    return pathname === '/explorar/comidas'
      ? redirect(`/explorar/comidas/${string}`)
      : redirect(`/explorar/bebidas/${string}`);
  }

  useEffect(() => {
    const apis = pathname === '/explorar/comidas' ? api.food : api.drink;
    apis.searchRandomRecipe().then(({ 0: rec }) => setSurprise(prettifyRecipe(rec)));
  }, []);

  return (
    <div>
      <HeaderTwo
        titulo={pathname === '/explorar/comidas' ? 'Explorar Comidas' : 'Explorar Bebidas'}
      />
      <button onClick={() => handleClick('ingredientes')} data-testid="explore-by-ingredient">
        Por Ingredientes
      </button>
      {pathname === '/explorar/comidas' ? (
        <button onClick={() => handleClick('area')} data-testid="explore-by-area">
          Por Local de Origem
        </button>
      ) : null}
      <button
        onClick={() => redirect(`/${surprise.type}s/${surprise.id}`)}
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <MenuInferior />
    </div>
  );
};

MainExplore.propTypes = {
  redirect: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default appPage(MainExplore);
