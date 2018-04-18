import validateEntries from './validateEntries';

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
      upVotes: 0,
      downVotes: 0,
      imageURL: 'my/image/url'
    };
    this.errors = {};
    this.update = this.update.bind(this);
  }

  /**
   * Adds recipe to array
   * @param { object } newRecipe
   * @returns { promise } createdRecipe
   */
  static create(newRecipe) {
    if (typeof(newRecipe.name) !== 'string') {
      return Promise.reject(new Error('Entry not of type string'));
    }

    const { isValid, typeError } = validateEntries(newRecipe.description, 'string');
    if (!isValid) {
      return Promise.reject(typeError.string);
    }

    const genObj = this.generateIndex(this.recipes);
    const nextIndex = genObj.next();
    const id = nextIndex;
    this.recipe = {
      ...newRecipe,
      id
    };
    this.recipes.push(this.recipe);
    if (this.recipes[this.recipes.length - 1] !== this.recipe) {
      return Promise.reject(new Error('An error occured in adding new recipe'));
    }
    return Promise.resolve(this.recipe);
  }

  /**
   * Modifies a recipe
   * @param {object} recipe
   * @returns { promise } recipe - modified recipe
   */
  static update(recipe) {
    if (typeof(recipe) !== 'object') {
      return Promise.reject(new Error('Entry not of object type'));
    }
    const { isValid, typeError } = validateEntries(recipe.id, 'number');
    if (!isValid) {
      return Promise.reject(typeError.number);
    }
    this.findOne({
      where: {
        id: recipe.id
      }
    }).then(() => {
      this.recipes.map((item, index) => {
        if (item.id === recipe.id) {
          this.recipes.splice(index, 1, {
            ...item,
            ...recipe
          });
        }
        return this.recipes;
      });
      return Promise.resolve(this.findOne(recipe.id));
    }).catch((error) => {
      this.errors.findError = error.message;
      return Promise.reject(error);
    });
  }

  /**
   * Finds a recipe
   * @param { object } options
   * @returns { promise } recipe
   */
  static findOne(options) {
    const where = options.where || {};
    const { id } = where;
    const recipe = this.recipes.filter(item => item.id === id);
    if (!recipe) {
      return Promise.reject(new Error('Recipe does not exist'));
    }
    return Promise.resolve(recipe);
  }

  /**
   * Generate index
   * @param { object } arr
   * @returns {object} Iterator object
   */
  static * generateIndex(arr) {
    let index = 0;
    while (arr.length) {
      yield index += 1;
    }
  }

  /**
   * Delete recipe
   * @param { number } id
   * @returns { promise } resolve or reject object
   */
  static delete(id) {
    const { isValid, typeError } = validateEntries(id, 'number');
    if (!isValid) {
      return Promise.reject(typeError.number);
    }
    this.findOne({ where: { id } })
      .then((recipe) => {
        delete this.recipes[recipe.id - 1];
        return Promise.resolve(this.recipes);
      }).catch(error => Promise.reject(error));
  }

  /**
   * Get all recipe
   * @param { object } options
   * @returns { array } recipes- An array of recipe
   */
  static findAll(options = {}) {
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