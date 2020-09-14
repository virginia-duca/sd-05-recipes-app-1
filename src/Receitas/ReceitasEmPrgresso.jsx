import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import storage from '../Services/LocalStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './ReceitasEmProgresso.css'
import AppContext from '../Context/AppContext';

import {
  appPage
} from '../Services/Utils'

const getIngredientsAndMesures = (recipe) => {
  const ingredients = Object.entries(recipe)
  .filter(({ 0: key }) => key.includes('strIngredient'))
  .map(({ 1: ingredient }) => ingredient || '')
  .filter(({ length }) => length > 0)
  const measure = Object.entries(recipe)
    .filter(({ 0: key }) => key.includes('strMeasure'))
    .map(({ 1: ingredient }) => ingredient || '')
    .filter(({ length }) => length > 0);
    return ingredients.map((ingredient, i) => ({ ingredient, measure: measure[i], done: false }));
  };
  
  const Header = ({
    recipe: { strMealThumb, strMeal, strAlcoholic, strCategory, strDrinkThumb, strDrink },
  }) => {
    const favoriteIsInStorage = 
    storage.getValueByKey('favoriteRecipes')
    .map(item => item.id === recipeSelected.idMeal || recipeSelected.idDrink ? true : false)

    const [isFavorite, setIsFavorite] = useState(favoriteIsInStorage)
    const { recipeSelected } = useContext(AppContext)

    return (
      <header className='basic'>
    <div>
      <img className='foto' data-testid="recipe-photo" src={strMealThumb || strDrinkThumb} alt="" />
      <h3 data-testid="recipe-title">{strMeal || strDrink}</h3>
      <h4 data-testid="recipe-category">{strAlcoholic || strCategory}</h4>
    </div>
    <div>
      <button data-testid="share-btn">
        <img src={shareIcon} alt="Share" />
      </button>
      <button data-testid="favorite-btn" 
        onClick={() => {
          setIsFavorite(isFavorite ? false : true); 
          setFavoriteStorage(recipeSelected)
        }} >
        <img src={isFavorite ? blackHeartIcon : whiteHeartIcon} alt="Favorite" />
      </button>
    </div>
  </header>
    )
  };



const recipeStorage = storage.getValueByKey('inProgressRecipes');

const ReceitasEmProgresso = ({ match: { params: { id } }, location: { pathname }, history }) => {
  const { setIngredientesToContext, setStIngredientesToStorage, ingredientes, setRecipeContext } = useContext(AppContext)
  const [recipe, setRecipe] = useState({});
  const [sideDish, setSideDish] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState(undefined);
  const [utilizados, setUtilizados] = useState([])

  const { meals } = utilizados
  
  const riscarNome = (id) => {
    const item = document.getElementById(id);
    item.classList.toggle("nomeRiscado");
    const check = document.getElementsByName(id)[0];
    check.classList.toggle("selected");
  };
  
  // vai checar se todos os checkbox estao selecionados para habilitar o botao finalizar receita
  const checkAllDone = () => {
    const listOfItems = [...document.getElementsByTagName('input')];
    console.log(listOfItems);
    const list = listOfItems
    .filter(item => item.classList.contains("selected"))
    .map(item => item.name)
    setChecked(list.length)
    setUtilizados(list)
  }

  // o state utilizados esta sendo salvo no storage, porem quando atualiza ele é apagado
    useEffect(() => {
      const product = pathname.split('/')[1] === 'comidas' ? 'meals' : 'cocktails'  
      storage.setValueByKey('inProgressRecipes', {[product]: {[id]: utilizados}})
      /* setStIngredientesToStorage(product, id)
      setIngredientesToContext(meals.id) */
  })

  useEffect(() => {
    // Verifica qual página está sendo montada
    storage.initStorage()
    const recipeFunc = pathname.split('/')[1] === 'comidas' ?
      api.food : api.drink;
    const sideDishFunc = pathname.split('/')[1] === 'comidas' ?
      api.drink : api.food;
    recipeFunc.getRecipeById(id)
    .then(({ 0: rec }) => { 
      setRecipe(rec);
      setRecipeContext(rec); 
      setIngredients(getIngredientsAndMesures(rec)) });
    sideDishFunc.searchByName('')
      .then((array) => { setSideDish(array.slice(0, 6)); });
  }, []);

  const redirectTo = (to) => { history.push(`${to}`); }; 
  
  return (
    <div className='basic'>
      <Header recipe={recipe} />
      <div className='basic'>
        <strong>Ingredients</strong>
        {ingredients.map(({ ingredient, measure, done }, i) =>
          <div key={ingredient} data-testid={`${i}-ingredient-name-and-measure`}>
            <label id={`${ingredient}`} name={`${i}`} htmlFor={`${ingredient}`} data-testid={`${i}-ingredient-step`}>
              <input
                type="checkbox"
                className="check-input"
                name={`${ingredient}`}
                onChange={({ target: { name }}) => {
                  riscarNome(name);
                  checkAllDone();
                  /* setStorage(); */
                }}
              />
                {`${ingredient} - ${measure}`}
            </label>
          </div>,
        )}
        <strong className="instructions">Instructions</strong>
        <div data-testid="instructions" className="instructions">
          { recipe.strInstructions }
        </div>
        <strong>Recomendadas</strong>
        {sideDish.map(({ idDrink, idMeal, strDrinkThumb, strMealThumb, strDrink, strMeal },
        i) =>
          <Card
            key={idDrink || idMeal} imageSrc={strDrinkThumb || strMealThumb}
            title={strDrink || strMeal} index={i} className={i < 2 ? '' : 'hidden'}
            testIdArray={['-recomendation-card', '', '-recomendation-title']}
          />,
        )}
        <button
          data-testid="finish-recipe-btn"
          disabled={ingredients.length === checked ? false : true}
          id="finalizar-receita"
          onClick={() => {redirectTo('/receitas-feitas')}}
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};

ReceitasEmProgresso.propTypes = {
  location: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
}.isRequired;

export default appPage(ReceitasEmProgresso);
