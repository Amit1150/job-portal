const express = require('express');
const router = express.Router();
const Position = require('../../models/position');

router.get('/', function(req, res, next) {
  var query = { 'createdBy': req.user.id };
  Position.find(query, function(err, items) {
    if (err) {
      res.render('../views/manager/position-list', {
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
    res.render('../views/manager/position-list', {
      data: data,
      message: '',
      type: ''
    });
  });
});



module.exports = router;
