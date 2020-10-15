const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  appliedById: String,
  positionId: String,
  appliedOn: Date
});

module.exports = mongoose.model('PositionSchema', PositionSchema);