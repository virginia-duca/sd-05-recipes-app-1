import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import storage from '../Services/LocalStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './ReceitasEmProgresso.css'
import AppContext from '../Context/AppContext';


const getIngredientsAndMesures = (recipe) => {
  const ingredients = Object.entries(recipe)
  .filter(({ 0: key }) => key.includes('strIngredient'))
  .map(({ 1: ingredient }) => ingredient || '')
  .filter(({ length }) => length > 0)
  const measure = Object.entries(recipe)
    .filter(({ 0: key }) => key.includes('strMeasure'))
    .map(({ 1: ingredient }) => ingredient || '')
    .filter(({ length }) => length > 0);
  const checkedArray = ((storage
    .getValueByKey('inProgressRecipes')
    [recipe.idDrink ? 'cocktails' : 'meals'] || [])
    [recipe.idDrink || recipe.idMeal]) || [];
  
  return ingredients.map((ingredient, i) => (
    { ingredient, measure: measure[i], isChecked: checkedArray.includes(ingredient) }
  ));
};

const createFormatedObject = (object) => {
  const {
    idDrink,
    idMeal,
    strDrink,
    strMeal,
    strCategory,
    strAlcoholic,
    strArea,
    strDrinkThumb,
    strMealThumb
  } = object;
  return {
    id: idDrink || idMeal,
    type: idDrink ? 'bebida' : 'comida',
    area: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strDrink || strMeal,
    image: strDrinkThumb || strMealThumb,
  };
};
  
  const Header = ({
    recipe: { idMeal, idDrink, strMealThumb, strMeal, strAlcoholic, strCategory, strDrinkThumb, strDrink },
  }) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const { recipeSelected } = useContext(AppContext);

    useEffect(() => {
      const currentId = idMeal || idDrink;
      setIsFavorite(
        (storage.getValueByKey('favoriteRecipes') || []).reduce((exists, { id }) => {
          return id ? id === currentId || exists : false 
       }, false)
      );
    }, [recipeSelected]);

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
        <button
          data-testid="favorite-btn"
          src={isFavorite ? blackHeartIcon : whiteHeartIcon}
          onClick={() => {
            setIsFavorite(!isFavorite); 
            const favorited = createFormatedObject(recipeSelected);
            const f = storage.getValueByKey('favoriteRecipes') || [{id: -1}];
            const fid = f.reduce((i, { id }) => (id !== favorited.id ? i : id), -1);
            storage.setValueByKey(
              'favoriteRecipes',
              [...f, favorited].filter(({ id }) => (id !== fid)),
            );
          }} >
          <img src={isFavorite ? blackHeartIcon : whiteHeartIcon} alt="Favorite" />
        </button>
      </div>
    </header>
    )
  };

const ReceitasEmProgresso = ({ match: { params: { id } }, location: { pathname }, history }) => {
  const { setRecipeContext, recipeSelected } = useContext(AppContext);
  const [recipe, setRecipe] = useState({});
  const [sideDish, setSideDish] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState(undefined);
  
  const riscarNome = (id, index) => {
    const check = document.getElementsByName(id)[0];
    check.classList.toggle("selected");
    setIngredients(ingredients.map((obj, i) => {
      if(i === index) return {...obj, isChecked: !obj.isChecked};
      return obj;
    }))
  };
  
  // vai checar se todos os checkbox estao selecionados para habilitar o botao finalizar receita
  const checkAllDone = () => {
    const product = pathname.split('/')[1] === 'comidas' ? 'meals' : 'cocktails'  
    const listOfItems = [...document.getElementsByTagName('input')];
    const list = listOfItems
      .filter(item => item.classList.contains("selected")).map(item => item.name);
    setChecked(list.length)
    const curRecipes = storage.getValueByKey('inProgressRecipes')[product];
    storage.setValueByKey('inProgressRecipes', {[product]: {...curRecipes, [id]: list}})
  }

  useEffect(() => {
    // Verifica qual página está sendo montada
    storage.initStorage();
    const recipeFunc = pathname.split('/')[1] === 'comidas' ?
      api.food : api.drink;
    const sideDishFunc = pathname.split('/')[1] === 'comidas' ?
      api.drink : api.food;
    recipeFunc.getRecipeById(id)
    .then(({ 0: rec }) => {
      setRecipe(rec); setRecipeContext(rec);
      setIngredients(getIngredientsAndMesures(rec));
    });
    sideDishFunc.searchByName('')
      .then((array) => { setSideDish(array.slice(0, 6)); });
  }, []);

  const finishRecipe = () => {
    const formated = createFormatedObject(recipeSelected);
    const now = new Date();
    const doneObject = {
      ...formated,
      doneDate: `${(now.getDate())}/${now.getMonth() < 10 ? 0 : ''}${now.getMonth()}/${now.getFullYear()}`,
      tags: (recipeSelected.strTags || '').split(','),
    }
    const currentDone = storage.getValueByKey('doneRecipes');
    storage.setValueByKey('doneRecipes', [...currentDone, doneObject]);
    history.push('/receitas-feitas');
  }; 
  
  return (
    <div className='basic'>
      <Header recipe={recipe} />
      <div className='basic'>
        <strong>Ingredients</strong>
        {ingredients.map(({ ingredient, measure, isChecked }, i) =>
          <div key={ingredient} data-testid={`${i}-ingredient-name-and-measure`}>
            <label
              id={`${ingredient}`} name={`${i}`} htmlFor={`${ingredient}`}
              className={isChecked ? 'nomeRiscado' : ''}
              data-testid={`${i}-ingredient-step`}
            >
              <input
                type="checkbox" name={`${ingredient}`}
                className={`check-input ${isChecked ? 'selected' : ''}`}
                onChange={({ target: { name }}) => { riscarNome(name, i); checkAllDone(); }}
                checked={isChecked}
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
          disabled={!(ingredients.length === checked)}
          id="finalizar-receita"
          onClick={() => { finishRecipe(); }}
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

export default withRouter(ReceitasEmProgresso);
