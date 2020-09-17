/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';
import { appPage } from '../Services/Utils';
/* import api from '../Services/FetchAPI';
import AppContext from '../Context/AppContext'; */

const MainExplore = ({ pathname, redirect }) => {
  /* const { fetch } = useContext(AppContext); */

  function handleClick(string) {
    return pathname === '/explorar/comidas'
      ? redirect(`/explorar/comidas/${string}`)
      : redirect(`/explorar/bebidas/${string}`);
  }
  /*  const surpriseMe = () => {
    const apis = pathname === path ? api.food : api.drink;
    const fetchs = pathname === path ? fetch.setFood : fetch.setDrink;
  }; */

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
      <button /* onClick={() => surpriseMe()} */ data-testid="explore-surprise">
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
