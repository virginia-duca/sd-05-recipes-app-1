import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import RenderCategories from './Gadgets/RenderCategories';
import Header from '../Header/Header';
import MenuInferior from '../Header/MenuInferior';
import { withRouter } from 'react-router-dom';

const item = {
  comidas: [],
  bebidas: [],
  category: '',
};

let categories = [];

const MainFoodCopy = ({ location: { pathname } }) => {
  const { fetch, comidas12, bebidas12, comidasFiltradas, bebidasFiltradas } = useContext(AppContext);
  const [isLoading, SetIsLoading] = useState(true);
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [foodCategories, setFoodCategories] = useState([]);
  
//  const [comidas, setComidas] = useState([]);
//  const [bebidas, setBebidas] = useState([]);
  // const [categories, setCategories] = useState([]);

  let apis = {};
  let fetchs = fetch.setFood;

  useEffect(() => {
    // Seta os states locais
    apis = pathname === '/comidas' ? Object.assign(api.food) : Object.assign(api.drink);
    fetchs = pathname === '/comidas' ? fetch.setFood : fetch.setDrink;

    fetchs(apis.searchByName(''));

    // Seta as categorias
    apis.getCategories().then((list) => {
      categories = [{ strCategory: 'All', idCategory: 0 }, ...list.slice(0, 5)];
    }).then(() => { SetIsLoading(false); });
  }, [])

  useEffect(() => {
    item.comidas = Object.assign(comidas12);
    item.bebidas = Object.assign(bebidas12);
    console.log('atualizado', item.bebidas);
  }, [comidas12, bebidas12])
    
  useEffect(() => {
    if (Array.isArray(comidasFiltradas) && comidasFiltradas.length > 0) {
      item.comidas = comidasFiltradas;
    }
    if (Array.isArray(bebidasFiltradas) && bebidasFiltradas.length > 0) {
      item.bebidas = bebidasFiltradas;
    }
  }, [comidasFiltradas, bebidasFiltradas])

  const setItemListByCategory = (category) => {
    if (category === item.category || category === 'All') {
      fetchs(apis.searchByName(''))
        .then(() => { item.category = ''; });
      return;
    }
    SetIsLoading(true);
    apis.searchByCategory(category).then((r) => {
      console.log(r);
    })
    
    fetchs(apis.searchByCategory(category))
      .then(() => { item.category = category; SetIsLoading(false);  })
  };

  const mapArrayFood = () => {
    return <div className="card-container">
      {
      Array.isArray(item.comidas) && item.comidas.slice(0, 12).map(({ strMealThumb, strMeal, idMeal }, i) => (
        <Link to={`bebidas/${idMeal}`}>
          <Card 
            key={idMeal} imageSrc={strMealThumb} title={strMeal} index={i} 
            testIdArray={['-recipe-card', '-card-img', '-card-name']}
          />
        </Link>
      ))}
    </div>
  };

  const mapArrayDrink = () =>
    <div className="card-container">
      {Array.isArray(item.bebidas) && item.bebidas.slice(0, 12).map(({ strDrinkThumb, strDrink, idDrink }, i) => (
        <Link to={`bebidas/${idDrink}`}>
          <Card 
            key={idDrink} imageSrc={strDrinkThumb} title={strDrink} index={i}
            testIdArray={['-recipe-card', '-card-img', '-card-name']}
          />
        </Link>
      ))}
    </div>;
  
  return isLoading ? (<div>Loading...</div>) : (
    <div>
      <Header titulo="Comidas" />
      <div className="card-container">
        <RenderCategories
          categories={categories}
          getValue={(r) => { setItemListByCategory(r); }}
        />
      </div>
      {pathname === '/comidas' ? mapArrayFood() : mapArrayDrink()}
      <MenuInferior />
    </div>
  );
};

export default withRouter(MainFoodCopy);
