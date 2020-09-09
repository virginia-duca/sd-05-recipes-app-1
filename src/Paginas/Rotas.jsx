import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainFood from '../MainPage/MainFood'
/* import LoginPage from './Login'; */
import LogIn from '../Login/LogIn';

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route path="/comidas" component={MainFood}/>
        <Route path="/comidas/{id-da-receita}" />
        <Route path="/comidas/{id-da-receita}/in-progress" />
        <Route path="/bebidas" />
        <Route path="/bebidas/{id-da-receita}" />
        <Route path="/bebidas/{id-da-receita}/in-progress" />
        <Route path="/explorar" />
        <Route path="/explorar/comidas" />
        <Route path="/explorar/bebidas" />
        <Route path="/explorar/comidas/ingredientes" />
        <Route path="/explorar/bebidas/ingredientes" />
        <Route path="/explorar/comidas/area" />
        <Route path="/perfil" />
        <Route path="/receitas-feitas" />
        <Route path="/receitas-favoritas" />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
