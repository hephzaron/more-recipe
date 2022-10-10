"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRecipe = exports.unsaveRecipe = exports.saveRecipe = exports.updateRecipe = exports.createRecipe = exports.fetchSavedRecipes = exports.fetchOneRecipe = exports.fetchMyRecipes = exports.fetchRecipes = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _toolkit = require("@reduxjs/toolkit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_dotenv["default"].config();

var SERVER_URL = process.env.SERVER_URL;
/**
 * Get recipes
 * @description Get recipes from server
 * @param {String} offset - offset query to fetch paginated items
 * @returns { promise } -Axios http response
 */

var fetchRecipes = (0, _toolkit.createAsyncThunk)('recipes/fetchRecipesStatus', function _callee() {
  var offset,
      limit,
      sort,
      order,
      response,
      _args = arguments;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          offset = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
          _context.prev = 1;
          limit = 40;
          sort = 'createdAt';
          order = 'DESC';
          _context.next = 7;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(SERVER_URL, "/recipes?sort=").concat(sort, "&order=").concat(order, "&offset=").concat(offset, "&limit=").concat(limit)));

        case 7:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", Promise.reject(_context.t0.response.data));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
/**
 * Get my recipes
 * @description Get creator recipes from server
 * @param {String} userId - Id of user
 * @returns { promise } -Axios http response
 */

exports.fetchRecipes = fetchRecipes;
var fetchMyRecipes = (0, _toolkit.createAsyncThunk)('recipes/fetchMyRecipesStatus', function _callee2(userId) {
  var response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(SERVER_URL, "/recipes?userId=").concat(userId)));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", Promise.reject(_context2.t0.response.data));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
/**
 * Get one recipe
 * @description Get a recipe from server
 * @param {integer} id - recipe id
 * @returns { promise } -Axios http response
 */

exports.fetchMyRecipes = fetchMyRecipes;
var fetchOneRecipe = (0, _toolkit.createAsyncThunk)('recipes/fetchOneRecipeStatus', function _callee3(_ref) {
  var id, response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = _ref.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(SERVER_URL, "/recipes/").concat(id)));

        case 4:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", Promise.reject(_context3.t0.response.data));

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
/**
 * Get user saved recipes
 * @description Get saved recipes from server
 * @param {String} offset - offset query to fetch paginated items
 * @param {integer} userId - Id of user that saved recipe
 * @returns { promise } -Axios http response
 */

exports.fetchOneRecipe = fetchOneRecipe;
var fetchSavedRecipes = (0, _toolkit.createAsyncThunk)('recipes/fetchSavedRecipesStatus', function _callee4(_ref2) {
  var offset, userId, limit, sort, order, response;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          offset = _ref2.offset, userId = _ref2.userId;
          _context4.prev = 1;
          limit = 40;
          sort = 'createdAt';
          order = 'DESC';
          _context4.next = 7;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(SERVER_URL, "/recipes/saved/").concat(userId, "?sort=").concat(sort, "&order=").concat(order, "&offset=").concat(offset, "&limit=").concat(limit)));

        case 7:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", Promise.reject(_context4.t0.response.data));

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
/**
 * createRecipe
 * @description creates a recipe
 * @param {object} recipe - recipe payload to be created
 * @returns { promise } -Axios http response from the server
 */

exports.fetchSavedRecipes = fetchSavedRecipes;
var createRecipe = (0, _toolkit.createAsyncThunk)('recipes/createRecipeStatus', function _callee5(recipe) {
  var userId, name, description, photoUrl, response;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = recipe.userId, name = recipe.name, description = recipe.description, photoUrl = recipe.photoUrl;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(SERVER_URL, "/recipes"), {
            userId: userId,
            name: name[0],
            description: description[0],
            photoUrl: photoUrl
          }));

        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", response.data);

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);

          if (!(_context5.t0.response && _context5.t0.response.status > 201)) {
            _context5.next = 14;
            break;
          }

          if (!_context5.t0.response.data.error) {
            _context5.next = 13;
            break;
          }

          return _context5.abrupt("return", Promise.reject(_context5.t0.response.data.error));

        case 13:
          return _context5.abrupt("return", Promise.reject(_context5.t0.response.data));

        case 14:
          return _context5.abrupt("return", Promise.reject(_context5.t0.response.data));

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
/**
 * @function updateRecipe
 * @description updates a recipe
 * @param {integer} userId - Id of user performing the action
 * @param {integer} id - recipe id
 * @returns { promise } -Axios http response from the server
 */

exports.createRecipe = createRecipe;
var updateRecipe = (0, _toolkit.createAsyncThunk)('recipes/updateRecipeStatus', function _callee6(_ref3) {
  var userId, recipe, response;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          userId = _ref3.userId, recipe = _ref3.recipe;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(SERVER_URL, "/recipes/").concat(userId, "/").concat(recipe.id), _objectSpread({}, recipe)));

        case 4:
          response = _context6.sent;
          return _context6.abrupt("return", response.data);

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          return _context6.abrupt("return", Promise.reject(_context6.t0.response.data));

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
/**
 * @function saveRecipe
 * @description saves a recipe
 * @param {integer} userId - Id of user performing the action
 * @param {integer} id - recipe id
 * @returns { promise } -Axios http response from the server
 */

exports.updateRecipe = updateRecipe;
var saveRecipe = (0, _toolkit.createAsyncThunk)('recipes/saveRecipeStatus', function _callee7(_ref4) {
  var userId, id, creatorId, response;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          userId = _ref4.userId, id = _ref4.id, creatorId = _ref4.creatorId;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(SERVER_URL, "/recipes/save/").concat(userId, "/").concat(id), {
            creatorId: creatorId
          }));

        case 4:
          response = _context7.sent;
          return _context7.abrupt("return", response.data);

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          return _context7.abrupt("return", Promise.reject(_context7.t0.response.data));

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
/**
 * @function unsaveRecipe
 * @description deletes a saved recipe
 * @param {integer} userId - Id of user performing the action
 * @param {integer} id - recipe id
 * @returns { promise } -Axios http response from the server
 */

exports.saveRecipe = saveRecipe;
var unsaveRecipe = (0, _toolkit.createAsyncThunk)('recipes/unsaveRecipeStatus', function _callee8(_ref5) {
  var userId, id, response;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          userId = _ref5.userId, id = _ref5.id;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(SERVER_URL, "/recipes/unsave/").concat(userId, "/").concat(id)));

        case 4:
          response = _context8.sent;
          return _context8.abrupt("return", response.data);

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          return _context8.abrupt("return", Promise.reject(_context8.t0.response.data));

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
/**
 * @function deleteRecipe
 * @description allows a recipe creator to delete recipe
 * @param {integer} userId - Id of user performing the action
 * @param {integer} id - recipe id
 * @returns { promise } -Axios http response from the server
 */

exports.unsaveRecipe = unsaveRecipe;
var deleteRecipe = (0, _toolkit.createAsyncThunk)('recipes/deleteRecipeStatus', function _callee9(_ref6) {
  var userId, id, response;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          userId = _ref6.userId, id = _ref6.id;
          _context9.prev = 1;
          _context9.next = 4;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(SERVER_URL, "/recipes/").concat(userId, "/").concat(id)));

        case 4:
          response = _context9.sent;
          return _context9.abrupt("return", response.data);

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](1);
          return _context9.abrupt("return", Promise.reject(_context9.t0.response.data));

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
exports.deleteRecipe = deleteRecipe;