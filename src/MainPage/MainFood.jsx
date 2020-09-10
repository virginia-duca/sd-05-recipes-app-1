import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import RenderCategories from './Gadgets/RenderCategories';
import Header from '../Header/Header';

const MainFood = () => {
  const { fetch, comidas12 } = useContext(AppContext);
  const [isLoading, SetIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    async function fetchAll () {
      await fetch.setFood(api.food.searchByName(''));
      await api.food.getCategories().then((list) => setFoodCategories(
        [{ strCategory: 'All', idCategory: 0 }, ...list.slice(0, 5)],
      )).then(() => { SetIsLoading(false); });
    }
    fetchAll();
  }, []);

  const setFoodListByCategory = (category) => {
    async function fetchAll() {
      SetIsLoading(true);
      if (category === selectedCategory || category === 'All') {
        await fetch.setFood(api.food.searchByName(''));
        setSelectedCategory('');
        return;
      }
      await fetch.setFood(api.food.searchByCategory(category));
      setSelectedCategory(category);
      SetIsLoading(false);
    }
    fetchAll();
  };

  const comidas = "Comidas"
  return isLoading && !comidas12.length ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Header titulo={comidas} />
      <div className="card-container">
        <RenderCategories
          categories={foodCategories}
          getValue={(r) => {
            setFoodListByCategory(r);
          }}
        />
      </div>
      <div className="card-container">
        {comidas12.slice(0, 12).map(({ strMealThumb, strMeal, idMeal }, i) => (
          <Card
            key={idMeal}
            imageSrc={strMealThumb}
            title={strMeal}
            index={i}
          />
        ))}
      </div>
    </div>
    )
};

export default MainFood;
