export const reviewDetails = {
  userId: 1,
  description: 'Review description',
  imageURL: 'my/review/image/url'
};

export const reviews = [{
  userId: 2,
  recipeId: 2,
  parentId: 0,
  description: 'recipe description'
}, {
  userId: 3,
  recipeId: 3,
  parentId: 0,
  description: 'recipe description'
}, {
  userId: 1,
  recipeId: 2,
  parentId: 2,
  description: 'recipe description'
}, {
  userId: 4,
  recipeId: 2,
  parentId: 5,
  description: 'recipe description'
}];

export default {};