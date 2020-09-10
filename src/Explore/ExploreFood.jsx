/** @format */

import React from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';

class ExploreFood extends React.Component {
  render() {
    return (
      <div>
        <h1>Explorar Comidas</h1>
        <HeaderTwo titulo={'Explorar Comidas'} />
        <MenuInferior />
      </div>
    );
  }
}

export default ExploreFood;
