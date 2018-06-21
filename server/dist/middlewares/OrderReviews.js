'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _GenerateTreeStructure = require('../helpers/GenerateTreeStructure');

var _GenerateTreeStructure2 = _interopRequireDefault(_GenerateTreeStructure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This orders hierarchical structure of reviews from database
 * @param { object } reviews
 * @param { number } parentReview
 * @returns { array } array of recipe reviews
 */
var OrderReviews = function (_GenerateTreeStructur) {
  (0, _inherits3.default)(OrderReviews, _GenerateTreeStructur);

  function OrderReviews() {
    (0, _classCallCheck3.default)(this, OrderReviews);
    return (0, _possibleConstructorReturn3.default)(this, (OrderReviews.__proto__ || (0, _getPrototypeOf2.default)(OrderReviews)).apply(this, arguments));
  }

  (0, _createClass3.default)(OrderReviews, [{
    key: 'structure',

    /**
     * structure
     * @param { object } reviews
     * @returns { object } class
     */
    value: function structure(reviews) {
      var _this2 = this;

      var rootIndex = _lodash2.default.findIndex(reviews, { parentId: 0 });
      (0, _get3.default)(OrderReviews.prototype.__proto__ || (0, _getPrototypeOf2.default)(OrderReviews.prototype), 'add', this).call(this, reviews[rootIndex]);
      reviews.forEach(function (review) {
        var parentIndex = _lodash2.default.findIndex(reviews, { id: review.parentId });
        if (review.parentId !== 0) {
          (0, _get3.default)(OrderReviews.prototype.__proto__ || (0, _getPrototypeOf2.default)(OrderReviews.prototype), 'add', _this2).call(_this2, review, reviews[parentIndex]);
        }
      });
      return this.root;
    }
  }]);
  return OrderReviews;
}(_GenerateTreeStructure2.default);

exports.default = OrderReviews;