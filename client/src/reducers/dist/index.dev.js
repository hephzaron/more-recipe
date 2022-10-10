"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _pagination = _interopRequireDefault(require("./pagination"));

var _userAuth = _interopRequireDefault(require("./userAuth"));

var _flashMessage = _interopRequireDefault(require("./flashMessage"));

var _modal = _interopRequireDefault(require("./modal"));

var _photo = _interopRequireDefault(require("./photo"));

var _recipes = _interopRequireDefault(require("./recipes"));

var _notification = _interopRequireDefault(require("./notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducer = (0, _redux.combineReducers)({
  recipeReducer: _recipes["default"],
  paginationReducer: _pagination["default"],
  userAuthReducer: _userAuth["default"],
  flashMessageReducer: _flashMessage["default"],
  modalReducer: _modal["default"],
  photoReducer: _photo["default"],
  notificationReducer: _notification["default"]
});
var _default = reducer;
exports["default"] = _default;