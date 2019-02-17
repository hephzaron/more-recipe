import Validator from 'validator';
import { isEmpty } from 'lodash';

/**
 * @class defaultClass
 * @description Validate inputs for create and update book fields
 * @param {object} inputs
 * @return {object} isValid and errors
 */

export default (inputs) => {

  let validText = /^\w*(\s*\w*)*$/i;

  let errors = {};
  const {
    name,
    description,
    photoUrl
  } = inputs;

  if (Validator.isEmpty(name)) {
    errors.title = 'Please specify recipe\'s name';
  }
  if (Validator.isEmpty(description)) {
    errors.description = 'Give a brief description of book here';
  }
  if (Validator.isEmpty(photoUrl)) {
    errors.description = 'Please upload an image file';
  }
  if (!Validator.isEmpty(name) && !validText.test(name)) {
    errors.title = "Please enter a valid recipe name";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};