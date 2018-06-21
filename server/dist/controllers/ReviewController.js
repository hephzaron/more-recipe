'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User,
    Recipe = _models2.default.Recipe,
    Review = _models2.default.Review;
var Op = _sequelize2.default.Op;
/**
 * Handles Review request operations
 * @class ReviewController
 * @param { null } void
 */

var ReviewController = function () {
  function ReviewController() {
    (0, _classCallCheck3.default)(this, ReviewController);
  }

  (0, _createClass3.default)(ReviewController, null, [{
    key: 'addReview',

    /**
     * Adds a new review
     * @memberof ReviewController
     * @param { object } req -request
     * @param { object } res -respone
     * @returns { obejct } server response
     */
    value: function addReview(req, res) {
      var recipeId = req.params.recipeId;
      var _req$body = req.body,
          userId = _req$body.userId,
          parentId = _req$body.parentId;

      return User.findById(userId).then(function (user) {
        if (!user) {
          return res.status(404).send({
            message: 'Non existing user cannot review recipe'
          });
        }
        return Recipe.findById(recipeId).then(function (recipe) {
          if (!recipe) {
            return res.status(404).send({
              message: 'Recipe does not exist'
            });
          }
          return Review.find({
            where: {
              id: parentId,
              recipeId: recipeId
            }
          }).then(function (review) {
            if (!review) {
              return res.status(404).send({
                message: 'You are trying review an invalid item. Please select an item'
              });
            }
            Review.create((0, _extends3.default)({}, req.body, { recipeId: recipeId }), {
              fields: ['userId', 'recipeId', 'parentId', 'description', 'imageUrl'],
              returning: true
            }).then(function (newReview) {
              return res.status(201).send({
                review: newReview,
                message: 'You have just reviewed item'
              });
            }).catch(function (error) {
              var e = _ErrorHandler2.default.handleErrors(error);
              return res.status(e.statusCode).send({
                message: e.message
              });
            });
          }).catch(function (error) {
            var e = _ErrorHandler2.default.handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
        }).catch(function (error) {
          var e = _ErrorHandler2.default.handleErrors(error);
          return res.status(e.statusCode).send({
            message: e.message
          });
        });
      }).catch(function (error) {
        var e = _ErrorHandler2.default.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }

    /**
     * Edit a Review
     * @param {object} req
     * @param {object} res
     * @returns { promise } response
     */

  }, {
    key: 'editReview',
    value: function editReview(req, res) {
      var _req$params = req.params,
          reviewId = _req$params.reviewId,
          userId = _req$params.userId;

      return Review.findById(reviewId).then(function (review) {
        if (!review) {
          return res.status(404).send({
            message: 'Review does not exist'
          });
        }
        if (review.parentId === 0) {
          return res.status(403).send({
            message: 'Recipe cannot be modified here'
          });
        }
        if (review.userId !== parseInt(userId, 10)) {
          return res.status(403).send({
            message: 'You are not allowed to modify this review. Please add your own review instead'
          });
        }
        return review.update(req.body, {
          fields: ['description', 'imageUrl'],
          returning: true
        }).then(function (updatedReview) {
          return res.status(200).send({
            updatedReview: updatedReview,
            message: 'Your review have been updated successfully'
          });
        }).catch(function (error) {
          var e = _ErrorHandler2.default.handleErrors(error);
          return res.status(e.statusCode).send({
            message: e.message
          });
        });
      }).catch(function (error) {
        var e = _ErrorHandler2.default.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }

    /**
     * Deletes a Review
     * @memberof ReviewController
     * @param { object } req
     * @param { object } res
     * @returns { object } response
     */

  }, {
    key: 'deleteReview',
    value: function deleteReview(req, res) {
      var _req$params2 = req.params,
          userId = _req$params2.userId,
          reviewId = _req$params2.reviewId;

      return Review.findById(reviewId).then(function (review) {
        if (!review) {
          return res.status(404).send({
            message: 'Review does not exist'
          });
        }
        if (review.userId !== parseInt(userId, 10)) {
          return res.status(403).send({
            message: 'You are not allowed to delete this review.'
          });
        }
        if (review.parentId === 0) {
          return res.status(403).send({
            message: 'You are not allowed to delete recipe from here'
          });
        }
        return Review.destroy({
          where: (0, _defineProperty3.default)({}, Op.or, [{ id: reviewId }, { parentId: reviewId }])
        }).then(function () {
          return res.status(200).send({
            message: 'Review deleted successfully'
          });
        }).catch(function (error) {
          var e = _ErrorHandler2.default.handleErrors(error);
          return res.status(e.statusCode).send({
            message: e.message
          });
        });
      }).catch(function (error) {
        var e = _ErrorHandler2.default.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }
  }]);
  return ReviewController;
}();

exports.default = ReviewController;