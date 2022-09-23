var express = require('express');
var router = express.Router();

const LawyerController = require('../controllers/LawyerController');
const auth = require('../middleware/auth');

router.route('/').get(LawyerController.index).post(LawyerController.create);

router
  .route('/:id')
  .get(auth, LawyerController.find, LawyerController.show)
  .put(LawyerController.find, LawyerController.update)
  .delete(LawyerController.find, LawyerController.destroy);

router.route('/find/email').post(LawyerController.findByEmail);

router.route('/password').post(LawyerController.forgotPassword);

router.route('/newPassword').post(LawyerController.newPassword);

module.exports = router;
