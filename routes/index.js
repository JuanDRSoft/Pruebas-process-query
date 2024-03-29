const express = require('express');
const router = express.Router();

const PaymentsController = require('../src/controllers/PaymentsController');
const PaymentService = require('../services/PaymentService');
const PaymentInstance = new PaymentsController(new PaymentService());

/* GET home page. */
router.get('/', function (req, res, next) {
  return res.json({
    '/payment': 'generates a payment link',
    '/subscription': 'generates a subscription link'
  });
});

router.get('/payment', function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});

router.get('/subscription', function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});

module.exports = router;
