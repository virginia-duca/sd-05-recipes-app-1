/** @format */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LogIn from '../Login/LogIn';

// Food
import MainFoodCopy from '../MainPage/MainFood copy';
import ExploreFood from '../Explore/ExploreFood';

// Drink
import ExploreDrink from '../Explore/ExploreDrink';

// Details
import Detail from '../DetailPage/Detail';

import Profile from './Profile';
import MainExplore from '../Explore/MainExplore';
import ReceitasFeitas from '../Receitas/ReceitasFeitas';
import ReceitasFavoritas from '../Receitas/ReceitasFavoritas';
import ReceitasEmProgresso from '../Receitas/ReceitasEmPrgresso';

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
        <Route exact path="/explorar" component={MainExplore} />
        <Route path="/explorar/comidas" component={ExploreFood} />
        <Route path="/explorar/bebidas" component={ExploreDrink} />
        <Route path="/explorar/comidas/ingredientes" /* component={} */ />
        <Route path="/explorar/bebidas/ingredientes" /* component={} */ />
        <Route path="/explorar/comidas/area" /* component={} */ />
        <Route path="/perfil" component={Profile} />
        <Route path="/receitas-feitas" component={ReceitasFeitas} />
        <Route path="/receitas-favoritas" component={ReceitasFavoritas} />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
