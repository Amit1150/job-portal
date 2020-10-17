const express = require('express');
const router = express.Router();
const Position = require('../../models/position');
const enums = require('../../utils/enums');
const NotificationService = require('../../services/notification.service');

router.get('/:id', function (req, res, next) {
  var query = {'_id': req.params.id , 'createdBy': req.user.id };

  Position.findOne(query,function(err, item) {
    var response;
    if (err) {
      response = {
        data: null,
        message: 'Some error occured.',
        type: 'danger'
      }
    }
    else if (item) {
      var data = {
        id: item.id,
        name: item.name,
        clientName: item.clientName,
        technologies: item.technologies,
        role: item.role,
        description: item.description,
        status: item.status
      };

      response = {
        data: data,
        message: '',
        type: ''
      }
    } else {
      response = {
        data: null,
        message: 'Position not found.',
        type: 'danger'
      }
    }

    res.render('../views/manager/position-edit', response);
  });
});

router.post('/:id', function (req, res, next) {
  try {
    var query = {'_id': req.params.id , 'createdBy': req.user.id };
    var newValues = { $set: { 
      name: req.body.name,
      clientName: req.body.clientName,
      technologies: req.body.technologies,
      role: req.body.role,
      description: req.body.description,
      status: req.body.status,
      lastUpdatedOn: new Date()
    } };
    
    Position.updateOne(query,newValues,(err, item) => {
      if (err) {
        res.render('../views/manager/position-edit', {
          message: 'Some error occured.',
          type: 'danger',
          data: req.body
        });
      }
      if(req.body.status == enums.jobStatus.Closed) {
        NotificationService.sendNotificationToEmployee(req.params.id);
      }
      res.render('../views/manager/position-edit', {
        message: 'Position updated successfully.',
        type: 'success',
        data: req.body,
      });
    });
  } catch (err) {
    res.render('../views/manager/position-edit', {
      message: 'Some error occured.',
      type: 'danger',
      data: req.body
    });
  }
});



module.exports = router;
