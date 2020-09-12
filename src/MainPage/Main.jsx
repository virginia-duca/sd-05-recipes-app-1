import React, { useEffect, useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppContext from '../Context/AppContext';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import RenderCategories from './Gadgets/RenderCategories';
import Header from '../Header/Header';
import MenuInferior from '../Header/MenuInferior';

const getFiltered = (filtered, original) => {
  console.log(filtered, original)
  return (Array.isArray(filtered) && filtered.slice(0, 12))
  || (original || []) || [];
}

const Main = ({ location: { pathname } }) => {
  const {
    fetch, bebidas12, bebidasFiltradas, comidas12, comidasFiltradas,
  } = useContext(AppContext);

  const [isLoading, SetIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState('comidas');
  const [item, setItem] = useState(comidas12);
  const [filteredItems, setFilteredItems] = useState(comidasFiltradas);

  const setListByCategory = (category) => {
    const apiPath = currentPage === 'comidas' ? api.food : api.drink;
    const setFunc = currentPage === 'comidas' ? fetch.setFood : fetch.setDrink;
    if (category === selectedCategory || category === 'All') {
      setFunc(
        apiPath.searchByName('')).then(() => { setSelectedCategory(''); })
      return;
    }
    SetIsLoading(true);
    setFunc(apiPath.searchByCategory(category))
      .then(() => { setSelectedCategory(category); SetIsLoading(false); });
  };

  useEffect(() => {
    setFilteredItems(currentPage === 'comidas' ? comidasFiltradas : bebidasFiltradas);
  }, [comidasFiltradas, bebidasFiltradas]);

  useEffect(() => {
    setItem(currentPage === 'comidas' ? comidas12 : bebidas12);
  }, [bebidas12, comidas12]);

  useEffect(() => {
    setCurrentPage(pathname.split('/')[1]);
    const apiPath = currentPage === 'comidas' ? api.food : api.drink;
    const setFunc = currentPage === 'comidas' ? fetch.setFood : fetch.setDrink;
    setFunc(apiPath.searchByName(''));
    apiPath.getCategories().then((list) => setCategories(
       [{ strCategory: 'All', idCategory: 0 }, ...list.slice(0, 5)],
    )).then(() => { SetIsLoading(false); });
  }, []);

  return (
    (isLoading || !Array.isArray(filteredItems)) ? (<div>Loading...</div>) : (
      <div>
        <Header titulo={currentPage} />
        <div className="card-container">
          <RenderCategories
            categories={categories}
            getValue={(r) => { setListByCategory(r); }}
          />
        </div>
        <div className="card-container">
          {getFiltered(filteredItems, item)
            .map(({ strDrinkThumb, strMealThumb, strDrink, strMeal, idDrink, idMeal }, i) =>
              <Link to={`${currentPage}/${idDrink || idMeal}`}>
                <Card 
                  key={idDrink || idMeal}
                  imageSrc={strDrinkThumb || strMealThumb} title={strDrink || strMeal} index={i}
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

export default withRouter(Main);
