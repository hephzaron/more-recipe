[![Build Status](https://travis-ci.org/hephzaron/more-recipe.svg?branch=master)](https://travis-ci.org/hephzaron/more-recipe)
[![Code Climate](https://codeclimate.com/github/hephzaron/more-recipe/badges/gpa.svg)](https://codeclimate.com/github/hephzaron/more-recipe)
[![Test Coverage](https://codeclimate.com/github/hephzaron/more-recipe/badges/coverage.svg)](https://codeclimate.com/github/hephzaron/more-recipe/coverage)
[![Coverage Status](https://coveralls.io/repos/github/hephzaron/more-recipe/badge.svg?branch=master)](https://coveralls.io/github/hephzaron/more-recipe?branch=master)
[![Issue Count](https://codeclimate.com/github/hephzaron/more-recipe/badges/issue_count.svg)](https://codeclimate.com/github/hephzaron/more-recipe)

# More-Recipe

More-Recipe is an online recipe mannagement application, where users can upload their choiced recipe and help/encourage the young ones to be better cook

## Table of Contents

* [Installation and Setup](#installation-and-setup)
* [Authentication](#authentication)
* [API Documentation](#api-documentation)
* [Testing](#testing)
* [License](#license)
* [Author](#author)
* [Contributing guide](#contributing-guide)
* [Acknowledgement](#acknowledgement)

## Installation and setup

### Pre-requisites

Ensure the underlisted are installed on your PC before running this application

* Latest version of Nodejs - comes with a Node Package Manager

* Postgresql database

### Installing

1. Download or clone this branch at https://github.com/hephzaron/more-recipe.git"
2. Navigate to working directory and install dependencies:

```
npm install 
```

3. Install sequelize-cli, Create Postgresql database, Navigate to server directory and run migrations:

```
npm install -g seqeulize-cli
cd server
sequelize db:migrate
```

4. Create a `.env` file in the root directory of the application. Use a different database for your testing and development. Example of the content of a .env file looks like this

```
PRIVATE_KEY=myprivatekey
TEST_DATABASE_URL=postgres://127.0.0.1:5432/more-recipe-test
```

5. Start the server:

```
npm run start:dev
```

The server listens on port '3000' which can be changed by setting environment variable 'PORT'

Visit `http://localhost:3000/api/v1`  to access the `api` endpoint.

## Authentication 

## API Documentation

## Testing

## License

This project is authored by **Daramola Tobi** (hephzaron@gmail.com) and is licensed for your use, modification and distribution under the **MIT** license.
[MIT][license] © [hephzaron][author]
<!-- Definitions -->
[license]: LICENSE
[author]: hephzaron

## Author

**Daramola Tobi** (hephzaron@gmail.com)is an aspiring developer passionate about building real apps to enhance his learning and sharpen his programming skills.

## Contributing Guide

Thank you for your interest in contributing to this package. I currently accept contributions and corrections from everyone but should be according to standards
To contribute,

1. Fork the project
1. Create a feature branch, branch away from `master`
1. Write tests, using `Mocha and Chai` or any other testing frameworks, and code
1. If you have multiple commits please combine them into a few logically organized commits by [squashing them](git-squash)
1. Push the commit(s) to your fork
1. Submit a merge request (MR) to the `master` branch
1. The MR title should describe the change you want to make
1. The MR description should give a motive for your change and the method you used to achieve it.
  1. Mention the issue(s) your merge request solves, using the `Solves #XXX` or
    `Closes #XXX` syntax to auto-close the issue(s) once the merge request will
    be merged.
1. Be prepared to answer questions and incorporate feedback even if requests for this arrive weeks or months after your MR submission
  1. If a discussion has been addressed, select the "Resolve discussion" button beneath it to mark it resolved.
1. When writing commit messages please follow
   [these guidelines](http://chris.beams.io/posts/git-commit).
