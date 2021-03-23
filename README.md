# simpleAuthCRUDAPI
Simple Auth and CRUD API with node, ES6, express and mongoDB.

<p>This API was created to support the development of an AngularJS application for subscriber management.And it has the following endpoints:</p>

### account/login(POST): 
User authentication using username and password.The token value corresponding to the text 'jwtokken' should be added in the authentication header for the other endpoints.

### account/signup(POST):
Allows to create a new user with credentials.

### subscribers/(GET): 
List all existing subscribers. The parameters should be kept in mind to perform the pagination of the query: 
* criteria(text who filter the content) 
* page(number of page to consult) 
* count(number of subscribers per page) 
* sortOrder(The field that will be used for the filter: PublicId, Area, Name or Email) 
* sortType(number 0 if is in ascend order o 1 if is in descendent order)

### subscribers/{id}(GET):
View a subscriber's information.

### subscribers/ (POST): 
Allows you to create a new user.

### subscribers/{id} (PUT):
Allows to modify a user by "Id" field.
