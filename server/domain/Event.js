const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  roomName: String,
  temperature: Number,
  floorPlanName: String,
  createdAt: {
    type: Number,
    min: 0
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
