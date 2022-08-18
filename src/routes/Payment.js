var express = require('express');
var router = express.Router();

const PaymentController = require('../controllers/PaymentController');
const auth = require('../middleware/auth');

router.route('/').get(PaymentController.index).post(PaymentController.create);

router
  .route('/:id')
  .get( PaymentController.find)
  .put(PaymentController.find, PaymentController.update)
  .delete(PaymentController.find, PaymentController.destroy);

module.exports = router;
