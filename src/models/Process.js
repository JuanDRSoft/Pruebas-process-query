const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

let linkSchema = new mongoose.Schema({
  name: String,
  url: String
});

let processShema = new mongoose.Schema({
  filingNumber: String,
  lastUpdateDate: Date,
  lastUpdateDatePrevious: Date,
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer'
  },
  idProceso: String,
  despacho: String,
  departamento: String,
  sujetosProcesales: String,
  ciudad: String,
  state: {
    type: Boolean,
    default: true
  },
  creado: {
    type: Date,
    default: Date.now()
  },
  notificationWeb: {
    type: Boolean,
    default: false
  },
  notificationHome: {
    type: Boolean,
    default: false
  },
  link: [linkSchema],
  assigned: String,
  notificationDays: { type: Boolean, default: false },
  notificationDaysWeb: { type: Boolean, default: false }
});

processShema.plugin(mongoosePaginate);

module.exports = mongoose.model('Link', linkSchema);
const Process = mongoose.model('Process', processShema);

module.exports = Process;
