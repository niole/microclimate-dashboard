const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  key: String,
  value: Number,
  createdAt: {
    type: Number,
    min: 0
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
