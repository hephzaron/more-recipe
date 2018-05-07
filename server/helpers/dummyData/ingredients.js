export default () => {
  const ingredient = {
    id: 1,
    name: 'Onions'
  };
  const ingredients = [{
    id: 1,
    name: 'Green vegetable'
  }, {
    id: 2,
    name: 'Spinach'
  }, {
    id: 3,
    name: 'Malt XY'
  }, {
    id: 1,
    name: 'Salt'
  }];

  const recipeIngredients = [{
    id: 1,
    recipeId: 1,
    ingredientId: 1
  }, {
    id: 2,
    recipeId: 1,
    ingredientId: 2
  }, {
    id: 3,
    recipeId: 1,
    ingredientId: 3
  }, {
    id: 4,
    recipeId: 2,
    ingredientId: 1
  }, {
    id: 5,
    recipeId: 2,
    ingredientId: 3
  }, {
    id: 6,
    recipeId: 2,
    ingredientId: 4
  }];
  return {
    recipeIngredients,
    ingredient,
    ingredients
  };
};