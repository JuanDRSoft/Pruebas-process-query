const axios = require('axios');
const Lawyer = require('../models/Lawyer');
const helpers = require('./helpers');

const validParams = ['name', 'phone', 'email', 'uid'];

function find(req, res, next) {
  Lawyer.findById(req.params.id)
    .then((lawyer) => {
      req.lawyer = lawyer;
      next();
    })
    .catch((err) => {
      next(err);
    });
}
function findByEmail(req, res, next) {
  let { email } = helpers.buildParams(validParams, req.body);
  Lawyer.findOne({ email: email })
    .then((lawyer) => {
      req.lawyer = lawyer;
      res.json(lawyer);
    })
    .catch((err) => {
      res.json(err);
    });
}
function index(req, res) {
  Lawyer.find({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
}
function show(req, res) {
  res.json(req.lawyer);
}
async function create(req, res, next) {
  let params = helpers.buildParams(validParams, req.body);

  Lawyer.create(params)
    .then((lawyer) => {
      res.json(lawyer);
      req.lawyer = lawyer;
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error
      });
    });

  const User = await Lawyer.findOne({ email: req.body.email });

  let now = new Date();
  let vigente = 1000 * 60 * 60 * 24 * 30;
  let fecha = now.getTime() + vigente;
  let endDate = new Date(fecha);

  const { id } = User;

  const bodyData = {
    paymentDate: now,
    status: 'approved',
    lawyer: id,
    amount: 0,
    voucher: 0000000001,
    endDate: endDate
  };

  const payment = await axios.post(
    'https://paymenth-method.herokuapp.com/payments',
    //'http://localhost:7001/payments',
    bodyData
  );
  console.log(payment.data);
}
function update(req, res) {
  req.lawyer = Object.assign(req.lawyer, req.body);
  req.lawyer
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}
function destroy(req, res) {
  req.lawyer
    .remove()
    .then((doc) => {
      res.json({});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

module.exports = { index, show, create, update, destroy, find, findByEmail };
