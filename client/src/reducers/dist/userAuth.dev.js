"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _lodash = _interopRequireDefault(require("lodash"));

var _authUserActions = require("../actions/authUserActions");

var _signupActions = require("../actions/signupActions");

var _userActions = require("../actions/userActions");

var _initialState = require("./initialState");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userAuthReducer = (0, _toolkit.createReducer)(_initialState.initialUserState, function (builder) {
  builder.addCase(_authUserActions.set, function (state, action) {
    return _objectSpread({}, state, {
      user: action.payload.user,
      error: '',
      isAuthenticated: !_lodash["default"].isEmpty(action.payload.user)
    });
  });
  builder.addCase(_authUserActions.loginUser.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      user: action.payload.user
    });
  });
  builder.addCase(_authUserActions.loginUser.rejected, function (state, action) {
    return _objectSpread({}, state, {
      user: {},
      error: action.error['message'],
      isAuthenticated: false
    });
  });
  builder.addCase(_authUserActions.unset, function (state) {
    return _objectSpread({}, state, {
      user: {},
      isAuthenticated: false,
      error: null
    });
  });
  builder.addCase(_signupActions.updateUser.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      error: ''
    });
  });
  builder.addCase(_signupActions.updateUser.rejected, function (state, action) {
    return _objectSpread({}, state, {
      error: action.error['message']
    });
  });
  builder.addCase(_userActions.fetchOneUser.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      user: action.payload.user,
      error: ''
    });
  });
  builder.addCase(_userActions.fetchOneUser.rejected, function (state, action) {
    return _objectSpread({}, state, {
      user: {},
      error: action.error['message']
    });
  });
});
var _default = userAuthReducer;
exports["default"] = _default;