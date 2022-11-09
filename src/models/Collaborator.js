const mongoose = require('mongoose');

let collaboratorShema = new mongoose.Schema({
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
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer'
  },
  role: { type: String, default: 'Read' }
});

const Collaborator = mongoose.model('Collaborator', collaboratorShema);

module.exports = Collaborator;
