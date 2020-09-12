/* import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import RenderCategories from './Gadgets/RenderCategories';
import Header from '../Header/Header';
import MenuInferior from '../Header/MenuInferior';

const MainFood = () => {
  const { fetch, comidas12, comidasFiltradas } = useContext(AppContext);
  const [isLoading, SetIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    fetch.setFood(api.food.searchByName(''));
    api.food.getCategories().then((list) => setFoodCategories(
      [{ strCategory: 'All', idCategory: 0 }, ...list.slice(0, 5)],
    )).then(() => { SetIsLoading(false); });
  }, []);

  const setFoodListByCategory = (category) => {
    if (category === selectedCategory || category === 'All') {
      fetch.setFood(api.food.searchByName(''))
        .then(() => { setSelectedCategory(''); });
      return;
    }
    SetIsLoading(true);
    fetch.setFood(api.food.searchByCategory(category))
      .then(() => { setSelectedCategory(category); SetIsLoading(false); });
  };

  function mapArray(array) {
    return (
      <div className="card-container">
        {Array.isArray(array) && array.slice(0, 12).map(({ strMealThumb, strMeal, idMeal }, i) => (
          <Card key={idMeal} imageSrc={strMealThumb} title={strMeal} index={i} />
        ))}
      </div>
    );
  }

  function setRender() {
    if (Array.isArray(comidasFiltradas) && comidasFiltradas.length > 0) {
      return mapArray(comidasFiltradas)
    }
    return mapArray(comidas12);
  }

  return isLoading && !comidas12.length ? (<div>Loading...</div>) : (
    <div>
      <Header titulo="Comidas" />
      <div className="card-container">
        <RenderCategories
          categories={foodCategories}
          getValue={(r) => {
            setFoodListByCategory(r);
          }}
        />
      </div>
      {Array.isArray(comidasFiltradas) && comidasFiltradas.length > 0
        ? <div className="card-container">
            {Array.isArray(comidasFiltradas) && comidasFiltradas.slice(0, 12)
            .map(({ strMealThumb, strMeal, idMeal }, i) => (
              <Card 
                key={idMeal} imageSrc={strMealThumb} title={strMeal} index={i}
                testIdArray={['-recipe-card', '-card-img', '-card-name']}
              />
            ))}
          </div>
        : <div className="card-container">
            {Array.isArray(comidas12) && comidas12.slice(0, 12)
            .map(({ strMealThumb, strMeal, idMeal }, i) => (
              <Card
                key={idMeal} imageSrc={strMealThumb} title={strMeal} index={i}
                testIdArray={['-recipe-card', '-card-img', '-card-name']}
              />
            ))}
          </div>}
      <MenuInferior />
    </div>
  );
};

export default MainFood;
 */