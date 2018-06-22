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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class ErrorHandler
 * @extends Error
 */
var ErrorHandler = function (_Error) {
  (0, _inherits3.default)(ErrorHandler, _Error);

  function ErrorHandler() {
    (0, _classCallCheck3.default)(this, ErrorHandler);
    return (0, _possibleConstructorReturn3.default)(this, (ErrorHandler.__proto__ || (0, _getPrototypeOf2.default)(ErrorHandler)).apply(this, arguments));
  }

  (0, _createClass3.default)(ErrorHandler, null, [{
    key: 'handleErrors',

    /**
     * @method handleErrors
     * @description Handles sequelize related errors
     * @memberof ErrorHandler
     * @param { object } options -name and message of error
     * @return { object } error
     */
    value: function handleErrors(options) {
      var error = {};
      try {
        if (options || options.name) {
          var name = options.name,
              message = options.message;

          if (/^(SequelizeValidation)/i.test(name)) {
            error.statusCode = 400;
            error.name = 'Bad Request';
            error.message = message;
            if (message.endsWith('belongs to a user')) {
              error.statusCode = 409;
              error.name = 'Conflict';
              error.message = message;
            }
          } else {
            error.statusCode = 500;
            error.message = 'Internal Server Error';
            error.name = 'Server Error';
          }
        }
      } catch (e) {
        error.statusCode = 500;
        error.message = 'Internal Server Error';
        error.name = 'Server Error';
      }
      return error;
    }
  }]);
  return ErrorHandler;
}(Error);

exports.default = ErrorHandler;