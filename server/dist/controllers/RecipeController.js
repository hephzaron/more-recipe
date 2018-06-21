'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _ErrorHandler = require('../helpers/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _middlewares = require('../middlewares');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recipe = _models2.default.Recipe,
    Review = _models2.default.Review,
    RecipeVote = _models2.default.RecipeVote;
var restrictCreator = _middlewares.ManageVotes.restrictCreator;
var handleErrors = _ErrorHandler2.default.handleErrors;
/**
 * Handles Recipe request operations
 * @class RecipeController
 * @param { null } void
 */

var RecipeController = function () {
  function RecipeController() {
    (0, _classCallCheck3.default)(this, RecipeController);
  }

  (0, _createClass3.default)(RecipeController, null, [{
    key: 'addRecipe',

    /**
     * Adds a new recipe
     * @memberof RecipeController
     * @param { object } req -request
     * @param { object } res -respone
     * @returns { obejct } server response
     */
    value: function addRecipe(req, res) {
      var name = req.body.name;

      return Recipe.findOne({
        where: {
          name: name
        }
      }).then(function (recipe) {
        if (recipe) {
          return res.status(409).send({
            message: 'A recipe with the same name already exist, you can add a review to existing recipe '
          });
        }
        return Recipe.create(req.body, {
          fields: ['userId', 'name', 'description', 'photoUrl'],
          returning: true
        }).then(function (newRecipe) {
          return Review.create({
            parentId: 0,
            recipeId: parseInt(newRecipe.id, 10),
            userId: parseInt(newRecipe.userId, 10),
            description: newRecipe.description
          }).then(function () {
            return res.status(201).send({
              recipe: newRecipe,
              message: newRecipe.name + ' added successfully'
            });
          }).catch(function (error) {
            var e = handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
        }).catch(function (error) {
          var e = handleErrors(error);
          return res.status(e.statusCode).send({
            message: e.message
          });
        });
      }).catch(function (error) {
        var e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }

    /**
     * Edit a Recipe
     * @param {object} req
     * @param {object} res
     * @param { function } next
     * @returns { promise } response
     */

  }, {
    key: 'editRecipe',
    value: function editRecipe(req, res, next) {
      var _this = this;

      var _req$params = req.params,
          recipeId = _req$params.recipeId,
          userId = _req$params.userId;
      var _req$body = req.body,
          upVotes = _req$body.upVotes,
          downVotes = _req$body.downVotes,
          likes = _req$body.likes,
          dislikes = _req$body.dislikes;

      return Recipe.findById(recipeId).then(function (recipe) {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe does not exist'
          });
        }
        if (recipe.userId !== parseInt(userId, 10) && !(upVotes || downVotes || likes || dislikes)) {
          return res.status(403).send({
            message: 'You are not allowed to modify this recipe. Please add a review instead'
          });
        }

        var _restrictCreator = restrictCreator(recipe, userId),
            shouldVote = _restrictCreator.shouldVote;

        if (!shouldVote && (upVotes || downVotes)) {
          return res.status(403).send({
            message: 'You are not allowed to vote your own recipe'
          });
        }
        if (upVotes || downVotes || likes || dislikes) {
          return next();
        }
        return recipe.update(req.body, {
          fields: ['name', 'description', 'photoUrl', 'favorites'],
          returning: true
        }).then(function () {
          var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(updatedRecipe) {
            var description, imageUrl, id;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    description = updatedRecipe.description, imageUrl = updatedRecipe.imageUrl, id = updatedRecipe.id;
                    _context.next = 3;
                    return Review.update({
                      description: description,
                      imageUrl: imageUrl
                    }, {
                      returning: true,
                      where: {
                        recipeId: id,
                        parentId: 0
                      }
                    });

                  case 3:
                    return _context.abrupt('return', res.status(200).send({
                      updatedRecipe: updatedRecipe,
                      message: updatedRecipe.name + ' has been updated successfully'
                    }));

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }()).catch(function (error) {
          var e = handleErrors(error);
          return res.status(e.statusCode).send({
            message: e.message
          });
        });
      }).catch(function (error) {
        var e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }

    /**
     * Deletes a Recipe
     * @memberof RecipeController
     * @param { object } req
     * @param { object } res
     * @returns { object } response
     */

  }, {
    key: 'deleteRecipe',
    value: function deleteRecipe(req, res) {
      var _req$params2 = req.params,
          userId = _req$params2.userId,
          recipeId = _req$params2.recipeId;

      return Recipe.findById(recipeId).then(function (recipe) {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe does not exist'
          });
        }
        if (recipe.userId !== parseInt(userId, 10)) {
          return res.status(403).send({
            message: 'You are not allowed to delete this recipe.'
          });
        }
        return Recipe.destroy({
          where: {
            id: recipeId
          }
        }).then(function () {
          return res.status(200).send({
            message: 'Recipe deleted successfully'
          });
        }).catch(function (error) {
          var e = handleErrors(error);
          return res.status(e.statusCode).send({
            message: e.message
          });
        });
      }).catch(function (error) {
        var e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }

    /**
     * Gets Recipe
     * @memberof RecipeController
     * @param { object } req
     * @param { object } res
     * @returns { object } response
     */

  }, {
    key: 'getRecipes',
    value: function getRecipes(req, res) {
      var _req$query = req.query,
          sort = _req$query.sort,
          order = _req$query.order,
          limit = _req$query.limit,
          offset = _req$query.offset;
      var recipeId = req.params.recipeId;

      var where = recipeId ? { id: recipeId } : {};
      return Recipe.findAll({
        where: where,
        limit: limit || 10,
        offset: offset || 0,
        include: [{
          model: RecipeVote,
          attributes: [],
          duplicating: false
        }, {
          model: Review,
          duplicating: false
        }],
        attributes: (0, _keys2.default)(Recipe.attributes).concat([[_sequelize2.default.fn('SUM', _sequelize2.default.col('RecipeVotes.upVotes')), 'upVotes'], [_sequelize2.default.fn('SUM', _sequelize2.default.col('RecipeVotes.downVotes')), 'downVotes'], [_sequelize2.default.fn('SUM', _sequelize2.default.col('RecipeVotes.likes')), 'likes'], [_sequelize2.default.fn('SUM', _sequelize2.default.col('RecipeVotes.dislikes')), 'dislikes']]),
        group: ['Recipe.id', 'Reviews.id']
      }).then(function (recipes) {
        if (!recipes || recipes.length === 0) {
          return res.status(200).send({
            message: 'Oops! No recipe exists in this selection'
          });
        }
        var sortBy = sort || 'id';
        var sorted = recipes.sort(function (prev, next) {
          if (/desc/i.test(order)) {
            return parseInt(next.dataValues[sortBy], 10) - parseInt(prev.dataValues[sortBy], 10);
          }
          return parseInt(prev.dataValues[sortBy], 10) - parseInt(next.dataValues[sortBy], 10);
        });
        return res.status(200).send({ recipes: sorted });
      }).catch(function (error) {
        var e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }
  }]);
  return RecipeController;
}();

exports.default = RecipeController;