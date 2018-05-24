'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var reviewDetails = {
    userId: 1,
    description: 'Review description',
    imageURL: 'my/review/image/url'
  };
  var userReviews = [{
    id: 1,
    userId: 2,
    recipeId: 1,
    parentId: 0,
    modifiedRecipe: ''
  }, {
    id: 2,
    userId: 1,
    recipeId: 1,
    parentId: 1,
    modifiedRecipe: ''
  }, {
    id: 3,
    userId: 2,
    recipeId: 1,
    parentId: 2,
    modifiedRecipe: ''
  }, {
    id: 4,
    userId: 1,
    recipeId: 1,
    parentId: 2,
    modifiedRecipe: ''
  }, {
    id: 5,
    userId: 1,
    recipeId: 1,
    parentId: 1,
    modifiedRecipe: ''
  }];
  return {
    reviewDetails: reviewDetails,
    userReviews: userReviews
  };
};