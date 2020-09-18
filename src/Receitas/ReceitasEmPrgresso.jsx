import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import AppContext from '../Context/AppContext';
import storage from '../Services/LocalStorage';
import Header from '../Components/Header';
import {
  appPage,
  prettifyRecipe,
} from '../Services/Utils';

// Recursos
import './style.css'

const getIngredientsAndMesures = (r) => {
  const checkedArray = ((storage
    .getValueByKey('inProgressRecipes')[`${r.typeBizarre}s`] || [])[r.id]) || [];
  
  const t = r.ingredientsAndMesures.map((rec) => (
    { ...rec, isChecked: checkedArray.includes(rec.ingredient) }
  ));

  return t;
};

const finishRecipe = (recipe, redirect) => {
  const { id, type, area, category, alcoholicOrNot, name, image, tags } = recipe;
  const now = new Date();
  const doneObject = {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    tags,
    doneDate: `${(now.getDate())}/${now.getMonth() < 10 ? 0 : ''}${now.getMonth()}/${now.getFullYear()}`,
  }
  const currentDone = storage.getValueByKey('doneRecipes');
  storage.setValueByKey('doneRecipes', [...currentDone, doneObject]);
  redirect('../../receitas-feitas');
};

const ReceitasEmProgresso = ({ id, path, pathname, redirect }) => {
  const { setRecipeContext } = useContext(AppContext);
  const [recipe, setRecipe] = useState({});
  const [sideDish, setSideDish] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState(undefined);
  
  const riscarNome = (id, index) => {
    console.log(id)
    const check = document.querySelector(`#${id}`);
    check.classList.toggle("selected");
    setIngredients(ingredients.map((obj, i) => {
      if(i === index) return {...obj, isChecked: !obj.isChecked};
      return obj;
    }))
  };
  
  // vai checar se todos os checkbox estao selecionados para habilitar o botao finalizar receita
  const checkAllDone = () => {
    const product = path[1] === 'comidas' ? 'meals' : 'cocktails'  
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
    const recipeFunc = path[1] === 'comidas' ?
      api.food : api.drink;
    const sideDishFunc = path[1] === 'comidas' ?
      api.drink : api.food;
    recipeFunc.getRecipeById(id)
    .then(({ 0: rec }) => {
      setRecipe( prettifyRecipe(rec) ); setRecipeContext(rec);
      setIngredients(getIngredientsAndMesures(prettifyRecipe(rec)));
    });
    sideDishFunc.searchByName('')
      .then((array) => { setSideDish(array.slice(0, 6)); });
  }, []); 
  
  return (
    <div className='basic'>
      <Header recipe={recipe} path={pathname} />
      <div className='list container'>
        <strong>Ingredients</strong>
        {ingredients.map(({ ingredient, measure, isChecked }, i) =>
          <div className="checks" key={ingredient} data-testid={`${i}-ingredient-name-and-measure`}>
            <label
              name={`${i}`} htmlFor={`${ingredient.replace(/ /gi, '-')}`}
              className={isChecked ? 'nomeRiscado' : ''}
              data-testid={`${i}-ingredient-step`}
            >
              <input
                id={`${ingredient.replace(/ /gi, '-')}`}
                type="checkbox" name="selections"
                className={`check-input ${isChecked ? 'selected' : ''}`}
                onChange={({ target: { id }}) => { riscarNome(id, i); checkAllDone(); }}
                checked={isChecked}
              />
              <span>{`${ingredient} - ${measure}`}</span>
            </label>
          </div>,
        )}
        <strong className="instructions">Instructions</strong>
        <div data-testid="instructions" className="instructions">
          <span className="black-text">{ recipe.instructions }</span>
        </div>
        <strong>Recomendadas</strong>
        <div className="cards">
          {
            sideDish.map((sideDataObject, i) => {
              const { id, image, name } = prettifyRecipe(sideDataObject);
              return <Card
                key={id} imageSrc={image}
                title={name} index={i} className={i < 2 ? '' : 'hidden'}
                testIdArray={['-recomendation-card', '', '-recomendation-title']}
              />
            })
          }
        </div>
      </div>
      <button
        data-testid="finish-recipe-btn"
        disabled={!(ingredients.length === checked)}
        id="finalizar-receita"
        className="btn"
        onClick={() => { finishRecipe(recipe, redirect); }}
      >
        Finalizar Receita
      </button>
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
