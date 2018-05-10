"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Generate indexes for object creation
 * @param {object} lastIndex
 * @returns { number } nextIndex
 */
var generateIndex = function generateIndex(_ref) {
  var lastIndex = _ref.lastIndex;

  var nextIndex = lastIndex + 1;
  return {
    nextIndex: nextIndex
  };
};
exports.default = generateIndex;