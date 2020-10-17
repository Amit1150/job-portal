const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AppliedPositionSchema = new Schema({
  appliedById: String,
  positionId: String,
  appliedOn: Date
});

module.exports = mongoose.model('AppliedPosition', AppliedPositionSchema);