/** @format */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';
import { appPage, prettifyRecipe } from '../Services/Utils';
import api from '../Services/FetchAPI';
import './Explore.css'

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
      <div className="explore-btns">
        <div className="btn1">
          <button 
          onClick={() => handleClick('ingredientes')} 
          data-testid="explore-by-ingredient"
          className="btn waves-light btn-large white black-text"
          >
            <i class="left material-icons">kitchen</i>
            Por Ingredientes
          </button>
          </div>
          {pathname === '/explorar/comidas' ? (
            <div className="btn1">
            <button 
            onClick={() => handleClick('area')} 
            data-testid="explore-by-area"
            className="btn waves-light btn-large white black-text"
            >
              <i class="left material-icons">location_city</i>
              Por Local de Origem
            </button>
            </div>
          ) : null}
          <div className="btn1"> 
          <button
            onClick={() => redirect(`/${surprise.type}s/${surprise.id}`)}
            data-testid="explore-surprise"
            className="btn waves-light btn-large white black-text "
          >
            <i class="left material-icons">explore</i>
            Me Surpreenda!
          </button>
        </div>
      </div>
      <MenuInferior />
    </div>
  );
};

MainExplore.propTypes = {
  redirect: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default appPage(MainExplore);
