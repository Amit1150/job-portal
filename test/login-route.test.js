require('dotenv').config();

const request = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');
const faker = require("faker");
const bcrypt = require('bcrypt');

const User = require('../models/user');
const enums = require('../utils/enums');
const app = require('../app');


describe('Login Route - Test', function () {

  const stubValue = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    username: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.random.arrayElement(enums.roles.Employee, enums.roles.ProjectManager),
    profilePicId: faker.image.image()
  };

  it('should login with valid credentials', function () {
    
    sinon.stub(User, 'findOne');
    sinon.stub(bcrypt, 'compare');

    User.findOne.returns(stubValue);
    bcrypt.compare.returns(true);

    request(app)
    .post('/account/login')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      "username":faker.internet.email(),
      "password": faker.internet.password()
    })
    .then(function (response) {
      expect(response.status).to.equals(200);
    });

    User.findOne.restore();
    bcrypt.compare.restore();
  });


  it('should not login with invalid credentials', function () {
    
    sinon.stub(User, 'findOne');
    sinon.stub(bcrypt, 'compare');

    User.findOne.returns(stubValue);
    bcrypt.compare.returns(true);

    request(app)
    .post('/account/login')
    .set('content-type', 'application/x-www-form-urlencoded')
    .then(function (response) {
      expect(response.status).to.equals(200);
      expect(response.text).to.contain('Invalid username or password');
    });

    User.findOne.restore();
    bcrypt.compare.restore();
  });
});