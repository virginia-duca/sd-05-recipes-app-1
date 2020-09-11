import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LogIn from '../Login/LogIn';

// Food
import MainFood from '../MainPage/MainFood';
import ExploreFood from '../Explore/ExploreFood';

// Drink
import MainDrinks from '../MainPage/MainDrinks';
import ExploreDrink from '../Explore/ExploreDrink';

// Details
import Detail from '../DetailPage/Detail';

import Profile from './Profile';
import MainExplore from '../Explore/MainExplore';
import ReceitasFeitas from '../Receitas/ReceitasFeitas';
import ReceitasFavoritas from '../Receitas/ReceitasFavoritas';

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route exact path="/comidas">
          <MainFood />
        </Route>
        <Route path="/comidas/:id">
          <Detail />
        </Route>
        <Route path="/comidas/{id-da-receita}/in-progress" />
        <Route exact path="/bebidas">
          <MainDrinks />
        </Route>
        <Route path="/bebidas/:id">
          <Detail />
        </Route>
        <Route path="/bebidas/{id-da-receita}/in-progress" />
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
