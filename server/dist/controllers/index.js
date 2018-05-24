'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ping = exports.UserController = exports.Recipe = undefined;

var _RecipeController = require('./RecipeController');

var _RecipeController2 = _interopRequireDefault(_RecipeController);

var _UserController = require('./UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _ping = require('./ping');

var _ping2 = _interopRequireDefault(_ping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recipe = new _RecipeController2.default();

exports.Recipe = Recipe;
exports.UserController = _UserController2.default;
exports.ping = _ping2.default;