const express = require('express');
const router = express.Router();
const Position = require('../../models/position');

router.get('/', function(req, res, next) {
  Position.find(function(err, items) {
    res.render('../views/manager/position-list', {
      data: items
    });
  });
});



module.exports = router;
