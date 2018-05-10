'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controls and manage upVotes downVotes
 * @class ManageVotes
 */
var ManageVotes = function () {
  function ManageVotes() {
    _classCallCheck(this, ManageVotes);
  }

  _createClass(ManageVotes, null, [{
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
     * @param { object } opts
     * @param { array } voters
     * @returns { object } voters parameter
     */

  }, {
    key: 'validateVotes',
    value: function validateVotes(opts, voters) {
      var upCount = opts.upCount,
          downCount = opts.downCount,
          upVotes = opts.upVotes,
          downVotes = opts.downVotes,
          userId = opts.userId,
          recipeId = opts.recipeId;

      var userUpVoteIndex = _lodash2.default.findIndex(voters, {
        userId: parseInt(userId, 10),
        recipeId: parseInt(recipeId, 10),
        up: true
      });
      var userDownVoteIndex = _lodash2.default.findIndex(voters, {
        userId: parseInt(userId, 10),
        recipeId: parseInt(recipeId, 10),
        up: false
      });
      var upVotesCount = upCount;
      var downVotesCount = downCount;
      var userVotes = voters;
      var newVoters = void 0;
      var canVote = true;
      if (upVotes) {
        if (userUpVoteIndex === -1 && userDownVoteIndex >= 0) {
          upVotesCount = upCount + 1;
          downVotesCount = downCount - 1;
          newVoters = voters.filter(function (voter, index) {
            return index !== userDownVoteIndex;
          });
          userVotes = newVoters.concat([{
            userId: parseInt(userId, 10),
            recipeId: parseInt(recipeId, 10),
            up: true
          }]);
        } else if (userUpVoteIndex === -1 && userDownVoteIndex === -1) {
          upVotesCount = upCount + 1;
          userVotes = voters.concat([{
            userId: parseInt(userId, 10),
            recipeId: parseInt(recipeId, 10),
            up: true
          }]);
        } else {
          canVote = false;
        }
      } else if (downVotes) {
        if (userUpVoteIndex >= 0 && userDownVoteIndex === -1) {
          upVotesCount = upCount - 1;
          downVotesCount = downCount + 1;
          newVoters = voters.filter(function (voter, index) {
            return index !== userUpVoteIndex;
          });
          userVotes = newVoters.concat([{
            userId: parseInt(userId, 10),
            recipeId: parseInt(recipeId, 10),
            up: false
          }]);
        } else if (userUpVoteIndex === -1 && userDownVoteIndex === -1) {
          downVotesCount = downCount + 1;
          userVotes = voters.concat([{
            userId: parseInt(userId, 10),
            recipeId: parseInt(recipeId, 10),
            up: false
          }]);
        } else {
          canVote = false;
        }
      }
      return {
        upVotesCount: upVotesCount,
        downVotesCount: downVotesCount,
        userVotes: userVotes,
        canVote: canVote
      };
    }
  }]);

  return ManageVotes;
}();

exports.default = ManageVotes;