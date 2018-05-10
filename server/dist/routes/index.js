'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _middlewares = require('../middlewares');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/signup', function (req, res) {
  return _controllers.User.signup(req, res);
});
router.post('/login', function (req, res) {
  return _controllers.User.login(req, res);
});
router.get('/users', function (req, res) {
  return _controllers.User.getAllUsers(req, res);
});
router.put('/users/:userId', _middlewares.UserAuth.verifyUser, function (req, res) {
  return _controllers.User.editUser(req, res);
});
router.post('/recipes', _middlewares.UserAuth.verifyUser, function (req, res) {
  return _controllers.Recipe.addRecipe(req, res);
});
router.put('/recipes/:recipeId', _middlewares.UserAuth.verifyUser, function (req, res) {
  return _controllers.Recipe.modifyRecipe(req, res);
});
router.delete('/recipes/:recipeId', _middlewares.UserAuth.verifyUser, function (req, res) {
  return _controllers.Recipe.deleteRecipe(req, res);
});
// To sort recipes, append '?sort=[Object key]&order=[desc or asc]'
router.get('/recipes', function (req, res) {
  return _controllers.Recipe.getAllRecipe(req, res);
});
router.post('/recipes/:recipeId/reviews', _middlewares.UserAuth.verifyUser, function (req, res) {
  return _controllers.Recipe.addReview(req, res);
});

exports.default = router;