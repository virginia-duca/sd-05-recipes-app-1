import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';

import './style.css';

const handleClick = ({ setFilterFunction, selectedApi, inputText, filtroSelecionado }) => {
  switch (filtroSelecionado) {
    case 'ingredient':
      setFilterFunction(selectedApi.searchByIngredient(inputText));
      break;
    case 'nome':
      setFilterFunction(selectedApi.searchByName(inputText));
      break;
    default:
      setFilterFunction(selectedApi.searchByFirstLetter(inputText));
      break;
  }
};

function SearchBar({ location: { pathname }, history }) {
  const { fetch, comidasFiltradas, bebidasFiltradas } = useContext(AppContext);
  const [filtroSelecionado, setFiltro] = useState('');
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const path = pathname === '/comidas' ? 'comidas' : 'bebidas';
    const filtered = path === 'comidas' ? comidasFiltradas : bebidasFiltradas;
    if (filtered.length === 1 && filtered !== 'inicial') {
      const id = Object.entries(filtered[0])[0][1];
      history.push(`${path}/${id}`);
    }
  }, [comidasFiltradas, bebidasFiltradas]);
// prettier ignore
  return (
    <div className="searchbar-container">
      <div className="input-field">
        <i class="material-icons prefix">restaurant</i>
        <input
          type="text"
          data-testid="search-input"
          onChange={({ target: { value } }) => setInputText(value)}
        />
      </div>

      <div className="type-container">
        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="radio"
            onChange={({ target: { id } }) => setFiltro(id)}
          />     
          <span>Ingrediente</span>
        </label>
  
        <label htmlFor="nome">
          <input
              type="radio"
              data-testid="name-search-radio"
              id="nome"
              name="radio"
              onChange={({ target: { id } }) => setFiltro(id)}
            />
          <span>Nome</span>
        </label>
  
        <label htmlFor="primeira">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="primeira"
            name="radio"
            onChange={({ target: { id } }) => setFiltro(id)}
          />        
          <span>Primeira Letra</span>
        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        className="btn waves-light btn-small white black-text"
        onClick={() => {
          if (pathname === '/comidas') {
            handleClick({
              setFilterFunction: fetch.setFilteredSearchBarFood,
              selectedApi: api.food,
              inputText,
              filtroSelecionado,
            });
          }
          if (pathname === '/bebidas' || '/bebidas/') {
            handleClick({
              setFilterFunction: fetch.setFilteredSearchBarDrink,
              selectedApi: api.drink,
              inputText,
              filtroSelecionado,
            });
          }
        }}
      >
        <i class="material-icons left">search</i>Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  location: PropTypes.instanceOf(Object),
}.isRequired;

export default withRouter(SearchBar);
