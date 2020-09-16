/** @format */

import React, {useEffect} from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import MenuInferior from '../Header/MenuInferior';
import {appPage} from '../Services/Utils';

const MainExplore = ({pathname, redirect}) => {
    const explore = 'Explorar';
    const path = pathname === '/explorar/comidas'

    const handleClick = (string) => {
      path ? redirect(`/explorar/comidas/${string}`) : redirect(`/explorar/bebidas/${string}`) 
    }
    
    return (
      <div>
        <HeaderTwo titulo={explore} />
        <button onClick={() => handleClick('ingredientes')} data-testid="explore-by-ingredient">Por Ingredientes</button>
        {path ? <button onClick={() => handleClick('area')} data-testid="explore-by-area">Por Local de Origem</button> : null}
        <button data-testid="explore-surprise">Me Surpreenda!</button>
        <MenuInferior />
      </div>
    );
}

export default appPage(MainExplore);
