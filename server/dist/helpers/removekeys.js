'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = removeKeys;
/**
 * Remove selected keys from object
 * @param { object } object -Object to remove keys from
 * @param { array } keys -Array of keys to be removed
 * @returns { object } object
 */
function removeKeys(object, keys) {
  if (!keys) {
    if (!object) {
      return null;
    }
    return object;
  }
  if (Array.isArray(keys) && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
    var obj = object;
    keys.map(function (key) {
      return delete obj[key];
    });
    return obj;
  }
  return object;
}