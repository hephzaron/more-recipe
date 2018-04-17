export default () => {
  const ingredient = {
    id: 1,
    name: 'Onions'
  };
  const ingredients = {
    1: {
      id: 1,
      name: 'Green vegetable'
    },
    2: {
      id: 2,
      name: 'Spinach'
    },
    3: {
      id: 3,
      name: 'Malt XY'
    },
    4: {
      id: 1,
      name: 'Salt'
    }
  };

  const recipeIngredients = {
    1: {
      id: 1,
      recipeId: 1,
      ingredientId: 1
    },
    2: {
      id: 2,
      recipeId: 1,
      ingredientId: 2
    },
    3: {
      id: 3,
      recipeId: 1,
      ingredientId: 3
    },
    4: {
      id: 4,
      recipeId: 2,
      ingredientId: 1
    },
    5: {
      id: 5,
      recipeId: 2,
      ingredientId: 3
    },
    6: {
      id: 6,
      recipeId: 2,
      ingredientId: 4
    }
  };
  return {
    recipeIngredients,
    ingredient,
    ingredients
  };
};