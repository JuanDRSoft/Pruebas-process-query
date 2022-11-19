const mongoose = require('mongoose');

let lawyerShema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  uid: String,
  city: String,
  department: String,
  address: String,
  state: {
    type: Boolean,
    default: true
  },
  role: { type: String, default: 'Admin' },
  process: { type: Boolean, default: true },
  events: { type: Boolean, default: true },
  membership: { type: Boolean, default: true }
});

const Lawyer = mongoose.model('Lawyer', lawyerShema);

module.exports = Lawyer;
