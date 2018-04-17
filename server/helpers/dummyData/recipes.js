export default () => {
  const recipe = {
    id: 1,
    name: 'RecipeName',
    description: 'Describe your recipe in details',
    imageURL: 'images/recipe/url',
    upvotes: 5,
    favorites: 4,
    downvotes: 6,
    numberOfReviews: 4,
    replies: JSON.stringify({}),
    ingredients: JSON.stringify([])
  };

  const recipes = {
    1: {
      id: 1,
      name: 'RecipeName',
      description: 'Describe your recipe in details',
      imageURL: 'images/recipe/url',
      upvotes: 5,
      favorites: 4,
      downvotes: 6,
      numberOfReviews: 4,
      numberOfViews: 6,
      replies: JSON.stringify({
        1: {
          userId: 1,
          recipeId: 2,
          replyId: 1,
          numberOfLikes: 4,
          replyMessage: 'I am message 1',
          subReplies: {
            1: {
              userId: 1,
              recipeId: 2,
              replyId: '1-1',
              numberOfLikes: 4,
              replyMessage: 'I am reply 1 of 1',
              subReplies: {}
            },
            2: {
              userId: 4,
              recipeId: 2,
              replyId: '1-2',
              numberOfLikes: 4,
              replyMessage: 'I am reply 2 of 1',
              subReplies: {}
            }
          }
        },
        2: {
          userId: 1,
          recipeId: 2,
          replyId: 1,
          numberOfLikes: 4,
          replyMessage: 'I am message 2',
          subReplies: {}
        }
      })
    },
    2: {
      id: 2,
      name: 'RecipeName2',
      description: 'Describe your recipe in details2',
      imageURL: 'images/recipe/url2',
      upvotes: 10,
      favorites: 4,
      downvotes: 6,
      numberOfReviews: 4,
      numberOfViews: 3,
      replies: {}
    },
    3: {
      id: 3,
      name: 'RecipeName3',
      description: 'Describe your recipe in details3',
      imageURL: 'images/recipe/url3',
      upvotes: 8,
      favorites: 5,
      downvotes: 6,
      numberOfReviews: 4,
      numberOfViews: 2,
      replies: {}
    }
  };

  const usersRecipes = {
    1: {
      userId: 1,
      recipeId: 1
    },
    2: {
      userId: 1,
      recipeId: 2
    },
    3: {
      userId: 2,
      recipeId: 1
    },
    4: {
      userId: 3,
      recipeId: 1
    },
    5: {
      userId: 3,
      recipeId: 3
    }
  };
  return {
    recipe,
    recipes,
    usersRecipes
  };
};