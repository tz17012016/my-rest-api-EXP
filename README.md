# My-rest-api-EXP 1.01
 rest api business-cards->little project for my web bootcamp
 
### link to heroku: 
for all the pages go to the end of the read
me

https://myrestapiexp.herokuapp.com/ - GET go to home page (index route)



## Features
* Database seeder (business & users)
* Admin Role
* Login / Register / Exit page
* A business user can create multiple business cards for his companies
* A regular user can select the business cards he likes, and includes adding and removing a business card of his choice

## Usage

### ES Modules in Node

I use ECMAScript Modules in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error.

### Env Variables

Create a .env file in then root and add the following

```

NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'your jwt secret'

```
### Install Dependencies

```

npm install

```
### Run
```

# Run Server

npm run server

```
### Build & Deploy

```

# Create prod build

npm run build

```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data


```

# Import data
npm run data:import

# Destroy data
npm run data:destroy

```

### Sample User Logins


```

admin@example.com (Admin)
123456

john@example.com (User)
123456

jane@example.com (User)
123456

```

### postman
the best way to use it, is with postman :

https://www.postman.com/downloads/

just put those end points and have fun 🙂

### link to heroku: 

#### index => home page

https://myrestapiexp.herokuapp.com/ - GET go to home page (index route)

#### USERS


* https://myrestapiexp.herokuapp.com/api/users/register - POST register a user
* https://myrestapiexp.herokuapp.com/api/users/login - POST login a user
* https://myrestapiexp.herokuapp.com/api/users/profile - GET  user profile
* https://myrestapiexp.herokuapp.com/api/users/profile - PUT  update user profile
* https://myrestapiexp.herokuapp.com/api/users/:id -  GET  user  by id(only admin)
* https://myrestapiexp.herokuapp.com/api/users/:id - PATCH  update user by id(only admin)
* https://myrestapiexp.herokuapp.com/api/users/:id -  DELETE  user by id(only admin)
* https://myrestapiexp.herokuapp.com/api/users/cards/ - GET user favorite cards
* https://myrestapiexp.herokuapp.com/api/users/cards/ - PATCH user favorite cards

#### BIZ CARDS

* https://myrestapiexp.herokuapp.com/api/cards/ - GET all the cards
* https://myrestapiexp.herokuapp.com/api/cards/ - POST create a new card
* https://myrestapiexp.herokuapp.com/api/cards/:id - GET get card by id
* https://myrestapiexp.herokuapp.com/api/cards/:id - PUT update a Card by id
* https://myrestapiexp.herokuapp.com/api/cards/:id - DELETE delete a Card by id

#### uploads

* https://myrestapiexp.herokuapp.com/api/upload - POST upload a file 
