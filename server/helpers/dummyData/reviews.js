export default () => {
  const reviewDetails = {
    userId: 1,
    description: 'Review description',
    imageURL: 'my/review/image/url'
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
    reviewDetails,
    userReviews
  };
};