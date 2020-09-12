import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import RenderCategories from './Gadgets/RenderCategories';
import Header from '../Header/Header';
import MenuInferior from '../Header/MenuInferior';

const getFiltered = (filtered, original) =>
  (Array.isArray(filtered) && filtered.slice(0, 12))
  || (original || []) || [];

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
        <div className="card-container">
          {getFiltered(bebidasFiltradas ,bebidas12)
            .map(({ strDrinkThumb, strDrink, idDrink }, i) =>
              <Link to={`bebidas/${idDrink}`}>
                <Card 
                  key={idDrink} imageSrc={strDrinkThumb} title={strDrink} index={i}
                  testIdArray={['-recipe-card', '-card-img', '-card-name']}
                />
              </Link>
          )}
        </div>
        <MenuInferior />
      </div>
    )
  );
};

export default MainDrinks;
