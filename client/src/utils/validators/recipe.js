import { isEmpty } from 'lodash';

/**
 * @description Function to validate recipe form entries
 * @param { object } recipe - recipe payload
 * @returns { object } validationErrors - An object containing form validation errors
 * @returns { bool } isValid - status of form validation errors
 */
export const validateRecipeForm = (recipe) => {
    let validationErrors = { };
    const alphaRe = /^(\w(\s{1})?)*$/;
    const imageType = /\.(jpg|png|jpeg)$/i;

    const {
        name,
        photoUrl
    } = recipe;

    for (let i = 0; i < Object.entries(recipe).length; i++) {
        let key = Object.entries(recipe)[i][0];
        if (isEmpty(recipe[key])) {
            validationErrors[key] = `${key} is required`;
        }
    }
    if (!isEmpty(name) && !alphaRe.test(name)) {
        validationErrors.name = 'Enter a valid name, words only';
    }
    if (isEmpty(photoUrl.name)) {
        validationErrors.photoUrl = 'Please upload an image file';
    }
    if (!isEmpty(photoUrl.name) && photoUrl.size <= 0) {
        validationErrors.photoUrl = 'Upload a valid image file';
    }
    if (!isEmpty(photoUrl.name) && photoUrl.size > 0) {
        if (!imageType.test(photoUrl.name)) {
            validationErrors.photoUrl = 'Image file can only be of type JPEG, JPG and PNG';
        }
        if ((photoUrl.size / 1024).toFixed(0) > 300) {
            validationErrors.photoUrl = 'Image size cannot be greater than 300kb';
        }
    }


    return { validationErrors, isValid: isEmpty(validationErrors) };
};

export default { validateRecipeForm };
