import Recipes from './Recipes';

/**
 * Handles Reviews operation on Recipe
 * @class Reviews
 * @extends Recipes
 */
class Reviews extends Recipes {
  /**
   * Instantiate Review Class
   * @method constructor
   * @memberof Reviews
   * @param { null } void
   * @returns { null } void
   */
  constructor() {
    super();
    this.reviews = [];
    this.review = {
      id: 0,
      userId: 0,
      recipeId: 0,
      description: 'Review description',
      imageURL: 'my/review/image/url'
    };
    this.lastIndex = 0;
  }

  /**
   * @method create
   * @memberof Reviews Class
   * @param { object } newReview
   * @returns { promise } review
   */
  create(newReview) {
    const id = this.lastIndex + 1;
    this.lastIndex += 1;
    const indexedReview = {
      ...newReview,
      userId: parseInt(newReview.userId, 10),
      id
    };
    this.review = {
      ...this.review,
      ...indexedReview
    };
    this.reviews.push(this.review);
    try {
      if (this.reviews[this.reviews.length - 1] !== this.review) {
        return Promise.reject(new Error('Review could not be created'));
      }
      return this.updateRecipeWithReview(this.review, this.review.recipeId)
        .then(recipeReview => Promise.resolve(recipeReview));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Update recipe reviews
   * @param { object } newReview
   * @param { number } recipeId
   * @returns { promise } recipe review
   */
  updateRecipeWithReview(newReview, recipeId) {
    return super.update({ id: parseInt(recipeId, 10), reviews: this.reviews })
      .then(recipe => Promise.resolve(recipe))
      .catch(error => Promise.reject(error));
  }
}

export default Reviews;