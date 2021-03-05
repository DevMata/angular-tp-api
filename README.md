<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
 
<p align="center">A little API built with NestJs.</p>

## Description

Simple Node.js API built with NestJs. Built originally to provide Applaudo Angular trainees with a backend service to consume.

## Installation

```bash
$ npm install
```

## Before running the app

Check the example.env file to know the required env variables.

```
# DB
DATABASE_URL=database url

# AUTH
ACCESS_TOKENS_SECRET=access tokens secrets
ACCESS_TOKENS_LIFETIME=access tokens lifetime
REFRESH_TOKENS_SECRET=refresh tokens lifetime
REFRESH_TOKENS_LIFETIME=refresh tokens lifetime

# NODE.JS
NODE_ENV=common Node.js flag
```

Then create your own `.env` file and replace the example values.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

