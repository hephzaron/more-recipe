import Recipes from './Recipes';

/**
 * This enable users to upvote or down vote a recipe
 * @extends Recipes
 * @class UserVotes
 * @param { null } void
 * @returns { promise } promise object
 */
class UserVotes extends Recipes {
  /**
   * Creates an instance of class
   * @memberof UserVotes
   * @method constructor
   * @returns { null } void
   */
  constructor() {
    super();
    this.uVote = [];
  }

  /**
   * UpVote Recipe
   * @memberof UserVotes
   * @param {number} userId
   * @param {number} recipeId
   * @returns { promise } promise object
   */
  static upVote(userId, recipeId) {
    try {
      const youVote = this.checkVotes({ userId, recipeId });
      if (youVote) {
        return Promise.reject(new Error('You have previously voted'));
      }
      this.findOne({ where: { id: recipeId } })
        .then((recipe) => {
          if (!recipe.upVotes) {
            this.update({ id: recipeId, upVotes: 1 })
              .then((item) => {
                this.registerVotes({ userId, recipeId });
                return Promise.resolve(item);
              });
          }
          const incrementVote = recipe.upVotes + 1;
          this.update({ id: recipeId, upVotes: incrementVote })
            .then((item) => {
              this.registerVotes({ userId, recipeId });
              return Promise.resolve(item);
            });
        });
    } catch (e) {
      Promise.reject(e);
    }
  }

  /**
   * DownVote Recipe
   * @memberof UserVotes
   * @param {number} userId
   * @param {number} recipeId
   * @returns { promise } promise object
   */
  static downVote(userId, recipeId) {
    try {
      const youVote = this.checkVotes({ userId, recipeId });
      if (youVote) {
        return Promise.reject(new Error('You have previously voted'));
      }
      this.findOne({ where: { id: recipeId } })
        .then((recipe) => {
          if (!recipe.upVotes) {
            this.update({ id: recipeId, upVotes: -1 })
              .then((item) => {
                this.registerVotes({ userId, recipeId });
                return Promise.resolve(item);
              });
          }
          const decrementVote = recipe.upVotes - 1;
          this.update({ id: recipeId, upVotes: decrementVote })
            .then((item) => {
              this.registerVotes({ userId, recipeId });
              return Promise.resolve(item);
            });
        });
    } catch (e) {
      Promise.reject(e);
    }
  }

  /**
   * @memberof UserVotes
   * @param { string } sortBy
   * @param { string } order
   * @returns { promise } array promise object
   */
  static fetchByUpVotes(sortBy = 'upVotes', order = 'DESC') {
    const array = this.sortArray(this.recipes, [sortBy, order]);
    if (Array.isArray(array) && Object.keys(array) !== 'error') {
      Promise.resolve(array);
    }
    Promise.reject(array);
  }

  /**
   * Prevent user from voting twice on the same recipe
   * @memberof UserVotes
   * @param { object } voteParam
   * @returns { promise } uVote
   */
  static checkVotes({ userId, recipeId }) {
    const youVote = this.uVote.filter(item =>
      (item.userId === userId) && (item.recipeId === recipeId));
    return !!youVote;
  }

  /**
   * Register users who have voted for a recipe
   * @memberof UserVotes
   * @param { object } userId and recipeId
   * @returns { null } void
   */
  static registerVotes({ userId, recipeId }) {
    this.uVote.push({ userId, recipeId });
  }
}

export default UserVotes;