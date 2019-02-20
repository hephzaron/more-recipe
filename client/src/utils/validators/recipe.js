import Validator from 'validator';
import { isEmpty } from 'lodash';

/**
 * @class defaultClass
 * @description Validate inputs for create and update recipe
 * @param {object} inputs
 * @return {object} isValid and errors
 */

export default (inputs) => {
  let validText = /^\w*(\s*\w*)*$/i;

  let errors = {};
  const {
    name,
    searchText,
    description,
    photoUrl
  } = inputs;

  if (Validator.isEmpty(name)) {
    errors.name = 'Please specify recipe\'s name';
  }
  if (Validator.isEmpty(searchText)) {
    errors.searchText = 'Please specify keyword';
  }
  if (Validator.isEmpty(description)) {
    errors.description = 'Give a brief description of recipe here';
  }
  if (Validator.isEmpty(photoUrl)) {
    errors.description = 'Please upload an image file';
  }
  if (!Validator.isEmpty(name) && !validText.test(name)) {
    errors.name = "Please enter a valid recipe name";
  }
  if (!Validator.isEmpty(searchText) && !validText.test(searchText)) {
    errors.searchText = "Please enter a valid recipe name";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};