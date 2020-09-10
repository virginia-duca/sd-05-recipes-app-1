/** @format */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainFood from '../MainPage/MainFood';
import LogIn from '../Login/LogIn';
import Profile from './Profile';
import MainDrinks from '../MainPage/MainDrinks';
import MainExplore from '../Explore/MainExplore';
import ExploreFood from '../Explore/ExploreFood';
import ExploreDrink from '../Explore/ExploreDrink';
import ReceitasFeitas from '../Receitas/ReceitasFeitas';
import ReceitasFavoritas from '../Receitas/ReceitasFavoritas';

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route path="/comidas">
          <MainFood />
        </Route>
        <Route path="/comidas/{id-da-receita}" />
        <Route path="/comidas/{id-da-receita}/in-progress" />
        <Route path="/bebidas">
          <MainDrinks />
        </Route>
        <Route path="/bebidas/{id-da-receita}" />
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
