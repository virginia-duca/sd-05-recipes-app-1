import React, { useEffect, useState, useContext } from 'react';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import RenderCategories from './Gadgets/RenderCategories';

const MainDrinks = () => {
  const { fetch, bebidas12 } = useContext(AppContext);
  const [isLoading, SetIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [drinkCategories, setDrinkCategories] = useState([]);

  useEffect(async () => {
    await fetch.setDrink(api.drink.searchByName(''));
    await api.drink.getCategories().then((list) => setDrinkCategories(
      [{ strCategory: 'All', idCategory: 0 }, ...list.slice(0, 5)],
    )).then(() => { SetIsLoading(false); });
  }, []);

  const setDrinkListByCategory = async (category) => {
    SetIsLoading(true);
    if (category === selectedCategory || category === 'All') {
      await fetch.setDrink(api.drink.searchByName(''));
      setSelectedCategory('');
      return;
    }
    await fetch.setDrink(api.drink.searchByCategory(category));
    setSelectedCategory(category);
    SetIsLoading(false);
  };

  return (
    (isLoading && !bebidas12.length) ? (<div>Loading...</div>)
    : (
      <div>
        <div className="card-container">
          <RenderCategories
            categories={drinkCategories}
            getValue={(r) => { setDrinkListByCategory(r); }}
          />
        </div>
        <div className="card-container">
          {
            bebidas12.slice(0, 12).map(({ strDrinkThumb, strDrink, idDrink }, i) => (
              <Card key={idDrink} imageSrc={strDrinkThumb} title={strDrink} index={i} />
            ))
          }
        </div>
      </div>
    )
  );
};

export default MainDrinks;
