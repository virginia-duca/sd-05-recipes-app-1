/** @format */

import React, { useEffect, useState } from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import storage from '../Services/LocalStorage';
import NewCardFavoritos from './NewCardFavoritos';

export default function ReceitasFavoritas() {
  const rcps = storage.getValueByKey('favoriteRecipes');
  const [receitasFavoritas, setReceitasFavoritas] = useState([]);

  useEffect(() => {
    setReceitasFavoritas(rcps);
  }, []);

  function filtroComida() {
    const comidaFilt = rcps.filter(
      (filtro) => filtro.type === 'comida',
    );
    setReceitasFavoritas(comidaFilt);
  }

  function filtroBebida() {
    const bebidaFilt = rcps.filter(
      (filtro) => filtro.type === 'bebida',
    );
    setReceitasFavoritas(bebidaFilt);
  }

  return (
    <div>
      <h1>Receitas Favoritas</h1>
      <HeaderTwo titulo={'Receitas Favoritas'} />
      <button onClick={() => setReceitasFavoritas(rcps)}>All</button>
      <button onClick={() => filtroComida()}>Food</button>
      <button onClick={() => filtroBebida()}>Drinks</button>
      {receitasFavoritas.map((recipe, i) => (
        <div>
          <NewCardFavoritos recipe={recipe} index={i} />
        </div>
      ))}
    </div>
  );
}
