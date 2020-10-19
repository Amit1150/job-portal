const expect = require('chai').expect;
const sinon = require('sinon');
const faker = require("faker");

const managerCtrl = require('../controllers/manager');
const enums = require('../utils/enums');
const Position = require('../models/position');


describe('Manager Controller - Test', function () {

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

    managerCtrl
      .getAllPosition({
        user: { id: faker.random.uuid() }
      }, res, () => { })
      .then(function () {
        expect(res.render.called).to.be.true;
        expect(spy.firstCall.args[1].data.length).equals(stubValue.length); /** Check count of returned position list */
        done();
      });
    Position.find.restore();
  });

  it('should get positions by valid position id', function (done) {

    sinon.stub(Position, 'findOne');
    Position.findOne.returns(stubValue[0]);

    const res = {
      render: function (body) {
        return body;
      },
    };
    const spy = sinon.spy(res, 'render');

    managerCtrl
      .getPositionById({
        params: { id: faker.random.uuid() },
        user: { id: faker.random.uuid() }
      }, res, () => { })
      .then(function () {
        expect(res.render.called).to.be.true;
        expect(spy.firstCall.args[1].data.name).to.equal(stubValue[0].name);
        done();
      });
    Position.findOne.restore();
  });

  it('should save new position and return success', function (done) {

    sinon.stub(Position, 'create');
    Position.create.returns(stubValue[0]);

    const res = {
      render: function (body) {
        return body;
      },
    };
    const spy = sinon.spy(res, 'render');

    managerCtrl
      .savePosition({
        user: { id: faker.random.uuid() },
        body: {
          name: faker.name.findName(),
          role: faker.name.jobType(),
          technologies: faker.lorem.word(),
          status: enums.jobStatus.Open,
          clientName: faker.name.findName(),
          description: faker.name.jobDescriptor()
        }
      }, res, () => { })
      .then(function () {
        expect(res.render.called).to.be.true;
        expect(spy.firstCall.args[1].message).to.equal('Position added successfully.');
        done();
      });
    Position.create.restore();
  });

  it('should update existing position and return success', function (done) {

    sinon.stub(Position, 'updateOne');
    Position.updateOne.returns(stubValue[0]);

    const res = {
      render: function (body) {
        return body;
      },
    };
    const spy = sinon.spy(res, 'render');

    managerCtrl
      .updatePosition({
        user: { id: faker.random.uuid() },
        params: { id: faker.random.uuid() },
        body: {
          id: faker.random.uuid(),
          name: faker.name.findName(),
          role: faker.name.jobType(),
          technologies: faker.lorem.word(),
          status: enums.jobStatus.Open,
          clientName: faker.name.findName(),
          description: faker.name.jobDescriptor()
        }
      }, res, () => { })
      .then(function () {
        expect(res.render.called).to.be.true;
        expect(spy.firstCall.args[1].message).to.equal('Position updated successfully.');
        done();
      });
    Position.updateOne.restore();
  });
});