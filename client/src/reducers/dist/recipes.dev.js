"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _recipeActions = require("../actions/recipeActions");

var _initialState = require("./initialState");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var recipeReducer = (0, _toolkit.createReducer)(_initialState.initialRecipeState, function (builder) {
  builder.addCase(_recipeActions.createRecipe.pending, function (state) {
    return _objectSpread({}, state, {
      loading: 'pending'
    });
  });
  builder.addCase(_recipeActions.createRecipe.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      recipe: action.payload.recipe,
      error: '',
      loading: 'fulfilled'
    });
  });
  builder.addCase(_recipeActions.createRecipe.rejected, function (state, action) {
    return _objectSpread({}, state, {
      error: action.error['message'],
      loading: 'failed'
    });
  });
  builder.addCase(_recipeActions.updateRecipe.pending, function (state) {
    return _objectSpread({}, state, {
      loading: 'pending'
    });
  });
  builder.addCase(_recipeActions.updateRecipe.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      recipe: action.payload.recipe,
      error: '',
      loading: 'fulfilled'
    });
  });
  builder.addCase(_recipeActions.updateRecipe.rejected, function (state, action) {
    return _objectSpread({}, state, {
      error: action.error.message,
      loading: 'failed'
    });
  });
  builder.addCase(_recipeActions.fetchRecipes.pending, function (state) {
    return _objectSpread({}, state, {
      error: '',
      loading: 'pending'
    });
  });
  builder.addCase(_recipeActions.fetchRecipes.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      recipes: action.payload.recipes,
      error: '',
      loading: 'fulfilled'
    });
  });
  builder.addCase(_recipeActions.fetchRecipes.rejected, function (state, action) {
    return _objectSpread({}, state, {
      error: action.error['message'],
      loading: 'failed'
    });
  });
  builder.addCase(_recipeActions.fetchMyRecipes.pending, function (state) {
    return _objectSpread({}, state, {
      error: '',
      loading: 'pending'
    });
  });
  builder.addCase(_recipeActions.fetchMyRecipes.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      recipes: action.payload.recipes,
      error: '',
      loading: 'fulfilled'
    });
  });
  builder.addCase(_recipeActions.fetchMyRecipes.rejected, function (state, action) {
    return _objectSpread({}, state, {
      error: action.error['message'],
      loading: 'failed'
    });
  });
  builder.addCase(_recipeActions.fetchSavedRecipes.pending, function (state) {
    return _objectSpread({}, state, {
      error: '',
      loading: 'pending'
    });
  });
  builder.addCase(_recipeActions.fetchSavedRecipes.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      recipes: action.payload.savedRecipe,
      error: '',
      loading: 'fulfilled'
    });
  });
  builder.addCase(_recipeActions.fetchSavedRecipes.rejected, function (state, action) {
    return _objectSpread({}, state, {
      error: action.error['message'],
      loading: 'failed'
    });
  });
  builder.addCase(_recipeActions.saveRecipe.pending, function (state) {
    return _objectSpread({}, state, {
      error: '',
      loading: 'pending'
    });
  });
  builder.addCase(_recipeActions.saveRecipe.rejected, function (state, action) {
    return _objectSpread({}, state, {
      error: action.error['message'],
      loading: 'failed'
    });
  });
  builder.addCase(_recipeActions.saveRecipe.fulfilled, function (state) {
    return _objectSpread({}, state, {
      error: '',
      loading: 'fulfilled'
    });
  });
  builder.addCase(_recipeActions.fetchOneRecipe.pending, function (state) {
    return _objectSpread({}, state, {
      error: '',
      loading: 'pending'
    });
  });
  builder.addCase(_recipeActions.fetchOneRecipe.rejected, function (state, action) {
    return _objectSpread({}, state, {
      error: action.error['message'],
      loading: 'failed'
    });
  });
  builder.addCase(_recipeActions.fetchOneRecipe.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      recipe: action.payload.recipe,
      error: '',
      loading: 'fulfilled'
    });
  });
});
var _default = recipeReducer;
exports["default"] = _default;