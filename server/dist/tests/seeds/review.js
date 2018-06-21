'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var reviewDetails = exports.reviewDetails = {
  userId: 1,
  description: 'Review description',
  parentId: 2,
  imageURL: 'my/review/image/url'
};

var reviews = exports.reviews = [{
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

exports.default = {};