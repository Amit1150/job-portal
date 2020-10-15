const Position = require('../models/position');
const Appliedposition = require('../models/appliedposition');

function validateApplyingPosition(req, res) {
  Position.findById(req.params.id, function (err, item) {
    var response;

    if(err || item == null) {
      response = {
        data: null,
        message: 'Position not found.',
        type: 'danger'
      }
    } else {

    }
    
  });
}

module.exports = {
  getUser,
  register
}