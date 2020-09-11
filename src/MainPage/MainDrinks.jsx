import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import RenderCategories from './Gadgets/RenderCategories';
import Header from '../Header/Header';
import MenuInferior from '../Header/MenuInferior';

/* function mapArray(array) {
  return (
    <div className="card-container">
      {Array.isArray(array) && array.slice(0, 12)
      .map(({ strDrinkThumb, strDrink, idDrink }, i) => (
        <Card key={idDrink} imageSrc={strDrinkThumb} title={strDrink} index={i} />
      ))}
    </div>
  );
} */

const MainDrinks = () => {
  const { fetch, bebidas12, bebidasFiltradas } = useContext(AppContext);
  const [isLoading, SetIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [drinkCategories, setDrinkCategories] = useState([]);

  const setDrinkListByCategory = (category) => {
    if (category === selectedCategory || category === 'All') {
      fetch.setDrink(api.drink.searchByName(''))
        .then(() => { setSelectedCategory(''); });
      return;
    }
    SetIsLoading(true);
    fetch.setDrink(api.drink.searchByCategory(category))
      .then(() => { setSelectedCategory(category); SetIsLoading(false); });
  };

  useEffect(() => {
    fetch.setDrink(api.drink.searchByName(''));
    api.drink.getCategories().then((list) => setDrinkCategories(
      [{ strCategory: 'All', idCategory: 0 }, ...list.slice(0, 5)],
    )).then(() => { SetIsLoading(false); });
  }, []);

  return (
    (isLoading && !bebidas12.length) ? (<div>Loading...</div>) : (
      <div>
        <Header titulo="Bebidas" />
        <div className="card-container">
          <RenderCategories
            categories={drinkCategories}
            getValue={(r) => { setDrinkListByCategory(r); }}
          />
        </div>
        {Array.isArray(bebidasFiltradas) && bebidasFiltradas.length > 0
        ? <div className="card-container">
            {Array.isArray(bebidasFiltradas) && bebidasFiltradas.slice(0, 12)
            .map(({ strDrinkThumb, strDrink, idDrink }, i) => (
              <Card key={idDrink} imageSrc={strDrinkThumb} title={strDrink} index={i} />
            ))}
          </div>
        : <div className="card-container">
            {Array.isArray(bebidas12) && bebidas12.slice(0, 12)
            .map(({ strDrinkThumb, strDrink, idDrink }, i) => (
              <Card key={idDrink} imageSrc={strDrinkThumb} title={strDrink} index={i} />
            ))}
          </div>}
        <MenuInferior />
      </div>
    )
  );
};

export default MainDrinks;
