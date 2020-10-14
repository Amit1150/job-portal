const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  name: String,
  clientName: String,
  technologies: String,
  role: String,
  description: String,
  status: String,
  createdBy: String
});

module.exports = mongoose.model('Position', PositionSchema);