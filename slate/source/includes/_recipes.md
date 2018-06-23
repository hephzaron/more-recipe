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
    "reviews": [],
    "upVotes": 1,
    "downVotes": 0,
    "totalVotes": 1,
    "imageURL": "imageFile"
    },
    "message": "Changes made on name of recipe is successfull"
}
```

This endpoint updates a recipe. This also applies to `upVoting` and `downVoting` a recipe

### HTTP Request

`PUT /recipes/:recipeId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
recipeId | The ID of the recipe

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
      "reviews": [],
      "upVotes": 1,
      "downVotes": 0,
      "totalVotes": 1,
      "imageURL": "imageFile"
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
      "reviews": [],
      "upVotes": 1,
      "downVotes": 0,
      "totalVotes": 1,
      "imageURL": "imageFile"
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
order | undefined | The order of recipes required `asc` or `desc || dsc`-case irrelevant

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
      "reviews": [],
      "upVotes": 1,
      "downVotes": 0,
      "totalVotes": 1,
      "imageURL": "imageFile"
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
  "message": "name of recipe have been successfully removed"
}
```

This endpoint deletes a recipe

### HTTP Request

`DELETE /recipes/:recipeId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
recipeId | The ID of the recipe
