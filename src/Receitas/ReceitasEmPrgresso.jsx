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
import './ReceitasEmProgresso.css'

const getIngredientsAndMesures = (r) => {
  const checkedArray = ((storage
    .getValueByKey('inProgressRecipes')[`${r.typeBizarre}s`] || [])[r.id]) || [];
  
  const t = r.ingredientsAndMesures.map((rec) => (
    { ...rec, isChecked: checkedArray.includes(rec.ingredient) }
  ));

  console.log(t, r.typeBizarre);
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

const ReceitasEmProgresso = ({ id, path, redirect }) => {
  const { setRecipeContext } = useContext(AppContext);
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
        <button
          data-testid="finish-recipe-btn"
          disabled={!(ingredients.length === checked)}
          id="finalizar-receita"
          onClick={() => { finishRecipe(recipe, redirect); }}
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
