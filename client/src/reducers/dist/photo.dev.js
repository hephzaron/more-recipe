"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _initialState = require("./initialState");

var _uploadActions = require("../actions/uploadActions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var photoReducer = (0, _toolkit.createReducer)(_initialState.initialPhotoState, function (builder) {
  builder.addCase(_uploadActions.uploadPhoto.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      secureUrl: action.payload['secure_url'],
      deleteToken: action.payload['delete_token'],
      loading: 'fulfilled'
    });
  });
  builder.addCase(_uploadActions.uploadPhoto.pending, function (state) {
    return _objectSpread({}, state, {
      secureUrl: '',
      deleteToken: '',
      loading: 'pending'
    });
  });
  builder.addCase(_uploadActions.uploadPhoto.rejected, function (state) {
    return _objectSpread({}, state, {
      secureUrl: '',
      deleteToken: '',
      loading: 'failed'
    });
  });
  builder.addCase(_uploadActions.deletePhotoByToken.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      data: action.payload['data'],
      loading: 'fulfilled'
    });
  });
  builder.addCase(_uploadActions.deletePhotoByToken.pending, function (state) {
    return _objectSpread({}, state, {
      loading: 'pending'
    });
  });
  builder.addCase(_uploadActions.deletePhotoByToken.rejected, function (state) {
    return _objectSpread({}, state, {
      data: '',
      loading: 'failed'
    });
  });
  builder.addCase(_uploadActions.deletePhotoByName.fulfilled, function (state, action) {
    return _objectSpread({}, state, {
      data: action.payload['data'],
      loading: 'fulfilled'
    });
  });
  builder.addCase(_uploadActions.deletePhotoByName.rejected, function (state) {
    return _objectSpread({}, state, {
      data: '',
      loading: 'failed'
    });
  });
});
var _default = photoReducer;
exports["default"] = _default;