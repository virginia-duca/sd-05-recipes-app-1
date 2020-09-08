import React from 'react';
import { BrowseRouter, Route, Switch } from 'react-router-dom';

function Rotas() {
	return(
		<BrowseRouter>
			<Switch>
				<Route path="/comidas" />
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
		</BrowseRouter>
	)};

export default Rotas;
