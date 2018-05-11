---
title: API Reference

language_tabs: 
  - javascript

toc_footers:
  - <a href='https://waw-recipe.herokuapp.com/'>Visit waw-recipe</a>
  - <a href='https://github.com/hephzaron/more-recipe.git'>Check out the project repo here</a>

includes:
  - users
  - recipes
  - errors

search: true
---

# Introduction

Welcome to the Waw-Recipe API! You can use our API to access Waw-Recipe endpoints, which can get information on various users and recipes in our database.

You can view code example in the dark area to the right.

HTTP Request url must be prepended with base url

* [BASE URL] - https://waw-recipe.herokuapp.com/api/v1

# Authentication

> To authorize,

```javascript
  add `authorization` to your request header.
  Its value must be a valid signed JWT token.
```

Waw-Recipe uses JWT to authenticate a user. The JWT token must be signed by the application and it has an expiry time of 24hours.

Waw-Recipe expects that the token is included in every request like:

* [authorization] - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

<aside class="notice">
You must replace <code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</code> with the signed token.
</aside>

## Login

> Request body

```javascript
{
  "email": "myemail@email.com",
  "password": "password"
}
```

> Response body (application/json)

```javascript
{
  "message": "Authentication successful",
  "user": {
    "username": "username",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "admin": false
  }
}
```

This endpoint logs a user into the application. The token should be included in subsequent request header.

### HTTP Request

`POST /users/signin`

### HTTP Response

`200 OK`
