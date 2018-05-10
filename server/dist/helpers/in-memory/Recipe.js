'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _middlewares = require('../../middlewares');

var _ErrorHandler = require('../ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Recipes in-memory data
 */
var Recipe = function () {
  /**
   * Creates class instance
   * @param { null } void
   * @returns { object } Instance of Users class
   */
  function Recipe() {
    _classCallCheck(this, Recipe);

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


  _createClass(Recipe, [{
    key: 'create',
    value: function create(newRecipe) {
      var id = this.lastIndex + 1;
      var indexedRecipe = _extends({}, newRecipe, {
        userId: parseInt(newRecipe.userId, 10),
        upVotes: 0,
        downVotes: 0,
        id: id
      });
      this.recipe = Object.assign({}, _extends({}, this.recipe), indexedRecipe);
      this.recipes.push(this.recipe);
      if (this.recipes[this.recipes.length - 1] !== this.recipe) {
        return Promise.reject(_ErrorHandler2.default.handleErrors({
          message: 'An error occured in adding new recipe'
        }));
      }
      this.lastIndex += 1;
      return Promise.resolve(this.recipe);
    }

    /**
     * Modifies a recipe
     * @param {object} options
     * @returns { promise } recipe - modified recipe
     */

  }, {
    key: 'update',
    value: function update(options) {
      var _this = this;

      var id = options.id,
          name = options.name,
          userId = options.userId,
          description = options.description,
          upVotes = options.upVotes,
          downVotes = options.downVotes,
          reviews = options.reviews,
          imageURL = options.imageURL;

      return this.findOne({ where: { id: id } }).then(function (recipeIndex) {
        var recipeFound = _this.recipes[recipeIndex];

        var _ManageVotes$restrict = _middlewares.ManageVotes.restrictCreator(recipeFound, userId),
            shouldVote = _ManageVotes$restrict.shouldVote;

        var _ManageVotes$validate = _middlewares.ManageVotes.validateVotes({
          upCount: recipeFound.upVotes,
          downCount: recipeFound.downVotes,
          recipeId: recipeFound.id,
          userId: userId,
          upVotes: upVotes,
          downVotes: downVotes
        }, _this.voters),
            upVotesCount = _ManageVotes$validate.upVotesCount,
            downVotesCount = _ManageVotes$validate.downVotesCount,
            userVotes = _ManageVotes$validate.userVotes,
            canVote = _ManageVotes$validate.canVote;

        if (!canVote && (upVotes || downVotes)) {
          return Promise.reject(_ErrorHandler2.default.handleErrors({
            name: 'Conflict',
            message: 'Sorry! You have voted before'
          }));
        }

        if (!shouldVote && (upVotes || downVotes)) {
          return Promise.reject(_ErrorHandler2.default.handleErrors({
            name: 'Forbidden',
            message: 'The Creator of a recipe is not allowed to vote'
          }));
        }
        _this.recipes.splice(recipeIndex, 1, Object.assign({}, _extends({}, recipeFound), {
          name: name || recipeFound.name,
          description: description || recipeFound.description,
          upVotes: upVotesCount,
          downVotes: downVotesCount,
          totalVotes: upVotesCount - downVotesCount,
          reviews: reviews ? [].concat(_toConsumableArray(recipeFound.reviews), [reviews]) : recipeFound.reviews,
          imageURL: imageURL || recipeFound.imageURL
        }));
        _this.voters = userVotes;
        return Promise.resolve(_this.recipes[recipeIndex]);
      }).catch(function (error) {
        return Promise.reject(error);
      });
    }

    /**
     * Finds a recipe
     * @param { object } where
     * @returns { promise } recipeIndex
     */

  }, {
    key: 'findOne',
    value: function findOne(_ref) {
      var where = _ref.where;
      var id = where.id;

      var recipeIndex = this.recipes.findIndex(function (item) {
        return item.id === parseInt(id, 10);
      });
      if (recipeIndex === -1) {
        return Promise.reject(_ErrorHandler2.default.handleErrors({
          name: 'Not Found',
          message: 'Recipe does not exist'
        }));
      }
      return Promise.resolve(recipeIndex);
    }

    /**
     * Delete recipe
     * @param { number } id
     * @returns { promise } resolve or reject object
     */

  }, {
    key: 'delete',
    value: function _delete(id) {
      var _this2 = this;

      return this.findOne({ where: { id: id } }).then(function (recipeIndex) {
        var deletedRecipe = _this2.recipes.splice(recipeIndex, 1);
        return Promise.resolve(deletedRecipe[0]);
      }).catch(function (error) {
        return Promise.reject(error);
      });
    }

    /**
     * Get all recipe
     * @param { object } order:order of fetch
     * @returns { array } recipes- An array of recipe
     */

  }, {
    key: 'findAll',
    value: function findAll(_ref2) {
      var opts = _ref2.opts;

      if (!this.recipes) {
        return Promise.reject(_ErrorHandler2.default.handleErrors({
          name: 'Not Found',
          message: 'No item exists in this section'
        }));
      }
      if (opts) {
        var sortedArray = Recipe.sortArray(this.recipes, opts);
        if (!Array.isArray(opts)) {
          return Promise.reject(_ErrorHandler2.default.handleErrors({
            name: 'Invalid Request',
            message: 'options must be of type array'
          }));
        }
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

  }, {
    key: 'createReview',


    /**
     * Adds review to recipe
     * @method createReview
     * @memberof Reviews Class
     * @param { object } newReview
     * @returns { promise } review
     */
    value: function createReview(newReview) {
      if (this.recipes.length === 0 || !this.recipes[parseInt(newReview.recipeId, 10) - 1] || !this.recipes) {
        return Promise.reject(_ErrorHandler2.default.handleErrors({
          name: 'Not Found',
          message: 'No recipe to review yet'
        }));
      }
      var id = this.recipes[parseInt(newReview.recipeId, 10) - 1].reviews.length + 1;
      this.reviewIndex += 1;
      var indexedReview = _extends({}, newReview, {
        userId: parseInt(newReview.userId, 10),
        recipeId: parseInt(newReview.recipeId, 10),
        id: id
      });
      this.review = Object.assign({}, _extends({}, this.review), indexedReview);
      this.reviews.push(this.review);
      if (this.reviews[this.reviews.length - 1] !== this.review) {
        return Promise.reject(_ErrorHandler2.default.handleErrors({
          message: 'Review could not be created'
        }));
      }
      return this.update({
        id: this.review.recipeId,
        reviews: this.review
      }).then(function (reviewedRecipe) {
        return Promise.resolve(reviewedRecipe);
      }).catch(function (error) {
        return Promise.reject(error);
      });
    }
  }], [{
    key: 'sortArray',
    value: function sortArray(array, options) {
      var sortBy = options[0];

      /**
       * Check ascending options
       * @param { string } option -sort order
       * @returns { boolean } order
       */
      function cbASC(option) {
        return (/^(ASC)$/i.test(option.trim())
        );
      }

      /**
       * Check descending options
       * @param { string } option -sort order
       * @returns { boolean } order
       */
      function cbDESC(option) {
        return (/^(DESC||DES)$/i.test(option.trim())
        );
      }
      if (options.some(cbASC) && !options.some(cbDESC)) {
        return array.sort(function (prev, next) {
          var dataType = _typeof(prev[sortBy]);
          if (dataType === 'string') {
            return prev[sortBy].localeCompare(next[sortBy]);
          } else if (dataType === 'number') {
            return prev[sortBy] - next[sortBy];
          }
          return true;
        });
      } else if (!options.some(cbASC) && options.some(cbDESC)) {
        return array.sort(function (prev, next) {
          var dataType = _typeof(prev[sortBy]);
          if (dataType === 'string') {
            return next[sortBy].localeCompare(prev[sortBy]);
          } else if (dataType === 'number') {
            return next[sortBy] - prev[sortBy];
          }
          return true;
        });
      }
      return _ErrorHandler2.default.handleErrors({
        name: 'Invalid Request',
        message: 'Invalid sorting options specified'
      });
    }
  }]);

  return Recipe;
}();

exports.default = Recipe;