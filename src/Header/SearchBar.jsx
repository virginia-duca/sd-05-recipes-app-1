import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';


function SearchBar({ location: { pathname }, history }) {
  const { fetch, comidasFiltradas, bebidasFiltradas } = useContext(AppContext);
  const [filtroSelecionado, setFiltro] = useState('');
  const [inputText, setInputText] = useState('');

  function handleClick(setFilterFunction, apiss) {
    console.log('entrou no handleClick');
    if (filtroSelecionado === 'ingredient') {
      setFilterFunction(apiss.searchByIngredient(inputText));
    }
    if (filtroSelecionado === 'nome') {
      setFilterFunction(apiss.searchByName(inputText));
    }
    if (filtroSelecionado === 'primeira') {
      setFilterFunction(apiss.searchByFirstLetter(inputText));
    }
  }

  function Redirect() {
    const arrayFiltered =
      (bebidasFiltradas === 'inicial' ? false : bebidasFiltradas)
      || (comidasFiltradas === 'inicial' ? false : comidasFiltradas);

    if (arrayFiltered.length === 1) {
      const id = Object.entries(...arrayFiltered)
      .filter(({0: key}) => key.includes('id'))
      .map(({ 1: id }) => id || "nada");
      if (pathname === '/comidas') history.push(`/comidas/${[...id]}`);
      else history.push(`/bebidas/${[...id]}`);
    }
  }

  useEffect(() => {
    Redirect();
  }, [comidasFiltradas, bebidasFiltradas]);

  // prettier-ignore
  return (
    <div>
      <input
        type="text" data-testid="search-input"
        onChange={({ target: { value } }) => setInputText(value)}
      />
      <input
        type="radio" data-testid="ingredient-search-radio"
        id="ingredient" name="radio"
        onChange={({ target: { id } }) => setFiltro(id)}
      />
      <label htmlFor="ingredient">Ingrediente</label>
      <input
        type="radio" data-testid="name-search-radio"
        id="nome" name="radio"
        onChange={({ target: { id } }) => setFiltro(id)}
      />
      <label htmlFor="nome">Nome</label>
      <input
        type="radio" data-testid="first-letter-search-radio"
        id="primeira" name="radio"
        onChange={({ target: { id } }) => setFiltro(id)}
      />
      <label htmlFor="primeira">Primeira Letra</label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={() => {
          if (pathname === '/comidas') {
            handleClick(fetch.setFilteredSearchBarFood, api.food);
          }
          if (pathname === '/bebidas') {
            handleClick(fetch.setFilteredSearchBarDrink, api.drink);
          }
        }}
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  location: PropTypes.instanceOf(Object),
}.isRequired;

export default withRouter(SearchBar);
