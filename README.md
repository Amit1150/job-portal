# job-portal

Application URL: [https://nagp-amit-3146957.herokuapp.com/login](https://nagp-amit-3146957.herokuapp.com/login)

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
 - JWT token is stored in cookie and sent along with each request.
 - Read JWT token from request cookie to validate user authenticity.
 - multer (npm package) is used as middleware for handling `multipart/form-data`, which is primarily used for uploading files. We are storing images in `uploads` folder when user upload image on register page.
 

