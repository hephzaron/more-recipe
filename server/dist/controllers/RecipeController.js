'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inMemory = require('../helpers/in-memory');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Handles Recipe request operations
 * @class RecipeController
 * @param { null } void
 */
var RecipeController = function (_RecipeClass) {
  _inherits(RecipeController, _RecipeClass);

  function RecipeController() {
    _classCallCheck(this, RecipeController);

    return _possibleConstructorReturn(this, (RecipeController.__proto__ || Object.getPrototypeOf(RecipeController)).apply(this, arguments));
  }

  _createClass(RecipeController, [{
    key: 'addRecipe',

    /**
     * Adds a new recipe
     * @memberof RecipeController
     * @param { object } req -request
     * @param { object } res -respone
     * @returns { obejct } server response
     */
    value: function addRecipe(req, res) {
      return _get(RecipeController.prototype.__proto__ || Object.getPrototypeOf(RecipeController.prototype), 'create', this).call(this, _extends({}, req.body)).then(function (recipe) {
        return res.status(201).send({
          recipe: recipe,
          message: recipe.name + ' added successfully'
        });
      }).catch(function (error) {
        return res.status(error.statusCode).send({
          message: error.message
        });
      });
    }

    /**
     * Modify a Recipe
     * @param {object} req
     * @param {object} res
     * @returns { promise } response
     */

  }, {
    key: 'modifyRecipe',
    value: function modifyRecipe(req, res) {
      var id = req.params.recipeId;
      return _get(RecipeController.prototype.__proto__ || Object.getPrototypeOf(RecipeController.prototype), 'update', this).call(this, _extends({ id: id }, req.body)).then(function (modifiedRecipe) {
        return res.status(200).send({
          recipe: modifiedRecipe,
          message: 'Changes made on ' + modifiedRecipe.name + ' is successfull'
        });
      }).catch(function (error) {
        return res.status(error.statusCode).send({
          message: error.message
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
      var id = req.params.recipeId;
      return _get(RecipeController.prototype.__proto__ || Object.getPrototypeOf(RecipeController.prototype), 'delete', this).call(this, id).then(function (deletedRecipe) {
        return res.status(200).send({
          message: deletedRecipe.name + ' have been successfully removed'
        });
      }).catch(function (error) {
        return res.status(error.statusCode).send({
          error: error.messsage
        });
      });
    }

    /**
     * Gets all Recipe
     * @memberof RecipeController
     * @param { object } req
     * @param { object } res
     * @returns { object } response
     */

  }, {
    key: 'getAllRecipe',
    value: function getAllRecipe(req, res) {
      var _req$query = req.query,
          sort = _req$query.sort,
          order = _req$query.order;

      if (sort && order) {
        return _get(RecipeController.prototype.__proto__ || Object.getPrototypeOf(RecipeController.prototype), 'findAll', this).call(this, { opts: [sort, order] }).then(function (recipes) {
          return res.status(200).send({ recipes: recipes });
        }).catch(function (error) {
          return res.status(error.statusCode).send({
            message: error.message
          });
        });
      }
      return _get(RecipeController.prototype.__proto__ || Object.getPrototypeOf(RecipeController.prototype), 'findAll', this).call(this, {}).then(function (recipes) {
        return res.status(200).send({ recipes: recipes });
      }).catch(function (error) {
        return res.status(error.statusCode).send({
          message: error.message
        });
      });
    }

    /**
     * Adds a new review to recipe
     * @method addReview
     * @memberof ReviewController
     * @param { object } req
     * @param { object } res
     * @returns { object } response
     */

  }, {
    key: 'addReview',
    value: function addReview(req, res) {
      var recipeId = req.params.recipeId;

      return _get(RecipeController.prototype.__proto__ || Object.getPrototypeOf(RecipeController.prototype), 'createReview', this).call(this, _extends({ recipeId: recipeId }, req.body)).then(function (reviewedRecipe) {
        return res.status(201).send({
          recipe: reviewedRecipe,
          message: 'You added a review to ' + reviewedRecipe.name
        });
      }).catch(function (error) {
        return res.status(error.statusCode).send({
          message: error.message
        });
      });
    }
  }]);

  return RecipeController;
}(_inMemory.Recipe);

exports.default = RecipeController;