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

var RecipeVote = _models2.default.RecipeVote;
var handleErrors = _ErrorHandler2.default.handleErrors;
/**
 * Controls and manage upVotes downVotes
 * @class ManageVotes
 */

var ManageVotes = function () {
  function ManageVotes() {
    (0, _classCallCheck3.default)(this, ManageVotes);
  }

  (0, _createClass3.default)(ManageVotes, null, [{
    key: 'restrictCreator',

    /**
     * Prevents recipe creator from voting on created recipe
     * @method restrictCraetor
     * @memberof ManageVotes
     * @param { object } recipe
     * @param { number } userId
     * @returns { boolean } shouldVote
     */
    value: function restrictCreator(recipe, userId) {
      var shouldVote = parseInt(recipe.userId, 10) === parseInt(userId, 10);
      return {
        shouldVote: !shouldVote
      };
    }

    /**
     * Validates and control user votes
     * @method validateVotes
     * @memberof ManageVotes
     * @param { object } req -request object
     * @param { object } res -response object
     * @returns { object } voters parameter
     */

  }, {
    key: 'validateVotes',
    value: function validateVotes(req, res) {
      var _req$params = req.params,
          recipeId = _req$params.recipeId,
          userId = _req$params.userId;
      var _req$body = req.body,
          upVotes = _req$body.upVotes,
          downVotes = _req$body.downVotes,
          likes = _req$body.likes,
          dislikes = _req$body.dislikes;

      if (upVotes && downVotes) {
        return res.status(403).send({
          message: 'You can only upVote or downVote one at a time'
        });
      }
      if (likes && dislikes) {
        return res.status(403).send({
          message: 'You can only like or dislike one at a time'
        });
      }
      return RecipeVote.findOne({
        where: {
          userId: userId,
          recipeId: recipeId
        }
      }).then(function (vote) {
        if (!vote) {
          return RecipeVote.create({
            userId: userId,
            recipeId: recipeId,
            upVotes: upVotes ? 1 : 0,
            downVotes: downVotes ? 1 : 0,
            likes: likes ? 1 : 0,
            dislikes: dislikes ? 1 : 0
          }).then(function (userVote) {
            return res.status(200).send({
              userVote: userVote,
              message: (userVote.upVotes || userVote.downVotes) === 1 ? 'Voting successful' : ''
            });
          }).catch(function (error) {
            var e = handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
        }

        var _vote$handleVotes = vote.handleVotes({ upVotes: upVotes, downVotes: downVotes }),
            upvotes = _vote$handleVotes.upvotes,
            downvotes = _vote$handleVotes.downvotes;

        var _vote$handleLikes = vote.handleLikes({ likes: likes, dislikes: dislikes }),
            like = _vote$handleLikes.like,
            dislike = _vote$handleLikes.dislike;

        return vote.update({
          upVotes: upvotes,
          downVotes: downvotes,
          likes: like,
          dislikes: dislike
        }).then(function (userVote) {
          return res.status(200).send({
            userVote: userVote,
            message: userVote.upVotes || userVote.downVotes ? 'Voting successful' : ''
          });
        }).catch(function (error) {
          var e = handleErrors(error);
          return res.status(e.statusCode).send({
            message: e.message
          });
        });
      });
    }
  }]);
  return ManageVotes;
}();

exports.default = ManageVotes;