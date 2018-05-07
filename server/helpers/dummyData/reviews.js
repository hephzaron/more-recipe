export default () => {
  const review = {
    id: 1,
    userId: 1,
    recipeId: 1,
    modifiedRecipe: ''
  };
  const userReviews = [{
    id: 1,
    userId: 1,
    recipeId: 1,
    modifiedRecipe: ''
  }, {
    id: 2,
    userId: 1,
    recipeId: 2,
    modifiedRecipe: ''
  }, {
    id: 3,
    userId: 2,
    recipeId: 1,
    modifiedRecipe: ''
  }];
  return {
    review,
    userReviews
  };
};