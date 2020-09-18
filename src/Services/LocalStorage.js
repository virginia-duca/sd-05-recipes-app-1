/** @format */

const defaultStorage = {
/*   mealsToken: null,
  cocktailsToken: null, */
  doneRecipes: [],
  favoriteRecipes: [],
  inProgressRecipes: {},
  /* user: null, */
};

const isStorageExists = () => {
  if (typeof Storage !== 'undefined') {
    alert('Seu browser não tem suporte para o LocalStorage');
    return false;
  }
  return true;
};

// Inicia um Storage mas não sobrescreve/apaga as keys
const initStorage = () => {
  if (!isStorageExists) return;
  Object.entries(defaultStorage).forEach(({ 0: key, 1: value }) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(value));
  });
};

const clearStorage = () => {
  if (!isStorageExists) return;
  Object.entries(defaultStorage).forEach(({ 0: key, 1: value }) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
};

// Retorna um valor de uma chave
const getValueByKey = (key) => {
  if (!isStorageExists) return [];
  return JSON.parse(localStorage.getItem(key));
};

// Salva um valor em uma chave
const setValueByKey = (key, value) => {
  if (!isStorageExists) return;
  localStorage.setItem(key, JSON.stringify(value));
};

// Retorna o Storage como um objeto
const getStorageAsObject = () => {
  if (!isStorageExists) return {};
  const result = { ...defaultStorage };
  Object.keys(result).forEach((key) => {
    result[key] = JSON.parse(localStorage.getItem(key)) || result[key];
  });
  return result;
};

export default {
  initStorage,
  clearStorage,
  setValueByKey,
  getValueByKey,
  getStorageAsObject,
};
