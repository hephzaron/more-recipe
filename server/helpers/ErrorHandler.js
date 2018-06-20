/**
 * @class ErrorHandler
 * @extends Error
 */
class ErrorHandler extends Error {
  /**
   * @method handleErrors
   * @description Handles sequelize related errors
   * @memberof ErrorHandler
   * @param { object } options -name and message of error
   * @return { object } error
   */
  static handleErrors(options) {
    console.log(options);
    const error = {};
    try {
      if (options || options.name) {
        const { name, message } = options;
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
}

export default ErrorHandler;