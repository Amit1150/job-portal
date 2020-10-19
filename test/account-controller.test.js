const expect = require('chai').expect;
const sinon = require('sinon');
const faker = require("faker");

const accountCtrl = require('../controllers/account');
const enums = require('../utils/enums');
const User = require('../models/user');


describe('Account Controller - Test', function () {

  const stubValue = {
    name: faker.name.findName(),
    username: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.random.arrayElement(enums.roles.Employee, enums.roles.ProjectManager)
  };

  it('should not register and return error for duplicate email', function (done) {

    sinon.stub(User, 'findOne');
    User.findOne.returns(stubValue);

    const res = {
      render: function (body) {
        return body;
      },
    };
    const spy = sinon.spy(res, 'render');

    accountCtrl
      .registerUser({
        body: stubValue,
        file: {
          filename: faker.image.image()
        }
      }, res, () => { })
      .then(function () {
        expect(res.render.called).to.be.true;
        expect(spy.firstCall.args[1].error).to.equal('Username is already exist');
        done();
      });
      User.findOne.restore();
  });
});