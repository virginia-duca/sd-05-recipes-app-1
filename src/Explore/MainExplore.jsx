import React from 'react';
import ExploreDrink from './ExploreDrink';
import ExploreFood from './ExploreFood';
import HeaderTwo from '../Header/HeaderTwo';


class MainExplore extends React.Component  {
  render() {
  const explore = "Explorar"
    return (
      <div>
        <h1>Explorar</h1>
        <HeaderTwo titulo={explore} />
        <ExploreDrink />
        <ExploreFood />
      </div>
    );
  }
}

export default MainExplore;
