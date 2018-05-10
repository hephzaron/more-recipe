'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.Recipe = undefined;

var _RecipeController = require('./RecipeController');

var _RecipeController2 = _interopRequireDefault(_RecipeController);

var _UserController = require('./UserController');

var _UserController2 = _interopRequireDefault(_UserController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recipe = new _RecipeController2.default();
var User = new _UserController2.default();

exports.Recipe = Recipe;
exports.User = User;