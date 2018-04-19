import 'babel-polyfill';
import validateEntries from './validateEntries';
import { recipe } from '../dummyData/index';

/**
 * Recipes in-memory data
 */
class Recipes {
  /**
   * Creates class instance
   * @param { null } void
   * @returns { object } Instance of Users class
   */
  constructor() {
    this.recipes = [];
    this.recipe = {
      id: 0,
      userId: 0,
      name: 'My recipe',
      description: 'How to make my recipe',
      reviews: [],
      ingredients: [],
      upVotes: 0,
      downVotes: 0,
      imageURL: 'my/image/url'
    };
    this.lastIndex = 0;
    this.errors = {};
  }

  /**
   * Adds recipe to array
   * @param { object } newRecipe
   * @returns { promise } createdRecipe
   */
  create(newRecipe) {
    const id = this.lastIndex + 1;
    const indexedRecipe = {
      ...newRecipe,
      userId: parseInt(newRecipe.userId, 10),
      id
    };
    this.recipe = Object.assign({}, {...this.recipe }, indexedRecipe);
    this.recipes.push(this.recipe);
    if (this.recipes[this.recipes.length - 1] !== this.recipe) {
      return Promise.reject(new Error('An error occured in adding new recipe'));
    }
    this.lastIndex += 1;
    return Promise.resolve(this.recipe);
  }

  /**
   * Modifies a recipe
   * @param {object} options
   * @returns { promise } recipe - modified recipe
   */
  update(options) {
    const {
      id,
      name,
      description,
      upVotes,
      downVotes,
      reviews,
      imageURL
    } = options;
    return this.findOne({ where: { id } })
      .then((recipeIndex) => {
        this.recipes.splice(
          recipeIndex, 1,
          Object.assign({}, {...this.recipes[recipeIndex] }, {
            name: name || this.recipes[recipeIndex].name,
            description: description || this.recipes[recipeIndex].description,
            upVotes: upVotes || this.recipes[recipeIndex].upVotes,
            downVotes: downVotes || this.recipes[recipeIndex].downVotes,
            reviews: reviews || this.recipes[recipeIndex].reviews,
            imageURL: imageURL || this.recipes[recipeIndex].imageURL
          })
        );
        return Promise.resolve(this.recipes[recipeIndex]);
      })
      .catch(error => Promise.reject(error));
  }

  /**
   * Finds a recipe
   * @param { object } where
   * @returns { promise } recipeIndex
   */
  findOne({ where }) {
    const { id } = where;
    const recipeIndex = this.recipes.findIndex(item => item.id === parseInt(id, 10));
    if (recipeIndex === -1) {
      return Promise.reject(new Error('Recipe does not exist'));
    }
    return Promise.resolve(recipeIndex);
  }

  /**
   * Delete recipe
   * @param { number } id
   * @returns { promise } resolve or reject object
   */
  delete(id) {
    return this.findOne({ where: { id } })
      .then((recipeIndex) => {
        const deletedRecipe = this.recipes.splice(recipeIndex, 1);
        return Promise.resolve(deletedRecipe[0]);
      })
      .catch(error => Promise.reject(error));
  }

  /**
   * Get all recipe
   * @param { object } options
   * @returns { array } recipes- An array of recipe
   */
  findAll(options = {}) {
    const {
      where: {
        id
      },
      order
    } = options;
    const { isValid, typeError } = validateEntries(id, 'number');
    if (!isValid) {
      return Promise.reject(typeError.number);
    }
    if (!Array.isArray(order)) {
      return Promise.reject(new Error('order must be of type array'));
    }
    if (!this.recipes) {
      return Promise.reject(new Error('No item exists in this section'));
    }
    const sortedArray = this.sortArray(this.recipes, order[0]);
    if (Object.keys(sortedArray) === 'error') {
      Promise.reject(sortedArray);
    }
    Promise.resolve(sortedArray);
  }

  /**
   * Sort Array in ascending or descending order
   * @param {array} array
   * @param {array} options
   * @returns { array } sortedArray
   */
  static sortArray(array, options) {
    const sortBy = options[0];

    /**
     * Check ascending options
     * @param { string } option -sort order
     * @returns { boolean } order
     */
    function cbASC(option) {
      return option === 'ASC';
    }

    /**
     * Check descending options
     * @param { string } option -sort order
     * @returns { boolean } order
     */
    function cbDESC(option) {
      return option === 'DESC';
    }
    if (options.some(cbASC) && !options.some(cbDESC)) {
      return array
        .sort((prev, next) =>
          prev[sortBy].localeCompare(next[sortBy]));
    } else if (!options.some(cbASC) && options.some(cbDESC)) {
      return array
        .sort((prev, next) =>
          next[sortBy].localeCompare(prev[sortBy]));
    }
    return new Error('Invalid sort type specified');
  }
}

export default Recipes;