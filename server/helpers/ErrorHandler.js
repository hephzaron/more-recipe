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
    console.log(options.name);
    const error = {};
    try {
      if (options || options.name) {
        const { name, message } = options;
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
}

export default ErrorHandler;