import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

import { appPage, prettifyRecipe, isRecipeStarted, isRecipeFinished } from '../Services/Utils';

import api from '../Services/FetchAPI';
import Card from '../Components/Card';
import storage from '../Services/LocalStorage';

import './style.css';
import Loader from '../utils/loader';

const YouTube = ({ recipe: { video } }) => {
  return <div class="video-container">
    <iframe
      data-testid="video"
      id="yt-video"
      width="300"
      height="480"
      src={ video }
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    />
  </div>
};

function Detail({ id, type, path, pathname, redirect }) {
  const [recipe, setRecipe] = useState({});
  const [sideDish, setSideDish] = useState([]);

  useEffect(() => {
    Loader.init();
    Loader.start();
    // Verifica qual página está sendo montada
    const theFetch = type === 'meal' ? api.food : api.drink;
    const theFech2 = type === 'meal' ? api.drink : api.food;
    theFetch.getRecipeById(id).then(({ 0: rec }) => {
      setRecipe(prettifyRecipe(rec));
      Loader.stop();
    });
    theFech2.searchByName('').then((array) => {
      setSideDish(array.slice(0, 6));
      Loader.stop();
    });
  }, []);

  return (
    <div className="detail">
      <Header recipe={recipe} path={pathname} />
      <div className="container">
        <strong className="title">Ingredients</strong>
        {(recipe.ingredientsAndMesures || []).map(({ ingredient, measure }, i) =>
          <div key={ingredient} data-testid={`${i}-ingredient-name-and-measure`}>
            {`- ${ingredient} - ${measure}`}
          </div>,
        )}
        <strong className="title">Instructions</strong>
        <div data-testid="instructions">
          { recipe.instructions }
        </div>
        <YouTube recipe={recipe} />
        <strong className="title">Recomendadas</strong>
        <div className="cards">
          {sideDish.map((sideDataObject, i) => {
            const { id, image: src, name } = prettifyRecipe(sideDataObject);
            return <Card
              key={ id } imageSrc={ src }
              title={ name } index={i} className={i < 2 ? '' : 'hidden'}
              testIdArray={['-recomendation-card', '', '-recomendation-title']}
            />;
          })}
        </div>
        <button
          className={`btn btn-start ${isRecipeFinished(id, type) ? 'hidden' : '' }`}
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
