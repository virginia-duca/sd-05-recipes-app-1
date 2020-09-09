import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import APIS from '../Services/FetchAPI';

export const Provider = (props) => {

  // Aqui declaro os states globais
  const [isFetching, setIsFetching] = useState(true);
  const [comidas12, setComidas12] = useState([]);
  const [bebidas12, setBebidas12] = useState([]);
  const [error, setError] = useState('');

  // Funções de fetch organizadas
  const fetch = {
    addFoodByName: async (name) => {
      setIsFetching(true);
      await APIS.food.searchByName(name)
        .then((response) => { setComidas12([...comidas12, ...response]); })
        .catch((err) => { setError(err); });
      setIsFetching(false);
    },
    addDrinkByName: async (name) => {
      setIsFetching(true);
      await APIS.drink.searchByName(name)
        .then((response) => { setBebidas12([...bebidas12, ...response]); })
        .catch((err) => { setError(err); });
      setIsFetching(false);
    },
    addFoodByLetter: async (letter) => {
      setIsFetching(true);
      await APIS.food.searchByFirstLetter(letter)
        .then((response) => { setComidas12([...comidas12, ...response]); })
        .catch((err) => { setError(err); });
      setIsFetching(false);
    },
    addDrinkByLetter: async (letter) => {
      setIsFetching(true);
      await APIS.drink.searchByFirstLetter(letter)
        .then((response) => { setBebidas12([...bebidas12, ...response]); })
        .catch((err) => { setError(err); });
      setIsFetching(false);
    },
    addFoodByIngredient: async (ingredient) => {
      setIsFetching(true);
      await APIS.food.searchByIngredient(ingredient)
        .then((response) => { setComidas12([...comidas12, ...response]); })
        .catch((err) => { setError(err); });
      setIsFetching(false);
    },
    addDrinkByIngredient: async (ingredient) => {
      setIsFetching(true);
      await APIS.drink.searchByIngredient(ingredient)
        .then((response) => { setBebidas12([...bebidas12, ...response]); })
        .catch((err) => { setError(err); });
      setIsFetching(false);
    },
  };

  // Isso aqui corresponde ao store, ou seja, é um state
  // que todos os componentes filhos têm acesso
  const store = {
    isFetching,
    setIsFetching,
    comidas12,
    bebidas12,
    error,
    fetch,
  };

  // Aqui declaro um component provider, que é a "mãe" de todos os componentes
  // e tranfere para eles o store
  return (
    <AppContext.Provider value={store}>
      {props.children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
}
