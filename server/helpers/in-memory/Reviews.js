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
    this.reviews = this.recipes.reviews;
    this.review = {
      id: 0,
      userId: 0,
      recipeId: 0,
      description: 'Review description',
      imageURL: 'my/review/image/url'
    };
  }

  /**
   * @method create
   * @memberof Reviews Class
   * @param { object } newReview
   * @returns { promise } review
   */
  create(newReview) {
    this.generateIndex.call(this, this.reviews);
    this.review = {
      ...newReview
    };
    this.reviews.push(this.review);
    try {
      if (this.reviews[this.reviews.length - 1] !== this.review) {
        return Promise.reject(new Error('Recipe could not be reviewed'));
      }
      this.updateRecipeWithReview(this.review, this.review.recipeId)
        .then(() => Promise.resolve(this.reviews[this.reviews.length - 1]));
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
  static updateRecipeWithReview(newReview, recipeId) {
    this.update({ id: recipeId, reviews: [...this.reviews, newReview] })
      .then(recipe => Promise.resolve(recipe))
      .catch(error => Promise.reject(error));
  }
}

export default Reviews;