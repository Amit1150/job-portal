const express = require('express');
const router = express.Router();
const Position = require('../../models/position');
const NotificationService = require('../../services/notification.service');

router.get('/', function (req, res, next) {
  res.render('../views/manager/position-add', {
    message: '',
    type: ''
  });
});

router.post('/', function (req, res, next) {
  try {
    const position = new Position({
      ...req.body,
      createdBy: req.user.id,
      lastUpdatedOn: new Date()
    });

    position.save((err, result) => {
      if (err) {
        res.render('../views/manager/position-add', {
          message: 'Some error occured.',
          type: 'danger'
        });
      }
      NotificationService.subscribeToJobByManager(result.id);
      res.render('../views/manager/position-add', {
        message: 'Position added successfully.',
        type: 'success'
      });
    });
  } catch (err) {
    res.render('../views/manager/position-add', {
      message: 'Some error occured.',
      type: 'danger'
    });
  }
});



module.exports = router;
