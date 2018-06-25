# Recipes

## Create a recipe

> Request body

```javascript
{
  "userId": 1,
  "name": "name of recipe",
  "description": "describe recipe",
  "photoUrl": "photourl@photo.com"
}
```

> Response body (application/json)

```javascript
{
  "recipe": {
    "id": 1,
    "userId": 1,
    "name": "name of recipe",
    "description": "describe recipe",
    "photoUrl": "photourl@photo.com",
    "updatedAt": "2018-06-23T00:43:06.356Z",
    "createdAt": "2018-06-23T00:43:06.356Z",
    "favorites": null
    },
    "message": "name of recipe added successfully"
}
```

This endpoint creates a new recipe

### HTTP Request

`POST /recipes`

### HTTP Response

`201 Created`

## Edit a recipe

> Request body

```javascript
{
  "upVotes": 1,
}
```

> Response body (application/json)

```javascript
{
  "recipe": {
    "id": 1,
    "userId": 1,
    "name": "name of recipe",
    "description": "describe recipe",
    "favorites": null,
    "photoUrl": "photourl@photo.com",
    "createdAt": "2018-06-23T00:43:06.356Z",
    "updatedAt": "2018-06-23T00:43:06.356Z",
    "reviews": [],
    "upVotes": "1",
    "downVotes": "0",
    "likes": "0",
    "dislikes": "0"
    }
}
```

This endpoint updates a recipe. This also applies to `upVoting` and `downVoting` a recipe

### HTTP Request

`PUT /recipes/:userId/:recipeId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user
recipeId | The ID of the recipe

## Save a recipe

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": "Recipe saved"
}
```

This endpoint saves a recipe.

### HTTP Request

`POST /recipes/save/:userId/:recipeId`

### HTTP Response

`201 Created`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user
recipeId | The ID of the recipe

## Unsave a user recipe

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": "Recipe removed"
}
```

This endpoint unsaves a recipe.

### HTTP Request

`DELETE /recipes/unsave/:userId/:recipeId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user
recipeId | The ID of the recipe

## Get a user saved recipes

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "savedRecipe": [
    {
      "id": 1,
      "userId": 1,
      "name": "FirstRecipe",
      "description": "Describe your recipe in details",
      "favorites": null,
      "photoUrl": null,
      "createdAt": "2018-06-09T03:19:04.848Z",
      "updatedAt": "2018-06-09T03:19:04.848Z",
      "SavedRecipe": {
        "id": 1,
        "userId": 1,
        "recipeId": 1,
        "createdAt": "2018-06-25T16:33:59.846Z",
        "updatedAt": "2018-06-25T16:33:59.846Z"
        }
      },
      ...
  ]
}
```

This endpoint gets list of recipes saved by user.

### HTTP Request

`GET /recipes/saved/:userId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user

## Get all recipes

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "recipes": [
    {
      "id": 1,
      "userId": 1,
      "name": "name of recipe",
      "description": "describe recipe",
      "photoUrl": "photourl@photo.com"
      "createdAt": "2018-06-09T03:19:04.848Z",
      "updatedAt": "2018-06-09T03:19:04.848Z",
      "upVotes": "0",
      "downVotes": "0",
      "likes": "0",
      "dislikes": "0",
      "Reviews": []
      },
      ...
    ]
}
```

This endpoint gets all recipes

### HTTP Request

`GET /recipes`

### HTTP Response

`200 OK`

## Sort Recipe

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "recipes": [
    {
      "id": 1,
      "userId": 1,
      "name": "name of recipe",
      "description": "describe recipe",
      "favorites": null,
      "photoUrl": null,
      "createdAt": "2018-06-09T03:19:04.898Z",
      "updatedAt": "2018-06-09T03:19:04.898Z",
      "upVotes": "1",
      "downVotes": "0",
      "likes": "0",
      "dislikes": "0",
    },
    ...
  ]
}
```

This endpoint gets all recipes

### HTTP Request

`GET /recipes`

### HTTP Response

`200 OK`

### Query Parameters

Parameter | Default | Description
--------- | ----------- | --------
sort | undefined | A choosen property of recipe to be used in sorting
order | undefined | The order of recipes required `asc` or `desc`

## Get a single recipe

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "recipe": {
      "id": 1,
      "userId": 1,
      "name": "name of recipe",
      "description": "describe recipe",
      "favorites": null,
      "photoUrl": "photourl@photo.com",
      "createdAt": "2018-06-23T00:43:06.356Z",
      "updatedAt": "2018-06-23T00:43:06.356Z",
      "upVotes": "1",
      "downVotes": "0",
      "likes": "0",
      "dislikes": "0",
      "Reviews": []
  }
}
```

This endpoint gets a single recipe

### HTTP Request

`GET /recipes/:recipeId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
recipeId | The ID of the recipe

## Delete a recipe

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": "Recipe deleted successfully"
}
```

This endpoint deletes a recipe

### HTTP Request

`DELETE /recipes/:userId/:recipeId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user
recipeId | The ID of the recipe
