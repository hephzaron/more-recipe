import validator from 'validator';
import { isEmpty, isInteger } from 'lodash';

/**
 * @description Function to validate user form entries
 * @param { string } field - form field to be validated
 * @param { object } user - user payload
 * @returns { object } validationErrors - An object containing form validation errors
 * @returns { bool } isValid - status of form validation errors
 */
export const userValidator = (field, user) => {
    let validationErrors = {};
    const alphaNumRe = /^\w+$/;
    const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const {
        username,
        email,
        firstName,
        lastName,
        age,
        password,
        confirmPassword
    } = user;

    switch (field) {
        case 'username':
            if (isEmpty(username)) {
                validationErrors.username = 'A username is required';
            } else if (!alphaNumRe.test(username)) {
                validationErrors.username = 'Only letters and numbers are allowed';
            }
            break;
        case 'email':
            if (isEmpty(email) && !validator.isEmail(email)) {
                validationErrors.email = 'A valid email address is required';
            }
            break;
        case ('firstName'):
            if (isEmpty(firstName)) {
                validationErrors.firstName = 'Firstname is required';
            }
            break;
        case ('lastName'):
            if (isEmpty(lastName)) {
                validationErrors.lastName = 'Lastname is required';
            }
            break;
        case ('age'):
            if (isEmpty(age) && !isInteger(age) && age <= 12) {
                validationErrors.age = 'A valid age is required';
            }
            break;
        case ('password'):
            if (isEmpty(password) && !passwordRe.test(password)) {
                validationErrors.password = 'Password must contain at least one number,one lowercase and uppercase and minimum of 8 digit';
            }
            if (password === username) {
                validationErrors.password = 'Password should be diffrent from username';
            }
            break;
        case ('confirmPassword'):
            if (isEmpty(confirmPassword)) {
                validationErrors.confirmPassword = 'Retype your password here:';
            }
            if (password === confirmPassword) {
                validationErrors.confirmPassword = 'Password must be the same';
            }
            break;
        default:
            break;
    }

    return { validationErrors, isValid: isEmpty(validationErrors) };
};

export default { userValidator };
