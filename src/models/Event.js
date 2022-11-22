const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
  creado: { type: Date, default: Date.now() },
  notification: { type: Boolean, default: false },
  start: Date,
  end: Date,
  title: String,
  process: String,
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer'
  },
  type: { type: String, default: '' },
  assigned: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
