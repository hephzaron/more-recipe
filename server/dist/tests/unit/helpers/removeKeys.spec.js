'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _removekeys = require('../../../helpers/removekeys');

var _removekeys2 = _interopRequireDefault(_removekeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert;


describe('Remove Keys', function () {
  var obj = {
    id: 0,
    name: 'myname',
    bvn: 21282811,
    password: 'i should be hidden'
  };

  it('it should return same object for unspecified keys', function () {
    var object = (0, _removekeys2.default)(obj);
    assert.deepEqual(Object.keys(object), ['id', 'name', 'bvn', 'password']);
  });

  it('it should return same object for absent keys', function () {
    var object = (0, _removekeys2.default)(obj, ['absentkey']);
    assert.deepEqual(Object.keys(object), ['id', 'name', 'bvn', 'password']);
  });

  it('it should remove key-value pair from an object', function () {
    var withoutKey = (0, _removekeys2.default)(obj, ['password', 'bvn']);
    assert.equal(typeof withoutKey === 'undefined' ? 'undefined' : _typeof(withoutKey), 'object');
    assert.deepEqual(Object.keys(withoutKey), ['id', 'name']);
  });
});