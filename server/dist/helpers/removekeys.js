'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = removeKeys;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  if (Array.isArray(keys) && (typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object') {
    var obj = object;
    keys.map(function (key) {
      return delete obj[key];
    });
    return obj;
  }
  return object;
}