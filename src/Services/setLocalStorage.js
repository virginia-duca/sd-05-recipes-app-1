const setFavoriteStorage = ({ 
  strMealThumb, strMeal, strAlcoholic, strCategory, strDrinkThumb, strDrink, strArea, idMeal, idDrink
}) => {
  const favoriteRecipe = {
    id: idMeal || idDrink,
    type: idMeal ? 'comidas' : 'bebidas',
    area: strArea === null || strArea === undefined ? '': strArea,
    category: strCategory == null || strCategory === undefined ? '' : strCategory,
    alcoholicOrNot: strAlcoholic === undefined || strAlcoholic === null ? '' : strAlcoholic,
    name: strMeal || strDrink,
    image: strMealThumb || strDrinkThumb,
  }
  storage.initStorage()
  const favoritesInStorage = storage.getValueByKey('favoriteRecipes')
  storage.setValueByKey('favoriteRecipes', [...favoritesInStorage, favoriteRecipe])
  console.log(favoriteRecipe)
}