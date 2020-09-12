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
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route exact path="/comidas">
          <MainFoodCopy />
        </Route>
        <Route exact path="/comidas/:id">
          <Detail />
        </Route>
        <Route path="/comidas/:id/in-progress">
          <ReceitasEmProgresso />
        </Route>
        <Route exact path="/bebidas">
          <MainFoodCopy/>
        </Route>
        <Route exact path="/bebidas/:id">
          <Detail />
        </Route>
        <Route path="/bebidas/:id/in-progress">
          <ReceitasEmProgresso />
        </Route>
        <Route exact path="/explorar">
          <MainExplore />
        </Route>
        <Route path="/explorar/comidas">
          <ExploreFood />
        </Route>
        <Route path="/explorar/bebidas">
          <ExploreDrink />
        </Route>
        <Route path="/explorar/comidas/ingredientes" />
        <Route path="/explorar/bebidas/ingredientes" />
        <Route path="/explorar/comidas/area" />
        <Route path="/perfil">
          <Profile />
        </Route>
        <Route path="/receitas-feitas">
          <ReceitasFeitas />
        </Route>
        <Route path="/receitas-favoritas">
          <ReceitasFavoritas />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
