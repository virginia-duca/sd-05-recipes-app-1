/** @format */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

import { appPage, prettifyRecipe, isRecipeStarted, isRecipeFinished } from '../Services/Utils';

import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import storage from '../Services/LocalStorage';

import './Detail.css';

const YouTube = ({ recipe: { video } }) => (
  <iframe
    data-testid="video"
    width="560"
    height="315"
    src={video}
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  />
);

function Detail({ id, type, path, pathname, redirect }) {
  const [recipe, setRecipe] = useState({});
  const [sideDish, setSideDish] = useState([]);

  useEffect(() => {
    // Verifica qual página está sendo montada
    const theFetch = type === 'meal' ? api.food : api.drink;
    const theFech2 = type === 'meal' ? api.drink : api.food;
    theFetch.getRecipeById(id).then(({ 0: rec }) => {
      setRecipe(prettifyRecipe(rec));
    });
    theFech2.searchByName('').then((array) => {
      setSideDish(array.slice(0, 6));
    });
  }, []);

  /* const startRecipe = () => {
    const product = path[1] === 'comidas' ? 'meals' : 'cocktails';
    const curRecipes = storage.getValueByKey('inProgressRecipes')[product] || [];
    storage.setValueByKey('inProgressRecipes', {
      [product]: { ...curRecipes, [id]: curRecipes[id] || [] },
    });
    redirect(`${pathname}/in-progress`);
  }; */

  return (
    <div>
      <Header recipe={recipe} path={pathname} />
      <div>
        <strong>Ingredients</strong>
        {(recipe.ingredientsAndMesures || []).map(({ ingredient, measure }, i) => (
          <div key={ingredient} data-testid={`${i}-ingredient-name-and-measure`}>
            {`- ${ingredient} - ${measure}`}
          </div>
        ))}
        <strong>Instructions</strong>
        <div data-testid="instructions">{recipe.instructions}</div>
        <YouTube recipe={recipe} />
        <strong>Recomendadas</strong>
        {sideDish.map((sideDataObject, i) => {
          const { id: ids, image: src, name } = prettifyRecipe(sideDataObject);
          return (
            <Card
              key={ids}
              imageSrc={src}
              title={name}
              index={i}
              className={i < 2 ? '' : 'hidden'}
              testIdArray={['-recomendation-card', '', '-recomendation-title']}
            />
          );
        })}
        <button
          className={`btn-start ${isRecipeFinished(id, type) ? 'hidden' : ''}`}
          data-testid="start-recipe-btn"
          onClick={() => {
            const product = path[1] === 'comidas' ? 'meals' : 'cocktails';
            const curRecipes = storage.getValueByKey('inProgressRecipes')[product] || [];
            storage.setValueByKey('inProgressRecipes', {
              [product]: { ...curRecipes, [id]: curRecipes[id] || [] },
            });
            redirect(`${pathname}/in-progress`);
          }}
        >
          {isRecipeStarted(id, recipe.typeBizarre) ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};

YouTube.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};

Detail.propTypes = {
  location: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
}.isRequired;

export default appPage(Detail);
