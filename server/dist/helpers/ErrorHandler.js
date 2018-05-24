'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class ErrorHandler
 * @extends Error
 */
var ErrorHandler = function (_Error) {
  _inherits(ErrorHandler, _Error);

  function ErrorHandler() {
    _classCallCheck(this, ErrorHandler);

    return _possibleConstructorReturn(this, (ErrorHandler.__proto__ || Object.getPrototypeOf(ErrorHandler)).apply(this, arguments));
  }

  _createClass(ErrorHandler, null, [{
    key: 'handleErrors',

    /**
     * @method handleErrors
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

          if (/^(Sequelize)/i.test(name)) {
            error.statusCode = 400;
            error.name = 'Bad Request';
            error.message = message;
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
      /**
       * switch (name) {
        case 'Bad Request':
          error.statusCode = 400;
          break;
        case 'Unauthorized':
          error.statusCode = 401;
          break;
        case 'Forbidden':
          error.statusCode = 403;
          break;
        case 'Not Found':
          error.statusCode = 404;
          break;
        case 'Conflict':
          error.statusCode = 409;
          break;
        default:
          error.name = 'Server Error';
          error.statusCode = 500;
          error.message = 'Internal Server Error';
      }* */
      return error;
    }
  }]);

  return ErrorHandler;
}(Error);

exports.default = ErrorHandler;