import React, { useEffect, useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import RenderCategories from './Gadgets/RenderCategories';
import Header from '../Header/Header';
import MenuInferior from '../Header/MenuInferior';

const MEAL = '/comidas';

const item = {
  comidas: [],
  bebidas: [],
  path: MEAL,
  category: '',
};

let categories = [];
let apis = {};
let fetchs = {};

const toUpper = (text) => (
  text.replace('/', '').replace(text[1], text[1].toUpperCase())
);

const RenderItems = () => {
  const { path, comidas, bebidas } = item;
  const itemArray = path === MEAL ? comidas : bebidas;

  return (
    <div className="card-container">
      {
        Array.isArray(itemArray) && itemArray.slice(0, 12)
          .map((data, i) => (
            <Link to={`${path}/${data.idMeal || data.idDrink}`}>
              <Card
                key={data.idMeal || data.idDrink}
                imageSrc={data.strMealThumb || data.strDrinkThumb}
                title={data.strMeal || data.strDrink}
                index={i}
                testIdArray={['-recipe-card', '-card-img', '-card-name']}
              />
            </Link>
          ))
      }
    </div>
  );
};

const MainFoodCopy = ({ location: { pathname } }) => {
  const {
    fetch, comidas12, bebidas12, comidasFiltradas, bebidasFiltradas,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Seta os states locais
    item.path = pathname;
    apis = pathname === MEAL ? api.food : api.drink;
    fetchs = pathname === MEAL ? fetch.setFood : fetch.setDrink;
    fetchs(apis.searchByName(''));
    // Seta as categorias
    apis.getCategories().then((list) => {
      categories = [{ strCategory: 'All', idCategory: 0 }, ...list.slice(0, 5)];
    }).then(() => { setIsLoading(false); });
  }, [pathname]);

  useEffect(() => {
    item.comidas = Object.assign(comidas12);
    item.bebidas = Object.assign(bebidas12);
  }, [comidas12, bebidas12]);

  useEffect(() => {
    if (Array.isArray(comidasFiltradas) && comidasFiltradas.length > 0) {
      item.comidas = comidasFiltradas;
    }
    if (Array.isArray(bebidasFiltradas) && bebidasFiltradas.length > 0) {
      item.bebidas = bebidasFiltradas;
    }
  }, [comidasFiltradas, bebidasFiltradas]);

  const setItemListByCategory = (category) => {
    if (category === item.category || category === 'All') {
      fetchs(apis.searchByName(''))
        .then(() => { item.category = ''; });
      return;
    }
    setIsLoading(true);
    fetchs(apis.searchByCategory(category))
      .then(() => { item.category = category; setIsLoading(false); });
  };

  return isLoading ? <div>Loading...</div> : (
    <div>
      <Header titulo={toUpper(item.path)} />
      <div className="card-container">
        <RenderCategories
          categories={categories}
          getValue={(r) => { setItemListByCategory(r); }}
        />
      </div>
      <RenderItems />
      <MenuInferior />
    </div>
  );
};

MainFoodCopy.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(MainFoodCopy);
