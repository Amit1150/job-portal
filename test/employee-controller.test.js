const expect = require('chai').expect;
const sinon = require('sinon');
const faker = require("faker");

const employeeCtrl = require('../controllers/employee');
const enums = require('../utils/enums');
const Position = require('../models/position');


describe('Employee Controller - Test', function () {

  const stubValue = [{
    id: faker.random.uuid(),
    name: faker.name.findName(),
    role: faker.name.jobType(),
    technologies: faker.lorem.word(),
    status: enums.jobStatus.Open,
    clientName: faker.name.findName(),
    description: faker.name.jobDescriptor(),
    createdBy: faker.random.uuid(),
    lastUpdatedOn: faker.date.past()
  },
  {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    role: faker.name.jobType(),
    technologies: faker.lorem.word(),
    status: enums.jobStatus.Closed,
    clientName: faker.name.findName(),
    description: faker.name.jobDescriptor(),
    createdBy: faker.random.uuid(),
    lastUpdatedOn: faker.date.past()
  }];

  it('should fetch a list of positions', function (done) {

    sinon.stub(Position, 'find');
    Position.find.returns(stubValue);

    const res = {
      render: function (body) {
        return body;
      },
    };
    const spy = sinon.spy(res, 'render');

    employeeCtrl
      .getAllPosition({}, res, () => { })
      .then(function () {
        expect(res.render.called).to.be.true;
        expect(spy.firstCall.args[1].data.length).equals(stubValue.length); /** Check count of returned position list */
        done();
      });
    Position.find.restore();
  });

  it('should get positions by valid position id', function (done) {

    sinon.stub(Position, 'findById');
    Position.findById.returns(stubValue[0]);

    const res = {
      render: function (body) {
        return body;
      },
    };
    const spy = sinon.spy(res, 'render');

    employeeCtrl
      .getPositionById({
        params: { id: faker.random.uuid() }
      }, res, () => { })
      .then(function () {
        expect(res.render.called).to.be.true;
        expect(spy.firstCall.args[1].data.name).to.equal(stubValue[0].name);
        done();
      });
    Position.findById.restore();
  });

  it('should return error without id', function (done) {

    sinon.stub(Position, 'findById');
    Position.findById.returns(stubValue[0]);

    const res = {
      render: function (body) {
        return body;
      },
    };
    const spy = sinon.spy(res, 'render');

    employeeCtrl
      .getPositionById({}, res, () => { })
      .then(function () {
        expect(res.render.called).to.be.true;
        expect(spy.firstCall.args[1].message).to.equal('Some error occured.');
        done();
      });
    Position.findById.restore();
  });

  it('should return error for closed job while applying', function (done) {

    sinon.stub(Position, 'findById');
    Position.findById.returns(stubValue[1]);

    const res = {
      render: function (body) {
        return body;
      },
    };
    const spy = sinon.spy(res, 'render');

    employeeCtrl
      .applyForPosition({
        body: { id: faker.random.uuid() }
      }, res, () => { })
      .then(function () {
        expect(res.render.called).to.be.true;
        expect(spy.firstCall.args[1].message).to.equal('This position is closed.');
        done();
      });
    Position.findById.restore();
  });

  it('should return error for invalid job id while applying', function (done) {

    sinon.stub(Position, 'findById');
    Position.findById.returns(null);

    const res = {
      render: function (body) {
        return body;
      },
    };
    const spy = sinon.spy(res, 'render');

    employeeCtrl
      .applyForPosition({
        body: { id: faker.random.uuid() }
      }, res, () => { })
      .then(function () {
        expect(res.render.called).to.be.true;
        expect(spy.firstCall.args[1].message).to.equal('Invalid position id.');
        done();
      });
    Position.findById.restore();
  });
});