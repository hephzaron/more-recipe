import validator from 'validator';
import { isEmpty, isInteger } from 'lodash';

/**
 * @description Function to validate user form entries
 * @param { object } user - user payload
 * @param { string } type - type of validation
 * @returns { object } validationErrors - An object containing form validation errors
 * @returns { bool } isValid - status of form validation errors
 */
export const validateUserForm = (user, type = '') => {
    let validationErrors = { };
    const alphaNumRe = /^\w{6,}$/;
    const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const {
        username,
        email,
        age,
        password,
        confirmPassword
    } = user;

    for (let i = 0; i < Object.entries(user).length; i++) {
        let key = Object.entries(user)[i][0];
        if (isEmpty(user[key])) {
            if (key === 'confirmPassword') {
                validationErrors[key] = 'Please re-enter your password';
            } else {
                validationErrors[key] = `Your ${key} is required`;
            }
        }
    }
    if (!type) {
        if (!isEmpty(username) && !alphaNumRe.test(username)) {
            validationErrors.username = 'Only letters and numbers are allowed and not less than 6 characters';
        }
        if (!validator.isEmail(email)) {
            validationErrors.email = 'A valid email address is required';
        }
        if (!isInteger(age) && age <= 12) {
            validationErrors.age = 'A valid age is required';
        }
        if (!isEmpty(password) && !passwordRe.test(password)) {
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
        if (!isEmpty(user.newPassword) && !passwordRe.test(user.newPassword)) {
            validationErrors.newPassword = 'Password must contain at least one number, one lowercase and uppercase and minimum of 8 digit';
        }
    }
    return { validationErrors, isValid: isEmpty(validationErrors) };
};

export default { validateUserForm };
