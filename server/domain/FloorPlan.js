const mongoose = require('mongoose');

const floorPlanSchema = new mongoose.Schema({
  roomNames: Array,
  floorPlanName: String
});

const FloorPlan = mongoose.model('FloorPlan', floorPlanSchema);

module.exports = FloorPlan;

