import Validator from 'validator';
import { isEmpty } from 'lodash';


/**
 * @function defaultFunction
 * @description Validate file type and size
 * @param {object} image
 * @param{string} type
 * @return {object} isValid and errors
 */
export default (image) => {
  let errors = {};
  let re = /\.(jpg|png|jpeg)$/i;
  let len = /^\w{1,10}\.(jpg|png|jpeg)$/i;
  if (Validator.isEmpty(image.name)) {
    errors.image = 'Please choose a file';
  } else if (!Validator.isEmpty(image.name) && image.size <= 0) {
    errors.image = 'Image file invalid, please choose a valid file';
  }
  if (!Validator.isEmpty(image.name) && image.size > 0) {
    if (!re.test(image.name)) {
      errors.image = 'Image file can only be of type JPG, JPEG and PNG';
    } else if ((image.size / 1024).toFixed(0) > 300) {
      errors.image = 'Image size cannot be greater than 300kb';
    } else if (!len.test(image.name)) {
      errors.image = "Image name must be alphanumeric and can contain underscore not more than 10 characters";
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};