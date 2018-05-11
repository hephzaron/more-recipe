# Recipe Review(s)

## Review a recipe

> Request body

```javascript
{
  "userId": 1,
  "recipeId": 2,
  "description": "Review description",
  "imageURL": "my/review/image/url"
}
```

> Response body (application/json)

```javascript
{
  "recipe": {
    "id": 2,
    "userId": 1,
    "name": "name of recipe",
    "description": "describe recipe",
    "reviews": [
       {
         "id": 1,
         "userId": 1,
         "recipeId": 2,
         "description": "Review description",
         "imageURL": "my/review/image/url"
         },
         ...
      ],
    "upVotes": 0,
    "downVotes": 0,
    "totalVotes": 0,
    "imageURL": "imageFile"
    },
    "message": "You added a review to name of recipe"
}
```

This endpoint adds review(s) to recipe

### HTTP Request

`PUT /recipes/:recipeId/reviews`

### HTTP Response

`201 Created`

### URL Parameters

Parameter | Description
--------- | -----------
recipeId | The ID of the recipe
