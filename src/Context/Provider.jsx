import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const Provider = (props) => {
  // Aqui declaro os states globais
  const [isFetching, setIsFetching] = useState(true);
  const [comidas12, setComidas12] = useState([]);
  const [bebidas12, setBebidas12] = useState([]);
  const [error, setError] = useState('');

  const fetch = {
    async setFood (functionOfFetch) {
      setIsFetching(true);
      await functionOfFetch
        .then((response) => { setComidas12([...response]); })
        .catch((err) => { setError(err); });
      setIsFetching(false);
    },
    async setDrink (functionOfFetch) {
      setIsFetching(true);
      await functionOfFetch
        .then((response) => { setBebidas12([...response]); })
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
};

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
