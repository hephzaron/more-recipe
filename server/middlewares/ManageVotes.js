import _ from 'lodash';
/**
 * Controls and manage upVotes downVotes
 * @class ManageVotes
 */
class ManageVotes {
  /**
   * Prevents recipe creator from voting on created recipe
   * @method restrictCraetor
   * @memberof ManageVotes
   * @param { object } recipe
   * @param { number } userId
   * @returns { boolean } shouldVote
   */
  static restrictCreator(recipe, userId) {
    const shouldVote = parseInt(recipe.userId, 10) === parseInt(userId, 10);
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
  static validateVotes(opts, voters) {
    const {
      upCount,
      downCount,
      upVotes,
      downVotes,
      userId,
      recipeId
    } = opts;
    const userUpVoteIndex = _.findIndex(voters, {
      userId: parseInt(userId, 10),
      recipeId: parseInt(recipeId, 10),
      up: true
    });
    const userDownVoteIndex = _.findIndex(voters, {
      userId: parseInt(userId, 10),
      recipeId: parseInt(recipeId, 10),
      up: false
    });
    console.log(userUpVoteIndex);
    console.log(userDownVoteIndex);
    console.log(userId);

    let upVotesCount = upCount;
    let downVotesCount = downCount;
    let userVotes = voters;
    let newVoters;
    let canVote = true;
    if (upVotes) {
      if (userUpVoteIndex === -1 && userDownVoteIndex >= 0) {
        upVotesCount = upCount + 1;
        downVotesCount = downCount - 1;
        newVoters = voters.filter((voter, index) => index !== userDownVoteIndex);
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
        newVoters = voters.filter((voter, index) => index !== userUpVoteIndex);
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
      upVotesCount,
      downVotesCount,
      userVotes,
      canVote
    };
  }
}
export default ManageVotes;