'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _generateIndex2 = require('../../../helpers/generateIndex');

var _generateIndex3 = _interopRequireDefault(_generateIndex2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert;


describe('Generate index', function () {
  it('it should increment by 1', function () {
    var _generateIndex = (0, _generateIndex3.default)({ lastIndex: 1 }),
        nextIndex = _generateIndex.nextIndex;

    assert.equal(nextIndex, 2);
  });
});