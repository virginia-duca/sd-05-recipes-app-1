/** @format */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const Provider = (props) => {
  // Aqui declaro os states globais
  const [isFetching, setFe] = useState(true);
  const [comidas12, setCmd] = useState([]);
  const [bebidas12, setBb] = useState([]); const [error, setError] = useState('');
  const [comidasFiltradas, setCmdFilt] = useState('inicial');
  const [bebidasFiltradas, setBbsFilt] = useState('inicial');
  const [recipeSelected, setRecipe] = useState({});

  const setRecipeContext = (rec) => { setRecipe(rec); };

  useEffect(() => {
    if (comidasFiltradas.length === 0 || bebidasFiltradas.length === 0) {
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [comidasFiltradas, bebidasFiltradas]);

  const ca = () => (err) => setError(err);

  const fetch = {
    async setFood(funcfetc) {
      setFe(true);
      await funcfetc.then((response) => { setCmd([...response]); }).catch(ca()); setFe(false);
    },
    async setDrink(funcfetc) {
      setFe(true);
      await funcfetc.then((response) => { setBb([...response]); }).catch(ca()); setFe(false);
    },
    async setFilteredSearchBarFood(funcfetc) {
      setFe(true);
      await funcfetc.then((response) => { setCmdFilt([...response]); }).catch(ca()); setFe(false);
    },
    async setFilteredSearchBarDrink(funcfetc) {
      setFe(true);
      await funcfetc.then((response) => { setBbsFilt([...response]); }).catch(ca()); setFe(false);
    },
  };

  // Isso aqui corresponde ao store, ou seja, é um state
  // que todos os componentes filhos têm acesso
  const store = {
    isFetching,
    comidas12,
    bebidas12,
    error,
    fetch,
    comidasFiltradas,
    bebidasFiltradas,
    setRecipeContext,
    recipeSelected,
  };

  // Aqui declaro um component provider, que é a "mãe" de todos os componentes
  // e tranfere para eles o store
  return <AppContext.Provider value={store}>{props.children}</AppContext.Provider>;
};

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
