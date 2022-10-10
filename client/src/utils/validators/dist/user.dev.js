"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.validateUserForm = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @description Function to validate user form entries
 * @param { object } user - user payload
 * @param { string } type - type of validation
 * @returns { object } validationErrors - An object containing form validation errors
 * @returns { bool } isValid - status of form validation errors
 */
var validateUserForm = function validateUserForm(user) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var validationErrors = {};
  var alphaNumRe = /^\w{6,}$/;
  var passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  var username = user.username,
      email = user.email,
      age = user.age,
      password = user.password,
      confirmPassword = user.confirmPassword;

  for (var i = 0; i < Object.entries(user).length; i++) {
    var key = Object.entries(user)[i][0];

    if ((0, _lodash.isEmpty)(user[key])) {
      if (key === 'confirmPassword') {
        validationErrors[key] = 'Please re-enter your password';
      } else {
        validationErrors[key] = "Your ".concat(key, " is required");
      }
    }
  }

  if (!type) {
    if (!(0, _lodash.isEmpty)(username) && !alphaNumRe.test(username)) {
      validationErrors.username = 'Only letters and numbers are allowed and not less than 6 characters';
    }

    if (!_validator["default"].isEmail(email)) {
      validationErrors.email = 'A valid email address is required';
    }

    if (!(0, _lodash.isInteger)(age) && age <= 12) {
      validationErrors.age = 'A valid age is required';
    }

    if (!(0, _lodash.isEmpty)(password) && !passwordRe.test(password)) {
      validationErrors.password = 'Password must contain at least one number,one lowercase and uppercase and minimum of 8 digit';
    }

    if (password === username) {
      validationErrors.password = 'Password should be diffrent from username';
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Password must be the same';
    }
  }

  if (type === 'changePassword') {
    if (user.oldPassword === user.newPassword) {
      validationErrors.newPassword = 'A different password is required';
    }

    if (user.newPassword !== user.confirmPassword) {
      validationErrors.confirmPassword = 'Password must be the same';
    }

    if (!(0, _lodash.isEmpty)(user.newPassword) && !passwordRe.test(user.newPassword)) {
      validationErrors.newPassword = 'Password must contain at least one number, one lowercase and uppercase and minimum of 8 digit';
    }
  }

  if (type === 'update') {
    delete validationErrors.password;
    delete validationErrors.confirmPassword;
    delete validationErrors.email;
  }

  return {
    validationErrors: validationErrors,
    isValid: (0, _lodash.isEmpty)(validationErrors)
  };
};

exports.validateUserForm = validateUserForm;
var _default = {
  validateUserForm: validateUserForm
};
exports["default"] = _default;