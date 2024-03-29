const axios = require('axios');
const IPN = require('../models/IPN');
const helpers = require('./helpers');

const validParams = ['resource', 'topic'];

async function create(req, res, next) {
  let params = helpers.buildParams(validParams, req.body);
  IPN.create(req.body)
    .then((ipn) => {
      res.json(ipn);
      req.payment = ipn;
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json({
        error
      });
    });

  if (req.body.topic && req.body.resource) {
    if (req.body.topic.includes('merchant_order')) {
      const invoice = await axios.get(
        req.body.resource +
          '?access_token=APP_USR-7428682502971385-101011-3bf5f0f6dee905d73e5d94f0b7a527a3-1214673637'
      );
      if (invoice.data.status.includes('closed')) {
        let now = new Date();
        let vigente = 1000 * 60 * 60 * 24 * 30;
        let fecha = now.getTime() + vigente;
        let endDate = new Date(fecha);

        const bodyData = {
          paymentDate: invoice.data.date_created,
          status: invoice.data.payments[0].status,
          lawyer: invoice.data.items[0].id,
          amount: invoice.data.total_amount,
          voucher: invoice.data.id,
          endDate: endDate
        };

        const payment = await axios.post(
          'https://solutio-juandrsoft.koyeb.app/payments',
          //'http://localhost:7001/payments',
          bodyData
        );
        console.log(payment.data);
      }
    }
  }
}

function index(req, res) {
  IPN.find({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
}

module.exports = { create, index };
