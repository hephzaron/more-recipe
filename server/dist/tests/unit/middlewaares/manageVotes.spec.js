'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _middlewares = require('../../../middlewares');

var _dummyData = require('../../../helpers/dummyData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert;
var restrictCreator = _middlewares.ManageVotes.restrictCreator,
    validateVotes = _middlewares.ManageVotes.validateVotes;


describe('Manage User Votes', function () {
  /**
   * @function Recipe's author suite
   */
  describe('# Recipe\'s author', function () {
    it('it should return false for auuthor\'s vote', function () {
      var _restrictCreator = restrictCreator(_dummyData.recipeDetails, _dummyData.recipeDetails.userId),
          shouldVote = _restrictCreator.shouldVote;

      assert.equal(typeof shouldVote === 'undefined' ? 'undefined' : _typeof(shouldVote), 'boolean');
      assert.equal(shouldVote, false);
    });

    it('it should return true for non author\'s vote', function () {
      var _restrictCreator2 = restrictCreator(_dummyData.recipeDetails, _dummyData.recipeDetails.userId + 1),
          shouldVote = _restrictCreator2.shouldVote;

      assert.equal(typeof shouldVote === 'undefined' ? 'undefined' : _typeof(shouldVote), 'boolean');
      assert.equal(shouldVote, true);
    });
  });

  /**
   * @function Validate votes suite
   */
  describe('# Validate user votes', function () {
    var options = {
      upCount: 5,
      downCount: 2,
      userId: 1,
      recipeId: 1
    };
    var voters = [{
      userId: 1,
      recipeId: 1,
      up: true
    }];
    it('it should disallow a user from upvoting twice', function () {
      var _validateVotes = validateVotes(_extends({}, options, { upVotes: 1 }), voters),
          upVotesCount = _validateVotes.upVotesCount,
          downVotesCount = _validateVotes.downVotesCount,
          userVotes = _validateVotes.userVotes,
          canVote = _validateVotes.canVote;

      assert.equal(upVotesCount, options.upCount);
      assert.equal(downVotesCount, options.downCount);
      assert.equal(userVotes.length, 1);
      assert.equal(canVote, false);
      Object.keys(voters[0]).forEach(function (key) {
        assert.equal(voters[0][key.toString()], userVotes[0][key.toString()]);
      });
    });

    it('it should disallow a user from downvoting twice', function () {
      var _validateVotes2 = validateVotes(_extends({}, options, { downVotes: 1 }), [_extends({}, voters[0], { up: false })]),
          upVotesCount = _validateVotes2.upVotesCount,
          downVotesCount = _validateVotes2.downVotesCount,
          userVotes = _validateVotes2.userVotes,
          canVote = _validateVotes2.canVote;

      assert.equal(upVotesCount, options.upCount);
      assert.equal(downVotesCount, options.downCount);
      assert.equal(userVotes.length, 1);
      assert.equal(canVote, false);
      Object.keys(voters[0]).forEach(function (key) {
        if (key !== 'up') {
          assert.equal(voters[0][key.toString()], userVotes[0][key.toString()]);
        }
        assert.equal(userVotes[0].up, false);
      });
    });

    it('it should allow a user to downvote after upvoting', function () {
      var _validateVotes3 = validateVotes(_extends({}, options, { downVotes: 1 }), voters),
          upVotesCount = _validateVotes3.upVotesCount,
          downVotesCount = _validateVotes3.downVotesCount,
          userVotes = _validateVotes3.userVotes,
          canVote = _validateVotes3.canVote;

      assert.equal(upVotesCount, options.upCount - 1);
      assert.equal(downVotesCount, options.downCount + 1);
      assert.equal(userVotes.length, 1);
      assert.equal(canVote, true);
    });

    it('it should allow a user to upvote after downvoting', function () {
      var _validateVotes4 = validateVotes(_extends({}, options, { upVotes: 1 }), [_extends({}, voters[0], { up: false })]),
          upVotesCount = _validateVotes4.upVotesCount,
          downVotesCount = _validateVotes4.downVotesCount,
          userVotes = _validateVotes4.userVotes,
          canVote = _validateVotes4.canVote;

      assert.equal(upVotesCount, options.upCount + 1);
      assert.equal(downVotesCount, options.downCount - 1);
      assert.equal(userVotes.length, 1);
      assert.equal(canVote, true);
    });
  });
});