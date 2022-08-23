const actions = [
    'FETCH_RECIPES_BEGIN',
    'FETCH_RECIPES_SUCCESS',
    'FETCH_RECIPES_FAILURE',
    'SET_CURRENT_PAGE',
    'SET_RECIPES_PAGES',
    'SET_CURRENT_USER',
    'UNSET_CURRENT_USER',
    'SET_CURRENT_USER_FAILURE',
    'SET_FLASH_MESSAGE',
    'UNSET_FLASH_MESSAGE'
];

/**
 * @function mirrorKeys
 * @description This iterates through the array to mirror it into key:value object
 * @param { array } keys
 * @return { object } - An object of key:value pair
 */
const mirrorKeys = (keys) => keys.reduce(
        (obj, val) => {
            obj[val] = val;
            return obj;
        }, {}
    );

export default mirrorKeys(actions);
