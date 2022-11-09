var express = require('express');
var router = express.Router();

const CollaboratorController = require('../controllers/CollaboratorControllers');
const auth = require('../middleware/auth');

router.route('/').post(CollaboratorController.create);

router
  .route('/:id')
  .put(CollaboratorController.find, CollaboratorController.update)
  .delete(CollaboratorController.find, CollaboratorController.destroy);

router.route('/all/bylawyer').get(auth, CollaboratorController.findByLawyerAll);

router.route('/find/email').post(CollaboratorController.findByEmail);

module.exports = router;
