'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _ErrorHandler = require('../helpers/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SavedRecipe = _models2.default.SavedRecipe,
    User = _models2.default.User,
    Recipe = _models2.default.Recipe;
var handleErrors = _ErrorHandler2.default.handleErrors;

/**
 * Handles saved recipe request operations
 * @class SavedRecipeController
 * @param { null } void
 */

var SavedRecipeController = function () {
  function SavedRecipeController() {
    (0, _classCallCheck3.default)(this, SavedRecipeController);
  }

  (0, _createClass3.default)(SavedRecipeController, null, [{
    key: 'saveRecipe',

    /**
     * Saves a recipe
     * @memberof SavedRecipeController
     * @param { object } req -request
     * @param { object } res -respone
     * @returns { obejct } server response
     */
    value: function saveRecipe(req, res) {
      var _req$params = req.params,
          recipeId = _req$params.recipeId,
          userId = _req$params.userId;

      return SavedRecipe.create({
        recipeId: recipeId,
        userId: userId
      }).then(function () {
        return res.status(201).send({
          message: 'Recipe saved'
        });
      }).catch(function (error) {
        var e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }

    /**
     * Unsaves a recipe
     * @memberof SavedRecipeController
     * @param { object } req -request
     * @param { object } res -respone
     * @returns { obejct } server response
     */

  }, {
    key: 'unsaveRecipe',
    value: function unsaveRecipe(req, res) {
      var _req$params2 = req.params,
          recipeId = _req$params2.recipeId,
          userId = _req$params2.userId;

      return SavedRecipe.find({
        where: {
          recipeId: recipeId,
          userId: userId
        }
      }).then(function (userRecipe) {
        if (!userRecipe) {
          return res.status(401).send({
            message: 'Recipe have never been saved'
          });
        }
        return SavedRecipe.destroy({
          where: {
            recipeId: recipeId,
            userId: userId
          }
        }).then(function () {
          return res.status(200).send({
            message: 'Recipe removed'
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
     * Get saved recipe
     * @memberof SavedRecipeController
     * @param { object } req -request
     * @param { object } res -respone
     * @returns { obejct } server response
     */

  }, {
    key: 'getSavedRecipe',
    value: function getSavedRecipe(req, res) {
      var userId = req.params.userId;

      return User.find({
        where: {
          id: userId
        },
        attributes: ['id', 'email', 'username'],
        include: [{ model: Recipe, as: 'savedRecipe' }]
      }).then(function (user) {
        var savedRecipe = user.savedRecipe;

        if (savedRecipe.length <= 0) {
          return res.status(401).send({
            message: 'You have no saved recipe yet'
          });
        }
        return res.status(200).send({ savedRecipe: savedRecipe });
      }).catch(function (error) {
        var e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }
  }]);
  return SavedRecipeController;
}();

exports.default = SavedRecipeController;