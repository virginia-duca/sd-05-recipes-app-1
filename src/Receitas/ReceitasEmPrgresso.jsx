/** @format */

import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import AppContext from '../Context/AppContext';
import storage from '../Services/LocalStorage';
import Header from '../Components/Header';
import { appPage, prettifyRecipe } from '../Services/Utils';

// Recursos
import './ReceitasEmProgresso.css';


// Desconstroi o objeto "meals" e salva informacoes de ingredientes,
// mesures e isChecked(checa se o ingrediente ja foi riscado)
// como um array no state(Ingredients)
const getIngredientsAndMesures = (r) => {
  const checkedArray =
    (storage.getValueByKey('inProgressRecipes')[`${r.typeBizarre}s`] || [])[r.id] || [];

  const t = r.ingredientsAndMesures.map((rec) => ({
    ...rec,
    isChecked: checkedArray.includes(rec.ingredient),
  }));

  console.log(t, r.typeBizarre);
  return t;
};


// se a receita for finalizada, esta funcao salva sua informacoes
// na chave 'doneRecepies' do localStorage
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
    doneDate: `${now.getDate()}/${
      now.getMonth() < 10 ? 0 : ''
    }${now.getMonth()}/${now.getFullYear()}`,
  };
  const currentDone = storage.getValueByKey('doneRecipes');
  storage.setValueByKey('doneRecipes', [...currentDone, doneObject]);
  redirect('../../receitas-feitas');
};

const ReceitasEmProgresso = ({ id, path, pathname, redirect, type }) => {
  const { setRecipeContext } = useContext(AppContext);
  const [recipe, setRecipe] = useState({});
  const [sideDish, setSideDish] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState(undefined);

  const riscarNome = (ids, index) => {
    const check = document.getElementsByName(ids)[0];
    check.classList.toggle('selected');
    setIngredients(
      ingredients.map((obj, i) => {
        if (i === index) return { ...obj, isChecked: !obj.isChecked };
        return obj;
      }),
    );
  };

  // vai checar se todos os checkbox estao selecionados para habilitar o botao finalizar receita
  // também salva ingredientes riscados na chave 'inProgressRecipes'do localSTorage
  const checkAllDone = () => {
    const product = path[1] === 'comidas' ? 'meals' : 'cocktails';
    const listOfItems = [...document.getElementsByTagName('input')];
    const list = listOfItems
      .filter((item) => item.classList.contains('selected'))
      .map((item) => item.name);
    setChecked(list.length);
    const curRecipes = storage.getValueByKey('inProgressRecipes')[product];
    storage.setValueByKey('inProgressRecipes', { [product]: { ...curRecipes, [id]: list } });
  };

  useEffect(() => {
    // Verifica qual página está sendo montada
    storage.initStorage();
    const theFetch = type === 'meal' ? api.food : api.drink;
    const theFech2 = type === 'meal' ? api.drink : api.food;
    console.log(type);
    theFetch.getRecipeById(id).then(({ 0: rec }) => {
      setRecipe(prettifyRecipe(rec));
      setRecipeContext(rec);
      setIngredients(getIngredientsAndMesures(prettifyRecipe(rec)));
    });
    theFech2.searchByName('').then((array) => {
      setSideDish(array.slice(0, 6));
    });
  }, []);

// prettier ignore
  return (
    <div className="basic">
      <Header recipe={recipe} path={pathname} />
      <div className="basic">
        <strong>Ingredients</strong>
        {ingredients.map(({ ingredient, measure, isChecked }, i) => (
          <div key={ingredient} data-testid={`${i}-ingredient-name-and-measure`}>
            <label
              id={`${ingredient}`}
              name={`${i}`}
              htmlFor={`${ingredient}`}
              className={isChecked ? 'nomeRiscado' : ''}
              data-testid={`${i}-ingredient-step`}
            >
              <input
                type="checkbox"
                name={`${ingredient}`}
                className={`check-input ${isChecked ? 'selected' : ''}`}
                onChange={({ target: { name } }) => {
                  riscarNome(name, i);
                  checkAllDone();
                }}
                checked={isChecked}
              />
              {`${ingredient} - ${measure}`}
            </label>
          </div>
        ))}
        <strong className="instructions">Instructions</strong>
        <div data-testid="instructions" className="instructions">
          {recipe.instructions}
        </div>
        <strong>Recomendadas</strong>
        {sideDish.map((sideDataObject, i) => {
          const { id: idx, image, name } = prettifyRecipe(sideDataObject);
          return (
            <Card
              key={idx}
              imageSrc={image}
              title={name}
              index={i}
              className={i < 2 ? '' : 'hidden'}
              testIdArray={['-recomendation-card', '', '-recomendation-title']}
            />
          );
        })}
        <button
          data-testid="finish-recipe-btn"
          disabled={!(ingredients.length === checked)}
          id="finalizar-receita"
          onClick={() => {
            finishRecipe(recipe, redirect);
          }}
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};

ReceitasEmProgresso.propTypes = {
  location: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
}.isRequired;

export default appPage(ReceitasEmProgresso);
