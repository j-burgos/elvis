# elvis

Small snack store management
[Demo](https://elvis-lb.herokuapp.com/)

## Requirements

- Node >= 8
- Postgresql instance

## Install dependencies

To install package dependencies:
`npm install`

## Configuration

For simple configuration, copy and fill the `.env.example` file with variables
according to your environment

`cp .env.example .env`

## Create basic tables

To create the tables that the application needs, run the following:

`npm run db:create-schema`

## Create test data

To create a few users and some products

`npm run db:create-test-data`

## Start application

To start the application run:
`npm start`

Then go to: `http://localhost:3000/`

## Running with docker

If you have `docker` and `docker-compose` installed you can start the project:

`docker-compose up --build # Live logs`
or
`docker-compose up --build -d # Start in background`

And then to create the tables and test data
`docker-compose exec web npm run db:create-test-data`
`docker-compose exec web npm run db:create-test-data`

Then go to: `http://localhost:3000/`
