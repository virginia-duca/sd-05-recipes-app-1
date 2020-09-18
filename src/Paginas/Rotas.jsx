/** @format */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LogIn from '../Login/LogIn';

// Food
import MainFoodCopy from '../MainPage/MainFood copy';

// Drink

// Details
import Detail from '../DetailPage/Detail';
import MainExplore from '../Explore/MainExplore';
import Profile from './Profile';
import Explore from '../Explore/Explore';
import ReceitasFeitas from '../Receitas/ReceitasFeitas';
import ReceitasFavoritas from '../Receitas/ReceitasFavoritas';
import ReceitasEmProgresso from '../Receitas/ReceitasEmPrgresso';
import ExploreIngredients from '../Explore/ExploreIngredients';
import ExploreAreaOrigem from '../Explore/ExploreAreaOrigem';

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/comidas" component={MainFoodCopy} />
        <Route exact path="/comidas/:id" component={Detail} />
        <Route path="/comidas/:id/in-progress" component={ReceitasEmProgresso} />
        <Route exact path="/bebidas" component={MainFoodCopy} />
        <Route exact path="/bebidas/:id" component={Detail} />
        <Route path="/bebidas/:id/in-progress" component={ReceitasEmProgresso} />
        <Route exact path="/explorar" component={Explore} />
        <Route exact path="/explorar/comidas" component={MainExplore} />
        <Route exact path="/explorar/bebidas" component={MainExplore} />
        <Route path="/explorar/comidas/ingredientes" component={ExploreIngredients} />
        <Route path="/explorar/bebidas/ingredientes" component={ExploreIngredients} />
        <Route exact path="/explorar/comidas/area" component={ExploreAreaOrigem} />
        <Route path="/perfil" component={Profile} />
        <Route path="/receitas-feitas" component={ReceitasFeitas} />
        <Route path="/receitas-favoritas" component={ReceitasFavoritas} />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
