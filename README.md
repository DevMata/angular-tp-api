<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
 
<p align="center">A little API built with NestJs.</p>

## Description

A simple backend API. Built originally to provide Applaudo Angular trainees with a service to consume.

It includes Auth management with JWT access and refresh tokens. 

## Installation

```bash
> npm install
```

## Before running the app

Check the example.env file to know the required env variables.

```
# DB
DB_URL=your db connection string

# AUTH
ACCESS_TOKEN_LIFETIME=access tokens lifetime in seconds
REFRESH_TOKEN_LIFETIME=refresh tokens lifetime in seconds
```

Then create your own `.env` file and replace the example values.

## Running the app

```bash
# development
> npm run start

# watch mode
> npm run start:dev

# debug mode
> npm run start:debug

# production mode
> npm run start:prod
```

## Test

```bash
# unit tests
> npm run test

# test coverage
> npm run test:cov
```
