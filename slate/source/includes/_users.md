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
  "message": "Your profile has been updated successfully"
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
  "message": "A password reset link has been sent to myemail@email.com.It may take upto 5 mins for the mail to                  arrive."
}
```

This endpoint sends a reset password link to the user associated with the provided email address

### HTTP Request

`POST /users/reset_password`

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
  "message": "Password successfully changed. Please login to your account."
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
  "oldPassword": "old password",
  "newPassword": "new password",
  "confirmPassword": "new password"
}
```

> Response body (application/json)

```javascript
{
  "message": "Your password has been changed succesfully"
}
```

This endpoint is for authenticated users to change their password

### HTTP Request

`PUT /users/:userId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user

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
      "googleOauthID": "",
      "resetPasswordToken": null,
      "resetPasswordExpires": null,
      "profilePhotoUrl": null,
      "createdAt": "2018-06-22T12:25:33.076Z",
      "updatedAt": "2018-06-22T12:30:00.434Z",
      "Recipes": []
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
