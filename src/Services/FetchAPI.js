// Time, refatorei a API mantendo apenas uma função interna fetchAPI
// e um objeto APIS contendo tanto a URL de cada API quanto os métodos
// e funções para interagir com ela. Sendo assim, fica mais fácil
// manter o controle de tudo e fazer o tratamento das responses
//
// Para usar esse service, basta importar o FetchAPI.js para o seu componente
// e utilizar as seguintes funções correspondentes à 'food' e 'drink':
//
// - searchByName(<string>) para obter a response através de um termo
// - searchByIngredient(<string>) para obter a response através de um ingrediente
// - searchByFirstLetter(<char>) para obter a response através de uma letra
//
// Exemplo:
//
// APIS.food.searchByName('Fish Pie')
// Output -> [{ idMeal: "52802", strMeal: "Fish pie", ...}, ...]
//
// APIS.drink.searchByIngredient('Gin')
// Output -> [{ idDrink: "17255", strDrink: "Gimlet", ... }, ...]
// --------------------------------------------------------------------------------------

const fetchAPI = (url) => (
  fetch(url)
    .then((response) => (
        response
        .json()
        .then((data) => (response.ok ? data.meals || data.drinks || [] : []))
    ))
    .catch((err) => { console.error(err); })
);

export default {
  food: {
    baseUrl: 'https://www.themealdb.com/api/json/v1/1/',
    searchByName(name) { 
      return fetchAPI(`${this.baseUrl}search.php?s=${name}`);
    },
    searchByIngredient(ingredient) {
      return fetchAPI(`${this.baseUrl}filter.php?i=${ingredient}`);
    },
    searchByFirstLetter(letter) {
      if (letter.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
        return;
      }
      return fetchAPI(`${this.baseUrl}search.php?f=${letter}`);
    }
  },
  drink: {
    baseUrl: 'https://www.thecocktaildb.com/api/json/v1/1/',
    searchByName(name) { 
      return fetchAPI(`${this.baseUrl}search.php?s=${name}`);
    },
    searchByIngredient(ingredient) {
      return fetchAPI(`${this.baseUrl}filter.php?i=${ingredient}`);
    },
    searchByFirstLetter(letter) {
      if (letter.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
        return;
      }
      return fetchAPI(`${this.baseUrl}search.php?f=${letter}`);
    }
  },
};
