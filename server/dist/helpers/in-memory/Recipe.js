'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _middlewares = require('../../middlewares');

var _ErrorHandler = require('../ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _classCallCheck3.default)(this, Recipe);

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


  (0, _createClass3.default)(Recipe, [{
    key: 'create',
    value: function create(newRecipe) {
      var id = this.lastIndex + 1;
      var indexedRecipe = (0, _extends3.default)({}, newRecipe, {
        userId: parseInt(newRecipe.userId, 10),
        upVotes: 0,
        downVotes: 0,
        id: id
      });
      this.recipe = (0, _assign2.default)({}, (0, _extends3.default)({}, this.recipe), indexedRecipe);
      this.recipes.push(this.recipe);
      if (this.recipes[this.recipes.length - 1] !== this.recipe) {
        return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
          message: 'An error occured in adding new recipe'
        }));
      }
      this.lastIndex += 1;
      return _promise2.default.resolve(this.recipe);
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
          return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
            name: 'Conflict',
            message: 'Sorry! You have voted before'
          }));
        }

        if (!shouldVote && (upVotes || downVotes)) {
          return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
            name: 'Forbidden',
            message: 'The Creator of a recipe is not allowed to vote'
          }));
        }
        _this.recipes.splice(recipeIndex, 1, (0, _assign2.default)({}, (0, _extends3.default)({}, recipeFound), {
          name: name || recipeFound.name,
          description: description || recipeFound.description,
          upVotes: upVotesCount,
          downVotes: downVotesCount,
          totalVotes: upVotesCount - downVotesCount,
          reviews: reviews ? [].concat((0, _toConsumableArray3.default)(recipeFound.reviews), [reviews]) : recipeFound.reviews,
          imageURL: imageURL || recipeFound.imageURL
        }));
        _this.voters = userVotes;
        return _promise2.default.resolve(_this.recipes[recipeIndex]);
      }).catch(function (error) {
        return _promise2.default.reject(error);
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
        return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
          name: 'Not Found',
          message: 'Recipe does not exist'
        }));
      }
      return _promise2.default.resolve(recipeIndex);
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
        return _promise2.default.resolve(deletedRecipe[0]);
      }).catch(function (error) {
        return _promise2.default.reject(error);
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
        return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
          name: 'Not Found',
          message: 'No item exists in this section'
        }));
      }
      if (opts) {
        var sortedArray = Recipe.sortArray(this.recipes, opts);
        if (!Array.isArray(opts)) {
          return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
            name: 'Invalid Request',
            message: 'options must be of type array'
          }));
        }
        if ((0, _keys2.default)(sortedArray) === 'error') {
          return _promise2.default.reject(sortedArray);
        }
        return _promise2.default.resolve(sortedArray);
      }
      return _promise2.default.resolve(this.recipes);
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
        return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
          name: 'Not Found',
          message: 'No recipe to review yet'
        }));
      }
      var id = this.recipes[parseInt(newReview.recipeId, 10) - 1].reviews.length + 1;
      this.reviewIndex += 1;
      var indexedReview = (0, _extends3.default)({}, newReview, {
        userId: parseInt(newReview.userId, 10),
        recipeId: parseInt(newReview.recipeId, 10),
        id: id
      });
      this.review = (0, _assign2.default)({}, (0, _extends3.default)({}, this.review), indexedReview);
      this.reviews.push(this.review);
      if (this.reviews[this.reviews.length - 1] !== this.review) {
        return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
          message: 'Review could not be created'
        }));
      }
      return this.update({
        id: this.review.recipeId,
        reviews: this.review
      }).then(function (reviewedRecipe) {
        return _promise2.default.resolve(reviewedRecipe);
      }).catch(function (error) {
        return _promise2.default.reject(error);
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
          var dataType = (0, _typeof3.default)(prev[sortBy]);
          if (dataType === 'string') {
            return prev[sortBy].localeCompare(next[sortBy]);
          } else if (dataType === 'number') {
            return prev[sortBy] - next[sortBy];
          }
          return true;
        });
      } else if (!options.some(cbASC) && options.some(cbDESC)) {
        return array.sort(function (prev, next) {
          var dataType = (0, _typeof3.default)(prev[sortBy]);
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