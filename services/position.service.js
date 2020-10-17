const Position = require('../models/position');
const Appliedposition = require('../models/appliedposition');
const NotificationService = require('../services/notification.service');
const enums = require('../utils/enums');

function subscribeAndSendNotification(req) {
  NotificationService.subscribeToJobByEmployee(req.body.id);
  NotificationService.sendNotificationToManager(req.body.id, req.user.id);
}

function applyForPosition(req, res, managerId) {
  const appliedposition = new Appliedposition({
    appliedById: req.user.id,
    positionId: req.body.id,
    appliedOn: new Date()
  });

  appliedposition.save((err, result) => {
    var response;
    if(err || result == null) {
      response = {
        data: null,
        message: 'Some error occured.',
        type: 'danger'
      }
    } else {
      subscribeAndSendNotification(req);
      response = {
        data: null,
        message: 'Congratulations! You have have successfully applied for this position.',
        type: 'success'
      }
    }
    res.render('../views/employee/apply', response);
  });
}

function validateAndApplyPosition(req, res) {
  var managerId;

  Position.findById(req.body.id, function (err, item) {
    var response;

    if(err || item == null) {
      response = {
        data: null,
        message: 'Position not found.',
        type: 'danger'
      }
    } else if(item.status == enums.jobStatus.Closed) {
      response = {
        data: null,
        message: 'This position is closed.',
        type: 'danger'
      }
    } else {
      var query = { 
        'appliedById': req.user.id,
        'positionId':req.body.id
      };
      managerId = item.createdBy;
      Appliedposition.findOne(query, function(error, appliedposition) {
        if(error) {
          response = {
            data: null,
            message: 'Some error occured.',
            type: 'danger'
          }
        }
        else if(appliedposition) {
          response = {
            data: null,
            message: 'You have already applied for this position.',
            type: 'danger'
          }
        } else {
          applyForPosition(req,res, managerId);
        }

        if(response) {
          res.render('../views/employee/apply', response);
        }
      });
    }
    if(response) {
      res.render('../views/employee/apply', response);
    }
  });
}

module.exports = {
  validateAndApplyPosition
}