/** @format */

import { withRouter } from 'react-router-dom';
import storage from '../Services/LocalStorage';

const getPath = (pathname) => pathname.split('/');

const getIngredients = (recipe) =>
  Object.entries(recipe)
    .filter(({ 0: key }) => key.includes('strIngredient'))
    .map(({ 1: ingredient }) => ingredient || '')
    .filter(({ length }) => length > 0);

const getMeasures = (recipe) =>
  Object.entries(recipe)
    .filter(({ 0: key }) => key.includes('strMeasure'))
    .map(({ 1: ingredient }) => ingredient || '')
    .filter(({ length }) => length > 0);

export const isRecipeStarted = (id, typeBizarre) => {
  storage.initStorage();
  const l =
    typeof (storage.getValueByKey('inProgressRecipes')[`${typeBizarre}s`] || {})[id] !==
    'undefined';
  return l;
};

export const isRecipeFinished = (id, type) => {
  const f = storage.getValueByKey('doneRecipes') || [{ id: -1 }];
  return (
    f.reduce((i, { id: rid, type: rtype }) => (rid !== id || type === rtype ? i : id), -1) !== -1
  );
};

export const isRecipeFavorited = (id, type) => {
  const cType = type === 'cocktails' ? 'bebidas' : 'comidas';
  const f = storage.getValueByKey('favoriteRecipes') || [{ id: -1 }];
  return (
    f.reduce((i, { id: rid, type: rtype }) => (rid !== id && cType === rtype ? i : id), -1) !== -1
  );
};

export const toggleFavorite = (
  { id: recivedId, type, area, category, alcoholicOrNot, name, image },
) => {
  const favoritedObj = {
    id: recivedId,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  };
  const f = storage.getValueByKey('favoriteRecipes') || [{ id: -1 }];
  const fid = f.reduce((i, { id: favId }) => (favId !== recivedId ? i : recivedId), -1);
  storage.setValueByKey(
    'favoriteRecipes',
    [...f, favoritedObj].filter(({ id: favId }) => (favId !== fid)),
  );
  return fid === -1;
};

export const prettifyRecipe = (recipe) => {
  const {
    idDrink,
    idMeal,
    strInstructions,
    strDrink,
    strMeal,
    strCategory,
    strAlcoholic,
    strArea,
    strDrinkThumb,
    strMealThumb,
    strTags,
    strVideo,
    strYoutube,
  } = recipe;
  return {
    instructions: strInstructions,
    id: idDrink || idMeal,
    type: idDrink ? 'bebida' : 'comida',
    typeEn: idDrink ? 'drink' : 'meal',
    typeBizarre: idDrink ? 'cocktail' : 'meal',
    area: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strDrink || strMeal,
    image: strDrinkThumb || strMealThumb,
    video: strVideo || strYoutube,
    tags: (strTags || '').split(','),
    ingredientsAndMesures: getIngredients(recipe).map((ingredient, i) => ({
      ingredient,
      measure: getMeasures(recipe)[i],
    })),
  };
};

export const appPage = (component) => {
  storage.initStorage();
  return withRouter(
    ({
      match: {
        params: { id },
      },
      location: { pathname },
      history,
    }) => {
      const data = {
        id,
        type: pathname.includes('comidas') ? 'meal' : 'cocktails',
        redirect(to) {
          history.push(to);
        },
        pathname,
        path: getPath(pathname),
      };
      return component(data);
    },
  );
};
