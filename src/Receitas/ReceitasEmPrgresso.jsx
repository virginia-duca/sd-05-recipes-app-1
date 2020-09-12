import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './ReceitasEmProgresso.css'

const getIngredientsAndMesures = (recipe) => {
  const ingredients = Object.entries(recipe)
    .filter(({ 0: key }) => key.includes('strIngredient'))
    .map(({ 1: ingredient }) => ingredient || '')
    .filter(({ length }) => length > 0);
  const measure = Object.entries(recipe)
    .filter(({ 0: key }) => key.includes('strMeasure'))
    .map(({ 1: ingredient }) => ingredient || '')
    .filter(({ length }) => length > 0);
  return ingredients.map((ingredient, i) => ({ ingredient, measure: measure[i] }));
};

const Header = ({
  recipe: { strMealThumb, strMeal, strAlcoholic, strCategory, strDrinkThumb, strDrink },
}) => (
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
      <button data-testid="favorite-btn">
        <img src={whiteHeartIcon} alt="Favorite" />
      </button>
    </div>
  </header>
);


const ReceitasEmProgresso = ({ match: { params: { id } }, location: { pathname } }) => {

  const [recipe, setRecipe] = useState({});
  const [sideDish, setSideDish] = useState([]);

  useEffect(() => {
    // Verifica qual página está sendo montada
    const recipeFunc = pathname.split('/')[1] === 'comidas' ?
      api.food : api.drink;
    const sideDishFunc = pathname.split('/')[1] === 'comidas' ?
      api.drink : api.food;

    recipeFunc.getRecipeById(id)
    .then(({ 0: rec }) => { setRecipe(rec); });
    sideDishFunc.searchByName('')
      .then((array) => { setSideDish(array.slice(0, 6)); });
  }, []);

  return (
    <div className='basic'>
      <Header recipe={recipe} />
      <div className='basic'>
        <strong>Ingredients</strong>
        {getIngredientsAndMesures(recipe).map(({ ingredient, measure }, i) =>
          <div key={ingredient} data-testid={`${i}-ingredient-name-and-measure`}>
            <input type="checkbox" name={`${ingredient}`} />
            <label htmlFor={`${ingredient}`}>{`${ingredient} - ${measure}`}</label>
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
        <Link to={`${pathname}/in-progress`}>
          <button className="btn-start" data-testid="start-recipe-btn">Iniciar Receita</button>
        </Link>
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


export default withRouter(ReceitasEmProgresso);
