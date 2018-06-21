import chai from 'chai';
import { ManageVotes } from '../../../middlewares';
import { recipeDetails } from '../../../helpers/dummyData';

const { assert } = chai;
const { restrictCreator, validateVotes } = ManageVotes;

describe('Manage User Votes', () => {
  /**
   * @function Recipe's author suite
   */
  describe('# Recipe\'s author', () => {
    it('it should return false for auuthor\'s vote', () => {
      const { shouldVote } = restrictCreator(recipeDetails, recipeDetails.userId);
      assert.equal(typeof(shouldVote), 'boolean');
      assert.equal(shouldVote, false);
    });

    it('it should return true for non author\'s vote', () => {
      const { shouldVote } = restrictCreator(recipeDetails, recipeDetails.userId + 1);
      assert.equal(typeof(shouldVote), 'boolean');
      assert.equal(shouldVote, true);
    });
  });

  /**
   * @function Validate votes suite
   */
  describe('# Validate user votes', () => {
    const options = {
      upCount: 5,
      downCount: 2,
      userId: 1,
      recipeId: 1
    };
    const voters = [{
      userId: 1,
      recipeId: 1,
      up: true
    }];
    it('it should disallow a user from upvoting twice', () => {
      const {
        upVotesCount,
        downVotesCount,
        userVotes,
        canVote
      } = validateVotes({...options, upVotes: 1 }, voters);
      assert.equal(upVotesCount, options.upCount);
      assert.equal(downVotesCount, options.downCount);
      assert.equal(userVotes.length, 1);
      assert.equal(canVote, false);
      Object.keys(voters[0]).forEach((key) => {
        assert.equal(voters[0][key.toString()], userVotes[0][key.toString()]);
      });
    });

    it('it should disallow a user from downvoting twice', () => {
      const {
        upVotesCount,
        downVotesCount,
        userVotes,
        canVote
      } = validateVotes({...options, downVotes: 1 }, [{...voters[0], up: false }]);
      assert.equal(upVotesCount, options.upCount);
      assert.equal(downVotesCount, options.downCount);
      assert.equal(userVotes.length, 1);
      assert.equal(canVote, false);
      Object.keys(voters[0]).forEach((key) => {
        if (key !== 'up') {
          assert.equal(voters[0][key.toString()], userVotes[0][key.toString()]);
        }
        assert.equal(userVotes[0].up, false);
      });
    });

    it('it should allow a user to downvote after upvoting', () => {
      const {
        upVotesCount,
        downVotesCount,
        userVotes,
        canVote
      } = validateVotes({...options, downVotes: 1 }, voters);
      assert.equal(upVotesCount, options.upCount - 1);
      assert.equal(downVotesCount, options.downCount + 1);
      assert.equal(userVotes.length, 1);
      assert.equal(canVote, true);
    });

    it('it should allow a user to upvote after downvoting', () => {
      const {
        upVotesCount,
        downVotesCount,
        userVotes,
        canVote
      } = validateVotes({...options, upVotes: 1 }, [{...voters[0], up: false }]);
      assert.equal(upVotesCount, options.upCount + 1);
      assert.equal(downVotesCount, options.downCount - 1);
      assert.equal(userVotes.length, 1);
      assert.equal(canVote, true);
    });
  });
});