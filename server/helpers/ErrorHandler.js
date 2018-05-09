/**
 * @class ErrorHandler
 * @extends Error
 */
class ErrorHandler extends Error {
  /**
   * @method handleErrors
   * @memberof ErrorHandler
   * @param { object } options -name and message of error
   * @return { object } error
   */
  static handleErrors(options) {
    const error = {};
    if (!options || !options.name) {
      error.name = 'Server Error';
      error.statusCode = 500;
      error.message = 'Internal Server Error';
      return error;
    }
    const { name, message } = options;
    error.message = message;
    error.name = name;
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
        error.name = 'Server Error';
        error.statusCode = 500;
        error.message = 'Internal Server Error';
    }
    return error;
  }
}

export default ErrorHandler;