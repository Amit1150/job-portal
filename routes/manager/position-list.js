const express = require('express');
const router = express.Router();
const Position = require('../../models/position');

router.get('/', function(req, res, next) {
  // Position.collection.find().toArray(function(err, items) {
  //   res.render('../views/manager/position-list', {
  //     data: items
  //   });
  // });
  res.render('../views/manager/position-list');
});



module.exports = router;
