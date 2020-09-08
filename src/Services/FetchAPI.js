//Aqui está a funcao que irá realizar o fetch dos dados, como serao feitas varias requisicoes diferentes, foi feita uma funcao que recebe como parametro o endpoint especificado que esta no objeto APIS

const APIS = {
  URLcomidas12: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  URLbebidas12: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  EPIngredMeal: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  EPLetraMeal: `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeira-letra}`,
  EPNomeMeal: `${APIS.URLcomidas12}${nome}`,
  EPIngredDrink: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  EPNomeDrink: `${APIS.URLbebidas12}${nome}`,
  EPLetraDrink: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeira-letra}`,
};

const fetchAPI = (url) => (
  fetch(url)
    .then((response) => (
        response
        .json()
        .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data)))
    ))
);

export { APIS, fetchAPI };
