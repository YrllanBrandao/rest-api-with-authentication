# rest-api-with-authentication

### INSTRUCTIONS
```
1. even before starting the project it is necessary to have MYSQL installed
2. and add server ip in database.js file with user and password
3. the database timezone is set to "-03:00", so feel free to modify
4. before starting the project, make sure you have created the database with the name games, you can change it in the database.js file if necessary
5. 
```
### STARTING THE PROJECT
```
1. `npm install` or `npm -i`
2. in the project folder `node app` or `nodemon app`

```
### list of registered games
` GET /games`

# RESPONSES
``` 
   {
        "id": 1,
        "title": "gta",
        "price": "233",
        "year": 1992,
        "createdAt": "2022-04-29T23:39:14.000Z",
        "updatedAt": "2022-04-29T23:39:14.000Z"
   }

```
# HTTP CODES
1. 200 - OK
2. 400 - Bad request
3. 404 - not found 404

### listing a specific game by id
` GET /game/id`

# RESPONSES
``` 
   {
        "id": [SPECIFIED ID],
        "title": "gta",
        "price": "233",
        "year": 1992,
        "createdAt": "2022-04-29T23:39:14.000Z",
        "updatedAt": "2022-04-29T23:39:14.000Z"
   }

```
# HTTP CODES
1. 200 - OK
2. 400 - Bad request
3. 404 - not found 404


### creating a new game
` POST /game`

# REQUEST
``` 
   {

        "title": "gta",
        "price": "233",
        "year": 1992,
       
   }

```
# HTTP CODES
1. 201 - created
2. 400 - Bad request

### Deleting a game
` DELETE /game/id`

# REQUEST
``` 
   OK

```
# HTTP CODES
1. 201 - created
2. 400 - Bad request

### update a game
` PUT /game/id`

# REQUEST
``` 
   {

        "title": "gta",
        "price": "233",
        "year": 1992,
       
   }

```
# HTTP CODES
1. 200 - Edited
2. 400 - Bad request
3. 406 - Not acceptable



# the default port is like 8080, when deploying change it to 80


