const URLcomidas12 = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const URLbebidas12 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const EPIngredMeal = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`
const EPLetraMeal = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeira-letra}`
const EPNomeMeal = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`
const EPIngredDrink = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`
const EPNomeDrink = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`

// Virginia, o Provider tá pronto, quando terminar ai, faça a implementação na linha 18
// blz, na verdade vao ter varias requisicoes de api diferentes, para ingredientes, categorias e tals, ai vou ver se consigo fazer tudo de uma vez
// ok, se precisar de mais states no provider para isso, deixe um coment´pario lá =)
// blz !

const fetchAPIcomidas12 = () => (
  fetch(URLcomidas12)
    .then((response) => (
        response
        .json()
        .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data)))
    ))
);

const fetchAPIbebidas12 = () => (
  fetch(URLbebidas12)
    .then((response) => (
        response
        .json()
        .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data)))
    ))
);