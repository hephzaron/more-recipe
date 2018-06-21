'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var recipeDetails = {
    userId: 1,
    name: 'RecipeName',
    description: 'Describe your recipe in details',
    imageURL: 'images/recipe/url',
    upvotes: 5,
    downvotes: 6,
    numberOfReviews: 4,
    replies: (0, _stringify2.default)({})
  };

  var recipes = [{
    id: 1,
    name: 'RecipeName',
    description: 'Describe your recipe in details',
    imageURL: 'images/recipe/url',
    upvotes: 5,
    favorites: 4,
    downvotes: 6,
    numberOfReviews: 4,
    numberOfViews: 6,
    replies: (0, _stringify2.default)([{
      userId: 1,
      recipeId: 2,
      replyId: 1,
      numberOfLikes: 4,
      replyMessage: 'I am message 1',
      subReplies: [{
        userId: 1,
        recipeId: 2,
        replyId: '1-1',
        numberOfLikes: 4,
        replyMessage: 'I am reply 1 of 1',
        subReplies: []
      }, {
        userId: 4,
        recipeId: 2,
        replyId: '1-2',
        numberOfLikes: 4,
        replyMessage: 'I am reply 2 of 1',
        subReplies: []
      }]
    }, {
      userId: 1,
      recipeId: 2,
      replyId: 1,
      numberOfLikes: 4,
      replyMessage: 'I am message 2',
      subReplies: []
    }])
  }, {
    id: 2,
    name: 'RecipeName2',
    description: 'Describe your recipe in details2',
    imageURL: 'images/recipe/url2',
    upvotes: 10,
    favorites: 4,
    downvotes: 6,
    numberOfReviews: 4,
    numberOfViews: 3,
    replies: {}
  }, {
    id: 3,
    name: 'RecipeName3',
    description: 'Describe your recipe in details3',
    imageURL: 'images/recipe/url3',
    upvotes: 8,
    favorites: 5,
    downvotes: 6,
    numberOfReviews: 4,
    numberOfViews: 2,
    replies: {}
  }];

  var usersRecipes = [{
    userId: 1,
    recipeId: 1
  }, {
    userId: 1,
    recipeId: 2
  }, {
    userId: 2,
    recipeId: 1
  }, {
    userId: 3,
    recipeId: 1
  }, {
    userId: 3,
    recipeId: 3
  }];
  return {
    recipeDetails: recipeDetails,
    recipes: recipes,
    usersRecipes: usersRecipes
  };
};