# Recipe Review(s)

## Review a recipe

> Request body

```javascript
{
  "userId": 1,
  "recipeId": 2,
  "parentId": 2,
  "description": "Review description",
  "imageURL": "imageurl@url.com"
}
```

> Response body (application/json)

```javascript
{
  "review": {
    "id":1
    "userId": 1,
    "recipeId": 2,
    "parentId": 2,
    "description": "Review description",
    "imageURL": "imageurl@url.com"
  },
  "message": "You have just reviewed item"
}
```

This endpoint adds review(s) to recipe

### HTTP Request

`POST /recipes/:recipeId/reviews`

### HTTP Response

`201 Created`

### URL Parameters

Parameter | Description
--------- | -----------
recipeId | The ID of the recipe

## Edit a review

> Request body

```javascript
{
  "description": "Edit review description",
  "imageURL": "imageurl@url.com"
}
```

> Response body (application/json)

```javascript
{
  "updatedReview": {
    "id":1
    "userId": 1,
    "recipeId": 2,
    "parentId": 2,
    "description": "Edit review description",
    "imageURL": "imageurl@url.com"
  },
  "message": "Your review have been updated successfully"
}
```

This endpoint edits a review

### HTTP Request

`PUT /recipes/:userId/reviews/:reviewId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user
reviewId | The ID of the review

## Delete a review

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": "Review deleted successfully"
}
```

This endpoint deletes a review

### HTTP Request

`DELETE /recipes/:userId/reviews/:reviewId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user
reviewId | The ID of the review
