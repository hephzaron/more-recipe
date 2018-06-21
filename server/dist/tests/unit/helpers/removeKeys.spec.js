'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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
    assert.deepEqual((0, _keys2.default)(object), ['id', 'name', 'bvn', 'password']);
  });

  it('it should return same object for absent keys', function () {
    var object = (0, _removekeys2.default)(obj, ['absentkey']);
    assert.deepEqual((0, _keys2.default)(object), ['id', 'name', 'bvn', 'password']);
  });

  it('it should remove key-value pair from an object', function () {
    var withoutKey = (0, _removekeys2.default)(obj, ['password', 'bvn']);
    assert.equal(typeof withoutKey === 'undefined' ? 'undefined' : (0, _typeof3.default)(withoutKey), 'object');
    assert.deepEqual((0, _keys2.default)(withoutKey), ['id', 'name']);
  });
});