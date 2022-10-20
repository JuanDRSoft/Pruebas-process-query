var express = require('express');
var router = express.Router();

const EventController = require('../controllers/EventController');
const auth = require('../middleware/auth');

router.route('/').post(EventController.create);

router.route('/:id').delete(EventController.find, EventController.destroy);

router.route('/all/bylawyer').get(auth, EventController.findByLawyerAll);

module.exports = router;
