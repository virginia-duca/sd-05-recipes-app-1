import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { APIS, fetchAPI } from '../Services/FetchAPI';

const {
  URLcomidas12,
  URLbebidas12,
  EPIngredMeal,
  EPLetraMeal,
  EPNomeMeal,
  EPIngredDrink,
  EPNomeDrink,
  EPLetraDrink, 
} = APIS;

export default Provider = () => {

  // Aqui declaro os states globais
  const [isFetching, setIsFetching] = useState(true);
  const [comidas12, setComidas12] = useState([]);
  const [bebidas12, setBebidas12] = useState([]);
  const [error, setError] = useState('');

  function fetchDataSuccess(response, setState) {
    setIsFetching(false);
    setState(response);
  }

  function fetchDataFail(error1) {
    setIsFetching(false);
    setError(error1.message);
  }

  // olha, olhando assim parece que está tudo ok, mas a gente podia depois
  // refatorar o API pra tentar simplificar, o que acha?
  // claro ! 

  // Colocar depois os outros casos de fetch(diferentes endpoints)
  function fetch(endpoint) {
    if (isFetching) return;
    setIsFetching(true);
    switch (endpoint) {
      default: // É bom deixar o default pro CC não chorar
      case 'comidas12':
        fetchAPI(URLcomidas12)
        .then(fetchDataSuccess(response, setComidas12), fetchDataFail);
        break;
      case 'bebidas12':
        fetchAPI(URLbebidas12)
        .then(fetchDataSuccess(response, setBebidas12), fetchDataFail);
        break;
    }
  }
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

  // Essa parte substitui o OnComponentDidMount
  useEffect(() => {
    // Inserir a função 'fetch' aqui
  }, []);

  // Aqui declaro um component provider, que é a "mãe" de todos os componentes
  // e tranfere para eles o store
  return (
    <AppContext.Provider value={store}>
      {props.children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired
}
