import _ from 'lodash';
import GenerateTreeStructure from '../helpers/GenerateTreeStructure';

/**
 * This orders hierarchical structure of reviews from database
 * @param { object } reviews
 * @param { number } parentReview
 * @returns { array } array of recipe reviews
 */
class OrderReviews extends GenerateTreeStructure {
  /**
   * structure
   * @param { object } reviews
   * @returns { object } class
   */
  structure(reviews) {
    const rootIndex = _.findIndex(reviews, { parentId: 0 });
    super.add(reviews[rootIndex]);
    reviews.forEach((review) => {
      const parentIndex = _.findIndex(reviews, { id: review.parentId });
      if (review.parentId !== 0) {
        super.add(review, reviews[parentIndex]);
      }
    });
    return this.root;
  }
}

export default OrderReviews;