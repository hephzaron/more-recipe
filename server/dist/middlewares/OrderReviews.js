'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _GenerateTreeStructure = require('../helpers/GenerateTreeStructure');

var _GenerateTreeStructure2 = _interopRequireDefault(_GenerateTreeStructure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This orders hierarchical structure of reviews from database
 * @param { object } reviews
 * @param { number } parentReview
 * @returns { array } array of recipe reviews
 */
var OrderReviews = function (_GenerateTreeStructur) {
  _inherits(OrderReviews, _GenerateTreeStructur);

  function OrderReviews() {
    _classCallCheck(this, OrderReviews);

    return _possibleConstructorReturn(this, (OrderReviews.__proto__ || Object.getPrototypeOf(OrderReviews)).apply(this, arguments));
  }

  _createClass(OrderReviews, [{
    key: 'structure',

    /**
     * structure
     * @param { object } reviews
     * @returns { object } class
     */
    value: function structure(reviews) {
      var _this2 = this;

      var rootIndex = _lodash2.default.findIndex(reviews, { parentId: 0 });
      _get(OrderReviews.prototype.__proto__ || Object.getPrototypeOf(OrderReviews.prototype), 'add', this).call(this, reviews[rootIndex]);
      reviews.forEach(function (review) {
        var parentIndex = _lodash2.default.findIndex(reviews, { id: review.parentId });
        if (review.parentId !== 0) {
          _get(OrderReviews.prototype.__proto__ || Object.getPrototypeOf(OrderReviews.prototype), 'add', _this2).call(_this2, review, reviews[parentIndex]);
        }
      });
      return this.root;
    }
  }]);

  return OrderReviews;
}(_GenerateTreeStructure2.default);

exports.default = OrderReviews;