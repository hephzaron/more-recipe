# Users

## Create a user

> Request body

```javascript
{ 
  "username": "username",
  "email": "myemail@email.com",
  "firstName" : "firstName",
  "lastName": "lastName",
  "age":18,
  "sex":"female",
  "password": "password",
  "confirmPassword": "password"
}
```

> Response body (application/json)

```javascript
{
  "userPayload": {
    "user": {
      "id": 1,
      "firstName": "firstName",
      "lastName": "lastName",
      "email": "myemail@email.com",
      "username": "username",
      "age": 18,
      "sex": "female"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "message": "Your account has been created successfully"
}
```

This endpoint creates a user record.

### HTTP Request

`POST /signup`

### HTTP Response

`201 Created`

## Edit a user

> Request body

```javascript
{
  "username": "newUsername",
}
```

> Response body (application/json)

```javascript
{
  "user": {
      "id": 1,
      "firstName": "firstName",
      "lastName": "lastName",
      "email": "myemail@email.com",
      "username": "newUsername",
      "age": 18,
      "sex": "female"""
    }
}
```

This endpoint edits a user record.

### HTTP Request

`PUT /users/:userId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user

## Send reset password

> Request body

```javascript
{
  "email": "myemail@email.com"
}
```

> Response body (application/json)

```javascript
{
  "message": "Password reset link sent to myemail12@email.com"
}
```

This endpoint sends a reset password link to the user associated with the provided email address

### HTTP Request

`POST /users/forgot_password`

### HTTP Response

`200 OK`

## Validate reset link

> Request body

```javascript
{}
```

> Response body (application/json)

```javascript
{
  "message": "Password reset successful, you can now change your password",
  "user": {
    "username": "username12",
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1
  }
}
```

This endpoint validates the reset link after the user has click on the reset password link and redirects user to change password

### HTTP Request

`POST /auth/reset-password/`

### HTTP Response

`200 OK`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
token | undefined | The reset token sent to user email

<aside class="notice">
The query parameter<code>token=ab653dbf704d6f70ec466a8b4395d4d8220dd...</code> is a randomly generates number
</aside>

## Change password

> Request body

```javascript
{
  "newPassword": "new password",
  "confirmPassword": "new password"
}
```

> Response body (application/json)

```javascript
{
  "message": "Password change successful, please login to your account"
}
```

This endpoint is for authenticated users to change their password

### HTTP Request

`PUT /users/change_password`

### HTTP Response

`200 OK`

## Get all users

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "users": [
    {
      "id": 1,
      "firstName": "firstName",
      "lastName": "lastName",
      "email": "myemail@email.com",
      "username": "username",
      "age": "24",
      "sex": "female",
      "facebookOauthID": "",
      "googleOauthID": ""
    },
    ...
    ]
}
```

This endpoint gets all users

### HTTP Request

`GET /users`

### HTTP Response

`200 OK`


## Get a single user

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "user": {
      "id": 1,
      "firstName": "firstName",
      "lastName": "lastName",
      "email": "myemail@email.com",
      "username": "username",
      "age": "24",
      "sex": "female",
      "facebookOauthID": "",
      "googleOauthID": ""
  }
}
```

This endpoint gets a single user

### HTTP Request

`GET /users/:userId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user
