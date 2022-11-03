# This project aims to show in a simple way how to make an authentication API.

> To run this project it is necessary to create the `.env` file and add the environment variables for the JWT (secret key) and for the database connection.

> After creating the environment variables, load the docker container using the command `docker-compose up --build -d` and then run the commands `npm install` and `npx knex migrate:latest`, to create the tables from the database

> finally run `npm start`

Technologies used:
* bcrypt
* cors
* dotenv
* express
* express-rescue
* jsonwebtoken
* knex
* mysql
* nodemon