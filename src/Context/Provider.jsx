import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
c
export default Provider = () => {
  // Aqui declaro os states globais
  const [isFetching, setIsFetching] = useState(true);

  // Isso aqui corresponde ao store, ou seja, é um state
  // que todos os componentes filhos têm acesso
  const store = {
    isFetching,
    setIsFetching,
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
