/** @format */

import React, { useContext, useState } from 'react';
import AppContext from '../Context/AppContext';
import APIS from '../Services/FetchAPI';

export default function SearchBar() {
  const { fetch, SearchBarFilterFoods} = useContext(AppContext);

  const [filtroSelecionado, setFiltro] = useState('');

  function handleChange({ target: { id } }) {
    return setFiltro(id);
  }

  function handleClick() {
    if (filtroSelecionado === 'ingrediente')
      fetch.setFilteredSearchBarFood()
  }

  return (
    <div>
      <input type='text' data-testid='search-input' />
      <input
        type='radio'
        data-testid='ingredient-search-radio'
        id='ingredient'
        name='radio'
        onChange={(event) => handleChange(event)}
      />
      <label htmlFor='ingredient'>Ingrediente</label>
      <input
        type='radio'
        data-testid='name-search-radio'
        id='nome'
        name='radio'
        onChange={() => handleChange()}
      />
      <label htmlFor='nome'>Nome</label>
      <input
        type='radio'
        data-testid='first-letter-search-radio'
        id='primeira'
        name='radio'
        onChange={() => handleChange()}
      />
      <label htmlFor='primeira'>Primeira Letra</label>
      <button type='button' data-testid='exec-search-btn' onClick={() => handleClick()}>
        Buscar
      </button>
    </div>
  );
}
