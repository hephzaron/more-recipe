/**
 * @class ErrorHandler
 * @extends Error
 */
class ErrorHandler extends Error {
  /**
   * @method handleErrors
   * @memberof ErrorHandler
   * @param { object } options
   * @return { object } error
   */
  static handleErrors(options) {
    const error = {};
    const { name, message } = options;
    error.name = name;
    error.message = message;
    switch (name) {
      case 'Invalid Request':
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
        error.statusCode = 500;
        error.message = 'Internal Server Error';
    }
    return error;
  }
}

export default ErrorHandler;