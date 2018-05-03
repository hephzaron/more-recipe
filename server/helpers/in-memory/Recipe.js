import { ManageVotes } from '../../middlewares';

/**
 * Recipes in-memory data
 */
class Recipe {
  /**
   * Creates class instance
   * @param { null } void
   * @returns { object } Instance of Users class
   */
  constructor() {
    this.recipes = [];
    this.reviews = [];
    this.voters = [];
    this.recipe = {
      id: 0,
      userId: 0,
      name: 'My recipe',
      description: 'How to make my recipe',
      reviews: [],
      upVotes: 0,
      downVotes: 0,
      totalVotes: 0,
      imageURL: 'my/image/url'
    };
    this.review = {
      id: 0,
      userId: 0,
      recipeId: 0,
      description: 'Review description',
      imageURL: 'my/review/image/url'
    };
    this.lastIndex = 0;
    this.reviewIndex = 0;
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
      upVotes: 0,
      downVotes: 0,
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
      userId,
      description,
      upVotes,
      downVotes,
      reviews,
      imageURL
    } = options;
    return this.findOne({ where: { id } })
      .then((recipeIndex) => {
        const recipeFound = this.recipes[recipeIndex];
        const { shouldVote } = ManageVotes.restrictCreator(recipeFound, userId);

        const {
          upVotesCount,
          downVotesCount,
          userVotes,
          canVote
        } = ManageVotes.validateVotes({
          upCount: recipeFound.upVotes,
          downCount: recipeFound.downVotes,
          recipeId: recipeFound.id,
          userId,
          upVotes,
          downVotes
        }, this.voters);

        if (!canVote && (upVotes || downVotes)) {
          return Promise.reject(new Error('Sorry! You have voted before'));
        }

        if (!shouldVote && (upVotes || downVotes)) {
          return Promise.reject(new Error('The Creator of a recipe is not allowed to vote'));
        }
        this.recipes.splice(
          recipeIndex, 1,
          Object.assign({}, {...recipeFound }, {
            name: name || recipeFound.name,
            description: description || recipeFound.description,
            upVotes: upVotesCount,
            downVotes: downVotesCount,
            totalVotes: upVotesCount - downVotesCount,
            reviews: reviews ? [...recipeFound.reviews, reviews] : recipeFound.reviews,
            imageURL: imageURL || recipeFound.imageURL
          })
        );
        this.voters = userVotes;
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
   * @param { object } order:order of fetch
   * @returns { array } recipes- An array of recipe
   */
  findAll({ order }) {
    if (!this.recipes) {
      return Promise.reject(new Error('No item exists in this section'));
    }
    if (order) {
      if (!Array.isArray(order)) {
        return Promise.reject(new Error('order must be of type array'));
      }
      const sortedArray = this.sortArray(this.recipes, order[0]);
      if (Object.keys(sortedArray) === 'error') {
        return Promise.reject(sortedArray);
      }
      return Promise.resolve(sortedArray);
    }
    return Promise.resolve(this.recipes);
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

  /**
   * Adds review to recipe
   * @method createReview
   * @memberof Reviews Class
   * @param { object } newReview
   * @returns { promise } review
   */
  createReview(newReview) {
    const id = this.reviewIndex + 1;
    this.reviewIndex += 1;
    const indexedReview = {
      ...newReview,
      userId: parseInt(newReview.userId, 10),
      recipeId: parseInt(newReview.recipeId, 10),
      id
    };
    this.review = Object.assign({}, {...this.review }, indexedReview);
    this.reviews.push(this.review);
    if (this.reviews[this.reviews.length - 1] !== this.review) {
      return Promise.reject(new Error('Review could not be created'));
    }
    return this.update({
      id: this.review.recipeId,
      reviews: this.review
    }).then(reviewedRecipe =>
      Promise.resolve(reviewedRecipe)).catch(error =>
      Promise.reject(error));
  }
}

export default Recipe;