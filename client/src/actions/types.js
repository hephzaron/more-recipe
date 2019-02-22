/**
 * @description sets all immutable types for pure redux function
 */
import mirrorKeys from '../utils/mirrorKeys';

const actions = [
  'ADD_FLASH_MESSAGE',
  'REMOVE_FLASH_MESSAGE',
  'SET_CURRENT_USER',
  'UNSET_CURRENT_USER',
  'SET_RECIPES',
  'ADD_RECIPE',
  'RECIPE_DELETED',
  'RECIPE_FETCHED',
  'RECIPE_EDITED',
  'RECIPE_SEARCHED',
];

export default mirrorKeys(actions);