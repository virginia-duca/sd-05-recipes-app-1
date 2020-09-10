/** @format */

import React from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';

class ExploreDrink extends React.Component {
  render() {
    const explore = 'Explorar Bebidas';
    return (
      <div>
        <h1>Explorar Bebidas</h1>
        <HeaderTwo titulo={explore} />
        <MenuInferior />
      </div>
    );
  }
}

export default ExploreDrink;
