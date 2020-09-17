/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';
import { appPage } from '../Services/Utils';

const Explore = ({ redirect }) => {
  const explore = 'Explorar';
  return (
    <div>
      <HeaderTwo titulo={explore} />
      <button data-testid="explore-food" onClick={() => redirect('/explorar/comidas')}>
        Explorar Comidas
      </button>
      <button data-testid="explore-drinks" onClick={() => redirect('/explorar/bebidas')}>
        Explorar Bebidas
      </button>
      <MenuInferior />
    </div>
  );
};

Explore.propTypes = {
  redirect: PropTypes.func.isRequired,
};

export default appPage(Explore);
