/** @format */

import React, {useEffect, useState} from 'react';
import HeaderTwo from '../Header/HeaderTwo';
import storage from '../Services/LocalStorage';
import NewCardFavoritos from './NewCardFavoritos';

export default function ReceitasFavoritas() {
  const [receitasFavoritas, setReceitasFavoritas] = useState([]);

  useEffect(() => {
    const rcps = storage.getValueByKey('favoriteRecipes');
    setReceitasFavoritas(rcps);
  }, []);

  // useEffect(() => {

  // }, [receitasFavoritas])

  return (
    <div>
      <h1>Receitas Favoritas</h1>
      <HeaderTwo titulo={'Receitas Favoritas'} />
      <button>All</button>
      <button>Food</button>
      <button>Drinks</button>
      {receitasFavoritas.map((recipe, i) => <div><NewCardFavoritos recipe={recipe} index={i}/></div>)}
    </div>
  );
}
