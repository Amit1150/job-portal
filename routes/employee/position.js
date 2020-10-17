const express = require('express');
const router = express.Router();
const Position = require('../../models/position');
const positionService = require('../../services/position.service');

/** Get the position list */
router.get('/', function (req, res, next) {
  Position.find(function (err, items) {
    if (err) {
      res.render('../views/employee/position-list', {
        message: 'Some error occured.',
        type: 'danger'
      });
    }

    var data = items.map(item => {
      return {
        id: item.id,
        name: item.name,
        role: item.role,
        technologies: item.technologies,
        status: item.status
      }
    });
    res.render('../views/employee/position-list', {
      data: data,
      message: '',
      type: ''
    });
  });
});

/** View Position */
router.get('/view/:id', function (req, res, next) {
  Position.findById(req.params.id, function (err, item) {
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
        description: item.description,
        role: item.role,
        technologies: item.technologies,
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
    res.render('../views/employee/position-view', response);
  });
});

/** Apply for given position id */
router.post('/apply', function (req, res, next) {
  positionService.validateAndApplyPosition(req, res);
});



module.exports = router;
