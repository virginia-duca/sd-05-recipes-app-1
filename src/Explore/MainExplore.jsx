/** @format */

import React from 'react';
import ExploreDrink from './ExploreDrink';
import ExploreFood from './ExploreFood';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';

class MainExplore extends React.Component {
  render() {
    const explore = 'Explorar';
    return (
      <div>
        <h1>Explorar</h1>
        <HeaderTwo titulo={explore} />
        <ExploreDrink />
        <ExploreFood />
        <MenuInferior />
      </div>
    );
  }
}

export default MainExplore;
