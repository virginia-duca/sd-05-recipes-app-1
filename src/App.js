import React from 'react';
import './App.css';
import Rotas from './Paginas/Rotas';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <Rotas />
    </Provider>
  );
}

export default App;
