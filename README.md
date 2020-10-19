# job-portal

Application URL: [https://nagp-amit-3146957.herokuapp.com/account/login](https://nagp-amit-3146957.herokuapp.com/account/login)

## Credentials
- Employee
  - username: employee@test.com  
  - password: 12345

- Manager
  - username: manager@test.com  
  - password: 12345
 
 ## Application Details
 - MongoDB cloude service is used for managing database.
 - EJS is used for creating frontend view.
 - PassportJS and JWT is used for authentication and authorization.
 - JWT token is stored in cookie and sent along with each request. We have used `role` based authentication for handling diffrent roles in application.
 - Read JWT token from request cookie to validate user authenticity.
 - multer (npm package) is used as middleware for handling `multipart/form-data`, which is primarily used for uploading files. We are storing images in `uploads` folder when user upload image on register page.
 - I have written unit tests using mocha and chai.
 - I have used `.env` file for storing connectionstring and variables.
 - I have used `EventEmitter` for sending notification to manager & empployye, when someone applied to job or manager closed the job. 
 - **Assumption**
  - I just logged notification message in console.
 
 ## How run this application
 - Clone this repository
 - move this job-portal folder
 - open command prompt here and execute `npm i`
 - execute `npm run start-dev` to run this application
 - execute `npm test` to execute test cases
 
 
 

