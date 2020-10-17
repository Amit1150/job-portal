const Position = require('../models/position');
const Appliedposition = require('../models/appliedposition');
const enums = require('../utils/enums');
const NotificationService = require('../services/notification.service');

function toResult(position) {
  return {
    id: position.id,
    name: position.name,
    role: position.role,
    technologies: position.technologies,
    status: position.status
  };
}

function subscribeAndSendNotification(req) {
  NotificationService.subscribeToJobByEmployee(req.body.id);
  NotificationService.sendNotificationToManager(req.body.id, req.user.id);
}

/** List all positions */
async function getAllPosition(req, res, next) {
  try {
    const positions = await Position.find();
    var data = positions.map(position => toResult(position));
    res.render('../views/employee/position-list', {
      data: data
    });
  } catch (err) {
    res.render('../views/employee/position-list', {
      message: 'Some error occured.',
      type: 'danger'
    });
  }
}

async function saveJobApplication(req) {
  const appliedposition = new Appliedposition({
    appliedById: req.user.id,
    positionId: req.body.id,
    appliedOn: new Date()
  });
  await appliedposition.save();
  subscribeAndSendNotification(req);
}

/** Get Position By ID */
async function getPositionById(req, res, next) {
  try {
    const position = await Position.findById(req.params.id);
    if (position) {
      var data = {
        id: position.id,
        name: position.name,
        clientName: position.clientName,
        description: position.description,
        role: position.role,
        technologies: position.technologies,
        status: position.status
      };
      res.render('../views/employee/position-view', { data: data });
    } else {
      res.render('../views/employee/position-view', {
        message: 'Position not found.',
        type: 'danger'
      });
    }
  } catch (err) {
    res.render('../views/employee/position-view', {
      message: 'Some error occured.',
      type: 'danger'
    });
  }
}

async function applyForPosition(req, res, next) {
  try {
    var message;
    var type = 'danger'
    const position = await Position.findById(req.body.id);
    if(position == null) {
      message = 'Invalid position id.';
    } else if(position.status == enums.jobStatus.Closed) {
      message = 'This position is closed.';
    } else {
      var query = { 
        'appliedById': req.user.id,
        'positionId':req.body.id
      };
      var appliedposition = await Appliedposition.findOne(query);
      if(appliedposition == null) {
        await saveJobApplication(req);
        message = 'Congratulations! You have have successfully applied for this position.';
        type = 'success';
      } else{
        message = 'You have already applied for this position.';
      }
    }
    res.render('../views/employee/apply', {
      message: message,
      type: type
    });
  } catch (error) {
    res.render('../views/employee/apply', {
      message: 'Some error occured.',
      type: 'danger'
    });
  }
}

module.exports = {
  getAllPosition,
  getPositionById,
  applyForPosition
};