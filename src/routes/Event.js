var express = require('express');
var router = express.Router();

const EventController = require('../controllers/EventController');
const auth = require('../middleware/auth');

router.route('/').post(EventController.create);

router
  .route('/:id')
  .put(EventController.find, EventController.update)
  .delete(EventController.find, EventController.destroy);

router.route('/all/bylawyer').get(auth, EventController.findByLawyerAll);

router.route('/all/byCollaborator/:id').get(EventController.findByCollaborator);

module.exports = router;
