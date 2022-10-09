"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _signupActions = require("../actions/signupActions");

var _initialState = require("./initialState");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userReducer = (0, _toolkit.createReducer)(_initialState.initialUserState, function (builder) {
  builder.addCase(_signupActions.updateUser.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      user: action.payload.user,
      error: ''
    });
  });
  builder.addCase(_signupActions.updateUser.rejected, function (state, action) {
    return _objectSpread({}, state, {
      user: {},
      error: action.error['message']
    });
  });
});
var _default = userReducer;
exports["default"] = _default;