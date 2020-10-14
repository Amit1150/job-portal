const express = require('express');
const router = express.Router();
const Position = require('../../models/position');

router.get('/:id', function (req, res, next) {
  Position.findById(req.params.id,function(err, item) {
    if (err) {
      res.render('../views/manager/position-edit', {
        message: 'Some error occured.',
        type: 'danger'
      });
    }
    var data = {
      id: item.id,
      name: item.name,
      clientName: item.clientName,
      technologies: item.technologies,
      role: item.role,
      description: item.description,
      status: item.status
    }
    res.render('../views/manager/position-edit', {
      data: data,
      message: '',
      type: ''
    });
  });
});

router.post('/:id', function (req, res, next) {
  try {
    var query = { '_id': req.params.id };
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
