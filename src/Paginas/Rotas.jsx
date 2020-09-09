import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LogIn from '../Login/LogIn';
import Profile from './Profile';
import Search from './Search';
import MainFood from './MainPage/MainFood';
import MainDrinks from './MainPage/MainDrinks';

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
        <Route path="/explorar">
          <Search />
        </Route>
        <Route path="/explorar/comidas" />
        <Route path="/explorar/bebidas" />
        <Route path="/explorar/comidas/ingredientes" />
        <Route path="/explorar/bebidas/ingredientes" />
        <Route path="/explorar/comidas/area" />
        <Route path="/perfil">
          <Profile />
        </Route>
        <Route path="/receitas-feitas" />
        <Route path="/receitas-favoritas" />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
