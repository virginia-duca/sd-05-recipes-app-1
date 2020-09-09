import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';

const SmallCards = ({ title, onClick }) => (
  <button
    type="button"
    className="small-card"
    data-testid={`${title}-category-filter`}
    onClick={() => { onClick(title); }}
  >
    { title }
  </button>
);

const RenderCategories = ({ categories, getValue }) => (
  categories.map(({ strCategory, idCategory }) => (
    <SmallCards
      key={idCategory}
      title={strCategory}
      onClick={(value) => getValue(value)}
    />),
  )
);

const MainFood = () => {
  const { fetch, comidas12 } = useContext(AppContext);
  const [isLoading, SetIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(async () => {
    await fetch.setFood(api.food.searchByName(''));
    await api.food.getCategories().then((list) => setFoodCategories(
      [{ strCategory: 'All', idCategory: 0 }, ...list.slice(0, 5)],
    )).then(() => { SetIsLoading(false); });
  }, []);

  const setFoodListByCategory = async (category) => {
    SetIsLoading(true);
    if (category === selectedCategory || category === 'All') {
      await fetch.setFood(api.food.searchByName(''));
      setSelectedCategory('');
      return;
    }
    await fetch.setFood(api.food.searchByCategory(category));
    setSelectedCategory(category);
    SetIsLoading(false);
  };

  return (
    (isLoading && !comidas12.length) ? (<div>Loading...</div>)
    : (
      <div>
        <div className="card-container">
          <RenderCategories
            categories={foodCategories}
            getValue={(r) => { setFoodListByCategory(r); }}
          />
        </div>
        <div className="card-container">
          {
            comidas12.slice(0, 12).map(({ strMealThumb, strMeal, idMeal }, i) => (
              <Card key={idMeal} imageSrc={strMealThumb} title={strMeal} index={i} />
              )
            )
          }
        </div>
      </div>
    )
  );
};

SmallCards.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

RenderCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  getValue: PropTypes.func,
};

SmallCards.defaultProps = {
  onClick: () => {},
};

RenderCategories.defaultProps = {
  categories: [],
};

export default MainFood;