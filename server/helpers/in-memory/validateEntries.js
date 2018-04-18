import { isEmpty } from 'lodash';

export default (data, dataType) => {
  let typeError = {};
  switch (dataType) {
    case 'string':
      if (typeof(data) !== 'string') {
        typeError.string = new Error('Invalid entry, value should be a string');
      }
      break;
    case 'number':
      if (typeof(data) !== 'number') {
        typeError.number = new Error('Invalid entry, value should be a number');
      }
      break;
    case 'object':
      if (typeof(data) !== 'object') {
        typeError.object = new Error('Invalid entry, value should be an object');
      }
      break;
    default:
      typeError = {};
  }
  return {
    isValid: isEmpty(typeError),
    typeError
  };
};